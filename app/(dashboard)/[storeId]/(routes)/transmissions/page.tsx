import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { TransmissionColumn } from './components/columns';
import { TransmissionsClient } from './components/client';

const TransmissionsPage = async ({
	params,
}: {
	params: { storeId: string };
}) => {
	const transmissions = await prismadb.transmission.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedTransmissions: TransmissionColumn[] = transmissions.map(
		(item) => ({
			id: item.id,
			name: item.name,
			// value: item.value,
			createdAt: format(item.createdAt, 'MMMM do, yyyy'),
		}),
	);

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<TransmissionsClient data={formattedTransmissions} />
			</div>
		</div>
	);
};

export default TransmissionsPage;
