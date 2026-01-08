import { PrismaClient } from '@prisma/client'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const prisma = new PrismaClient()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' })
  }

  if (req.method === 'PUT') {
    const { type, title, content, tags, isTemp } = req.body
    const block = await prisma.promptBlock.update({
      where: { id },
      data: { type, title, content, tags, isTemp },
    })
    return res.json(block)
  }

  if (req.method === 'DELETE') {
    await prisma.promptBlock.delete({
      where: { id },
    })
    return res.json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
