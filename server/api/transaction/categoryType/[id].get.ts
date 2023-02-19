import { prisma } from "~/server/database/connect"

export default defineEventHandler( (event) => {
	const { params } = event.context
	
	return prisma.transaction.findMany({
		where: {
			categoryTypeId: params.id
		}
	})
})
