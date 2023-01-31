import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const { params } = event.context;
  const subCategories = await prisma.subCategory.findMany({
    where: {
      categoryId: params.id
    }
  });

  return subCategories;
})
