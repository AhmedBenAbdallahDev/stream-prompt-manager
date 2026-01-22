import { GeminiResponse } from "../types";

export const testPromptWithGemini = async (prompt: string): Promise<GeminiResponse> => {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to call Gemini API');
    }

    const data = await res.json();
    return { text: data.text };
  } catch (error: any) {
    console.error("Gemini Proxy Error:", error);
    return { text: '', error: error.message || "Failed to generate response." };
  }
};