import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const data = {
    description: body.description
  };

  return await prisma.categoryType.create({ data });
})
