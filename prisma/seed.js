const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.transactionType.deleteMany({})
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
    
    await prisma.transactionType.create({
      data: {
        description: "Despesas",
        slug: 'expenses',
        category: {
          create: [{
            name: "Alimentação",
            subCategory: {
              create: [
                { name: "Almoço" },
                { name: "Lanche" },
                { name: "Trabalho" },
                { name: "Restaurante" },
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
                { name: "Imposto" },
                { name: "Taxas" }
              ]
            }
          },
          {
            name: "Educação",
            subCategory: {
              create: [
                { name : "Faculdade" },
                { name : "Curso" },
                { name : "Certificação" },
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
                { name: "Viagem" }
              ]
            }
          },
          {
            name: "Casa",
            subCategory: {
              create: [
                { name: "Conta fixa" },
                { name: "Açougue" },
                { name: "Sacolão" },
                { name: "Supermercado" }
              ]
            }
          },
          {
            name: "Saúde",
            subCategory: {
              create: [
                { name: "Academia" },
                { name: "Barbearia" },
                { name: "Consultas" },
                { name: "Remédios" },
                { name: "Exames" }
              ]
            }
          },
          {
            name: "Petshop",
            subCategory: {
              create: [
                { name: "Saúde" },
                { name: "Alimentação" }
              ]
            }
          },
          {
            name: "Assinaturas e serviços",
            subCategory: {
              create: [
                { name: "Streaming" },
                { name: "TV a Cabo" },
                { name: "Plano funerário" }
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
                { name: "Aniversário" },
                { name: "Doação" }
              ]
            }
          },
          {
            name: "Pagamentos",
            subCategory: {
              create: [
                { name: "Dívidas" },
                { name: "Cartão de Crédito" }
              ]
            }
          },
          {
            name: "Investimentos",
            subCategory: {
              create: [
                { name: "Ações" },
                { name: "Renda Fixa" },
                { name: "Tesouro Direto" },
                { name: "Fundos imobiliários" },
                { name: "Fundos de investimento" }
              ]
            }
          }],
        },
      }
    })
    
    await prisma.transactionType.create({
      data: {
        description: "Receitas",
        slug: 'earnings',
        category: {
          create: [{
            name: "Benfícios",
            subCategory: {
              create: [
                { name: "Salário" },
                { name: "Alimentação" },
                { name: "Refeição" },
                { name: "Transporte" }
              ]
            }
          },
          {
            name: "Extras",
            subCategory: {
              create: [
                { name: "Freelas" },
                { name: "Rendimentos" },
                { name: "Vendas" }
              ]
            }
          },
          {
            name: "Investimentos",
            subCategory: {
              create: [
                { name: "Dividendos" }
              ]
            }
          }],
        },
      }
    })
    
    await prisma.transactionType.create({
      data: {
        description: "Despesas de transferência",
        slug: 'expenses-transfer',
        category: {
          create: [{
            name: "Transferência"
          }]
        }
      }
    })
    
    await prisma.transactionType.create({
      data: {
        description: "Receitas de transferência",
        slug: 'earnings-transfer',
        category: {
          create: [{
            name: "Transferência"
          }]
        }
      }
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

load().finally(async () => await prisma.$disconnect())
