import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async () => {
  const account = await prisma.account.findMany({
    include: {
      accounttype: true
    },
  });
  
  return account
})
