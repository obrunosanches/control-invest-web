import type { Transaction as ITransaction } from "@prisma/client";

import { prisma } from "~/server/utils/prisma.server";

export default defineEventHandler(async (event): Promise<ITransaction[]> => {
	const { params } = event.context;
	
	return await prisma.transaction.findMany({
		where: {
			categoryTypeId: params.id
		}
	});
});
