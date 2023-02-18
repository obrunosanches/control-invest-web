import {prisma} from "~/server/utils/prisma.server";
import type {Transaction as ITransaction} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const data: Omit<ITransaction, 'id' | 'createdAt' | 'updatedAt'> = {
        accountId: body.accountId,
        categoryId: body.categoryId,
        categoryTypeId: body.categoryTypeId,
        date: new Date(body.date),
        description: body.description,
        subCategoryId: body.subCategoryId,
        value: parseFloat(body.value),
        status: '1'
    };

    return await prisma.transaction.create({ data });
});
