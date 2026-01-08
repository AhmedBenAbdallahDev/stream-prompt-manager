import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all blocks
app.get('/api/blocks', async (req, res) => {
  try {
    const blocks = await prisma.promptBlock.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

// Create a block
app.post('/api/blocks', async (req, res) => {
  const { type, title, content, tags, isTemp } = req.body;
  try {
    const block = await prisma.promptBlock.create({
      data: { type, title, content, tags, isTemp: isTemp || false },
    });
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create block' });
  }
});

// Update a block
app.put('/api/blocks/:id', async (req, res) => {
  const { id } = req.params;
  const { type, title, content, tags, isTemp } = req.body;
  try {
    const block = await prisma.promptBlock.update({
      where: { id },
      data: { type, title, content, tags, isTemp },
    });
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update block' });
  }
});

// Delete a block
app.delete('/api/blocks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.promptBlock.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete block' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
