import { PromptBlockData } from '../types';

// Client-side service that talks to our Serverless API
// This is secure because the database credentials stay on the Vercel server.

const API_URL = '/api/blocks';

// Initialize the database table
export async function initDatabase(): Promise<void> {
  const res = await fetch(`${API_URL}?action=init`);
  if (!res.ok) throw new Error('Failed to initialize database');
}

// Get all blocks from the database
export async function getAllBlocks(): Promise<PromptBlockData[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch blocks');

  const rows = await res.json();

  return rows.map((row: any) => ({
    id: row.id,
    type: row.type as PromptBlockData['type'],
    title: row.title,
    content: row.content,
    tags: row.tags || [],
    isNew: false
  }));
}

// Create a new block
export async function createBlock(block: PromptBlockData): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(block)
  });
  if (!res.ok) throw new Error('Failed to create block');
}

// Update an existing block
export async function updateBlock(id: string, updates: Partial<PromptBlockData>): Promise<void> {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ updateId: id, updates })
  });
  if (!res.ok) throw new Error('Failed to update block');
}

// Delete a block
export async function deleteBlock(id: string): Promise<void> {
  const res = await fetch(`${API_URL}?deleteId=${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete block');
}

// Seed the database with initial blocks (only if empty)
export async function seedDatabase(): Promise<boolean> {
  // Check if we already have blocks first to avoid double seeding
  const blocks = await getAllBlocks();
  if (blocks.length > 0) return false;

  const seedBlocks: PromptBlockData[] = [
    {
      id: 'seed-1',
      type: 'persona',
      title: 'Senior React Architect',
      content: 'Act as a Senior Software Architect specializing in React, TypeScript, and Scalable Front-end Systems. You prioritize clean architecture, performance optimization, and maintainability.',
      tags: ['Role', 'React', 'TypeScript'],
      isNew: false
    },
    {
      id: 'seed-2',
      type: 'context',
      title: 'Modern Stack Context',
      content: 'The project uses Next.js 14 (App Router), Tailwind CSS for styling, and Zustand for state management. Strictly adhere to modern React patterns (Server Components where applicable).',
      tags: ['Context', 'React', 'Next.js'],
      isNew: false
    },
    {
      id: 'seed-3',
      type: 'format',
      title: 'Markdown Output',
      content: 'Provide the response in clean Markdown. Use standard code blocks for all examples. Briefly explain the "Why" before showing the "How".',
      tags: ['Output'],
      isNew: false
    },
    {
      id: 'seed-4',
      type: 'instruction',
      title: 'Code Review Guidelines',
      content: `Review code with these priorities:
1. Security vulnerabilities
2. Performance implications  
3. Code readability and maintainability
4. Edge cases and error handling
5. Test coverage suggestions`,
      tags: ['Logic', 'Code'],
      isNew: false
    },
    {
      id: 'seed-5',
      type: 'constraint',
      title: 'Clean Code Rules',
      content: `- Keep functions under 20 lines
- No magic numbers - use named constants
- Single responsibility per function
- Descriptive variable names
- Avoid nested callbacks - use async/await`,
      tags: ['Rules', 'Code'],
      isNew: false
    },
    {
      id: 'seed-6',
      type: 'persona',
      title: 'Python Data Scientist',
      content: 'You are an experienced Data Scientist with expertise in Python, Pandas, NumPy, and machine learning frameworks like TensorFlow and PyTorch. Focus on efficient data processing and clear visualizations.',
      tags: ['Role', 'Python'],
      isNew: false
    }
  ];

  for (const block of seedBlocks) {
    await createBlock(block);
  }

  return true;
}
