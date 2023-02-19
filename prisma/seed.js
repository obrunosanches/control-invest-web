const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.categoryType.deleteMany({})
    await prisma.categoryType.createMany({
      data: [
        { description: "Receitas" },
        { description: "Despesas" }
      ]
    })

    await prisma.accountType.deleteMany({})
    await prisma.accountType.createMany({
      data: [
        { description: "Conta Corrente" },
        { description: "Conta Digital" },
        { description: "Carteira" },
        { description: "Investimento" },
      ]
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

load().finally(async () => await prisma.$disconnect())
