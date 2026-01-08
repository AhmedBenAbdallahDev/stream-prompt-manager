import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  const blocks = [
    {
      type: 'persona',
      title: 'Senior React Architect',
      content: 'Act as a Senior Software Architect specializing in React, TypeScript, and Scalable Front-end Systems. You prioritize clean architecture, performance optimization, and maintainability.',
      tags: ['Role'],
    },
    {
      type: 'context',
      title: 'Modern Stack Context',
      content: 'The project uses Next.js 14 (App Router), Tailwind CSS for styling, and Zustand for state management. Strictly adhere to modern React patterns (Server Components where applicable).',
      tags: ['Context', 'React', 'Next.js'],
    },
    {
      type: 'format',
      title: 'Markdown Output',
      content: 'Provide the response in clean Markdown. Use standard code blocks for all examples. Briefly explain the "Why" before showing the "How".',
      tags: ['Output'],
    }
  ]

  for (const b of blocks) {
    const block = await prisma.promptBlock.create({
      data: b,
    })
    console.log(`Created block with id: ${block.id}`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
