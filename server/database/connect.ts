import { PrismaClient } from '@prisma/client'
import setBalance from "~/server/extensions/setBalance"

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient().$extends([setBalance])
  prisma.$connect()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient().$extends([setBalance])
    global.__db.$connect()
  }
  
  prisma = global.__db
}

export { prisma }