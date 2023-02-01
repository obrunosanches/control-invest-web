import { AccountType as IAccountType } from '@prisma/client'

import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const data: Pick<IAccountType, 'description'> = {
    description: body.description
  };

  return await prisma.accountType.create({ data });
})
