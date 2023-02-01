import { Account as IAccount } from '@prisma/client'
import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const data: Pick<IAccount, 'name' | 'accountTypeId' | 'initialBalance'> = {
    name: body.name,
    accountTypeId: body.accountTypeId,
    initialBalance: Number(body.initialBalance),
  };

  return await prisma.account.create({ data });
});
