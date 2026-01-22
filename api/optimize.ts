// Vercel Serverless Function for Prompt Optimization
// Uses Qwen LLM to merge and optimize prompt fragments into a master prompt.

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt content is required." });
    }

    const systemPrompt = `You are an expert Prompt Engineer. Your task is to take a collection of raw prompt fragments provided by the user and merge them into a single, highly optimized master prompt.

Rules:
1. Combine all the fragments into one cohesive, well-structured prompt.
2. Remove any redundancy or repetition.
3. Improve clarity and flow.
4. Ensure the final prompt is ready to be used with any major LLM (GPT-4, Claude, Gemini, etc.).
5. Output ONLY the final optimized prompt. Do not add any explanations or meta-commentary.`;

    try {
        const response = await fetch('https://qwen.ai.unturf.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer dummy-api-key'
            },
            body: JSON.stringify({
                model: 'hf.co/unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF:Q4_K_M',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Here are the prompt fragments to merge:\n\n${prompt}` }
                ],
                temperature: 0.6,
                max_tokens: 2048,
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Qwen API Error:', errorText);
            return res.status(500).json({ error: 'Failed to connect to Qwen API.' });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || 'No response generated.';

        return res.status(200).json({ text });
    } catch (error: any) {
        console.error("Optimization API Error:", error);
        return res.status(500).json({ error: error.message || "Failed to generate optimized prompt." });
    }
}
