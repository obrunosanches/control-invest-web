import { PrismaClient } from "@prisma/client"

declare global {
  var __db: PrismaClient | undefined
}