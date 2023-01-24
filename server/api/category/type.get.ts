import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async () => {
  const categoryTypes = await prisma.categoryType.findMany();

  return { categoryTypes }
})
