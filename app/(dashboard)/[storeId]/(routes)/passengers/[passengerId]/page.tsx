import prismadb from "@/lib/prismadb";

import { PassengerForm } from './components/passengers-form';

const PassengerPage = async ({
	params,
}: {
	params: { passengerId: string };
}) => {
	const passenger = await prismadb.passenger.findUnique({
		where: {
			id: params.passengerId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<PassengerForm initialData={passenger} />
			</div>
		</div>
	);
};

export default PassengerPage;
