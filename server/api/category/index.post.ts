import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data = {
    name: body.name,
    typeId: body.typeId,
  };

  return await prisma.category.create({ data });
});
