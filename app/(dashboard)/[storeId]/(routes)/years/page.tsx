import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { YearColumn } from './components/columns';
import { YearsClient } from './components/client';

const YearsPage = async ({ params }: { params: { storeId: string } }) => {
	const years = await prismadb.year.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedYears: YearColumn[] = years.map((item) => ({
		id: item.id,
		name: item.name,
		// value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<YearsClient data={formattedYears} />
			</div>
		</div>
	);
};

export default YearsPage;
