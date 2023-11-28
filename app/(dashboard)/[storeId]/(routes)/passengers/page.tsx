import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { PassengerColumn } from './components/columns';
import { PassengersClient } from './components/client';

const PassengersPage = async ({ params }: { params: { storeId: string } }) => {
	const passengers = await prismadb.passenger.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedPassengers: PassengerColumn[] = passengers.map((item) => ({
		id: item.id,
		name: item.name,
		// value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<PassengersClient data={formattedPassengers} />
			</div>
		</div>
	);
};

export default PassengersPage;
