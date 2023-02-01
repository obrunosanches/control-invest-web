import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async () => {
  const accountTypes = await prisma.accountType.findMany();

  return accountTypes
})
