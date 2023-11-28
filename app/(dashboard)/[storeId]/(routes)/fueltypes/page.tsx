import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { FuelTypeColumn } from './components/columns';
import { FuelTypesClient } from './components/client';

const FuelTypesPage = async ({ params }: { params: { storeId: string } }) => {
	const fuelTypes = await prismadb.fuelType.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedFuelTypes: FuelTypeColumn[] = fuelTypes.map((item) => ({
		id: item.id,
		name: item.name,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<FuelTypesClient data={formattedFuelTypes} />
			</div>
		</div>
	);
};

export default FuelTypesPage;
