import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'POST') {
		try {
			const productId = req.query.productId as string; // Assumed to be a string
			const optionIdsFromPost = req.body.optionIds as string[]; // Assumed to be an array of strings

			// Check if options exist in the Option table
			const foundOptions = await prisma.option.findMany({
				where: {
					id: { in: optionIdsFromPost },
				},
			});

			// Map to get existing option IDs
			const existingOptionIds = foundOptions.map((option) => option.id);

			// Delete existing associations that are not in the new list
			await prisma.productOption.deleteMany({
				where: {
					productId: productId,
					NOT: {
						optionId: { in: existingOptionIds },
					},
				},
			});

			// Add new associations
			const newAssociations = existingOptionIds.map((optionId) => ({
				productId: productId,
				optionId: optionId,
			}));

			await prisma.productOption.createMany({
				data: newAssociations,
				skipDuplicates: true,
			});

			return res.status(200).json({ success: true });
		} catch (err) {
			console.error(err);
			return res.status(500).json({ error: 'Internal server error' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
