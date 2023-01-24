import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async () => {
  const categories = await prisma.category.findMany({
    include: {
      type: true,
    },
  });
  
  return categories
})
