import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { MakeColumn } from './components/columns';
import { MakeClient } from './components/client';

const MakesPage = async ({ params }: { params: { storeId: string } }) => {
	const makes = await prismadb.make.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedMakes: MakeColumn[] = makes.map((item) => ({
		name: item.name,
		id: item.id,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<MakeClient data={formattedMakes} />
			</div>
		</div>
	);
};

export default MakesPage;
