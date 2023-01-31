import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const data = {
    name: body.name,
    categoryId: body.categoryId
  };

  return await prisma.subCategory.create({ data });
})
