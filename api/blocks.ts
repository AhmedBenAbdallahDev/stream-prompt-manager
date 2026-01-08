import { PrismaClient } from '@prisma/client'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const prisma = new PrismaClient()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const blocks = await prisma.promptBlock.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return res.json(blocks)
  }

  if (req.method === 'POST') {
    const { type, title, content, tags, isTemp } = req.body
    const block = await prisma.promptBlock.create({
      data: { type, title, content, tags, isTemp: isTemp || false },
    })
    return res.json(block)
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
