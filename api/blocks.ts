import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.NEON_DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL is not configured on the server.');
}

const sql = neon(DATABASE_URL);

export default async function handler(req: any, res: any) {
    // Add basic CORS or security checks if needed

    const { method, body, query } = req;

    try {
        switch (method) {
            case 'GET':
                const { action } = query;

                if (action === 'init') {
                    await sql`
            CREATE TABLE IF NOT EXISTS prompt_blocks (
              id TEXT PRIMARY KEY,
              type TEXT NOT NULL,
              title TEXT NOT NULL,
              content TEXT NOT NULL,
              tags TEXT[] DEFAULT '{}',
              created_at TIMESTAMP DEFAULT NOW(),
              updated_at TIMESTAMP DEFAULT NOW()
            )
          `;
                    return res.status(200).json({ success: true, message: 'Database initialized' });
                }

                const rows = await sql`
          SELECT id, type, title, content, tags 
          FROM prompt_blocks 
          ORDER BY created_at DESC
        `;
                return res.status(200).json(rows);

            case 'POST':
                const { id, type, title, content, tags, isSeed } = body;

                if (isSeed) {
                    const countResult = await sql`SELECT COUNT(*) as count FROM prompt_blocks`;
                    if (parseInt(countResult[0].count) > 0) {
                        return res.status(200).json({ success: false, message: 'Already seeded' });
                    }
                    // Seeding logic would go here if we want to do it in one request, 
                    // but it's cleaner to handle from client for specific blocks.
                }

                await sql`
          INSERT INTO prompt_blocks (id, type, title, content, tags)
          VALUES (${id}, ${type}, ${title}, ${content}, ${tags})
        `;
                return res.status(201).json({ success: true });

            case 'PUT':
                const { updateId, updates } = body;
                const { type: uType, title: uTitle, content: uContent, tags: uTags } = updates;

                await sql`
          UPDATE prompt_blocks 
          SET 
            type = COALESCE(${uType ?? null}, type),
            title = COALESCE(${uTitle ?? null}, title),
            content = COALESCE(${uContent ?? null}, content),
            tags = COALESCE(${uTags ?? null}, tags),
            updated_at = NOW()
          WHERE id = ${updateId}
        `;
                return res.status(200).json({ success: true });

            case 'DELETE':
                const { deleteId } = query;
                await sql`DELETE FROM prompt_blocks WHERE id = ${deleteId}`;
                return res.status(200).json({ success: true });

            default:
                res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
                return res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error: any) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
