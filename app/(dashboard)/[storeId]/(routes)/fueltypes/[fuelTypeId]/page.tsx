import prismadb from "@/lib/prismadb";

import { FuelTypeForm } from './components/fuel-type-form';

const FuelTypePage = async ({ params }: { params: { fuelTypeId: string } }) => {
	const fuelType = await prismadb.fuelType.findUnique({
		where: {
			id: params.fuelTypeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<FuelTypeForm initialData={fuelType} />
			</div>
		</div>
	);
};

export default FuelTypePage;
