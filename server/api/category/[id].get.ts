import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const { params } = event.context;
  const category = await prisma.category.findFirstOrThrow({
    where: {
      id: params.id
    }
  });

  return category;
});
