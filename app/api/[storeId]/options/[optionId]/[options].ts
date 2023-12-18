import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prismadb'; // Adjust the path to your Prisma client

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === 'GET') {
		try {
			let options = await prisma.option.findMany();
			const uniqueValuesSet = new Set();

			// Remove duplicate names
			options = options.filter((option) => {
				const isPresentInSet = uniqueValuesSet.has(option.name);
				uniqueValuesSet.add(option.name);
				return !isPresentInSet;
			});

			return res.status(200).json({ options });
		} catch (error) {
			console.error('Failed to fetch options:', error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	} else {
		// Handle other HTTP methods or return an error
		res.setHeader('Allow', ['GET']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
