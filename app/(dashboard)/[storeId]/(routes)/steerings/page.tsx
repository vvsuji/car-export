import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SteeringColumn } from './components/columns';
import { SteeringsClient } from './components/client';

const SteeringsPage = async ({ params }: { params: { storeId: string } }) => {
	const steerings = await prismadb.steering.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedSteerings: SteeringColumn[] = steerings.map((item) => ({
		id: item.id,
		name: item.name,
		// value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SteeringsClient data={formattedSteerings} />
			</div>
		</div>
	);
};

export default SteeringsPage;
