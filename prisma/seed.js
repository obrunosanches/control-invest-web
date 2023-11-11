const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.categoryType.deleteMany({})
    await prisma.accountType.deleteMany({})
    await prisma.category.deleteMany({})
    await prisma.subCategory.deleteMany({})
    await prisma.transaction.deleteMany({})
    
    await prisma.accountType.createMany({
      data: [
        { description: "Conta Corrente" },
        { description: "Conta Digital" },
        { description: "Carteira" }
      ]
    })
    
    await prisma.categoryType.create({
      data: {
        description: "Despesas",
        slug: 'expenses',
        category: {
          create: [{
            name: "Alimentação",
            subCategory: {
              create: [
                { name: "Almoço" },
                { name: "Lanches" },
                { name: "Trabalho" },
                { name: "Comer fora" },
                { name: "Fast food" },
                { name: "Padaria" }
              ]
            }
          },
          {
            name: "Carro",
            subCategory: {
              create: [
                { name: "Combustível" },
                { name: "Estacionamento" },
                { name: "Manutenção" },
                { name: "Limpeza" },
                { name: "Multas" },
                { name: "Taxas" }
              ]
            }
          },
          {
            name: "Educação",
            subCategory: {
              create: [
                { name : "Faculdade" },
                { name : "Cursos" }
              ]
            }
          },
          {
            name: "Família",
            subCategory: {
              create: [
                { name: "Filhos" }
              ]
            }
          },
          {
            name: "Lazer",
            subCategory: {
              create: [
                { name: "Cinema" },
                { name: "Viagens" }
              ]
            }
          },
          {
            name: "Moradia",
            subCategory: {
              create: [
                { name: "Sacolão" },
                { name: "Conta fixa" },
                { name: "Supermercado" },
                { name: "Açougue" },
                { name: "Petshop" }
              ]
            }
          },
          {
            name: "Saúde",
            subCategory: {
              create: [
                { name: "Academia" },
                { name: "Consultas" },
                { name: "Remédios" },
                { name: "Exames" }
              ]
            }
          },
          {
            name: "Serviços",
            subCategory: {
              create: [
                { name: "Streaming" }
              ]
            }
          },
          {
            name: "Transporte",
            subCategory: {
              create: [
                { name: "Uber" },
                { name: "Ônibus" },
                { name: "Metrô" }
              ]
            }
          },
          {
            name: "Vestuário",
            subCategory: {
              create: [
                { name: "Roupas" },
                { name: "Calçados" }
              ]
            }
          },
          {
            name: "Presentes",
            subCategory: {
              create: [
                { name: "Cursos" },
                { name: "Aniversário" }
              ]
            }
          },
          {
            name: "Pagamentos",
            subCategory: {
              create: [
                { name: "Freelas" },
                { name: "Doação" },
                { name: "Dívidas" }
              ]
            }
          },
          {
            name: "Investimentos",
            subCategory: {
              create: [
                { name: "Renda Fixa" },
                { name: "Tesouro Direto" },
                { name: "Bolsa" },
                { name: "Fundos" }
              ]
            }
          }],
        },
      }
    })
    
    await prisma.categoryType.create({
      data: {
        description: "Receitas",
        slug: 'earnings',
        category: {
          create: [{
            name: "Benfícios",
            subCategory: {
              create: [
                { name: "Alimentação" },
                { name: "Refeição" },
                { name: "Transporte" }
              ]
            }
          },
          {
            name: "Rendimentos",
            subCategory: {
              create: [
                { name: "Conta bancária" },
                { name: "Dividendos" }
              ]
            }
          },
          {
            name: "Serviços",
            subCategory: {
              create: [
                { name: "Freelas" }
              ]
            }
          }],
        },
      }
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

load().finally(async () => await prisma.$disconnect())
