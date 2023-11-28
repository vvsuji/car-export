import prismadb from "@/lib/prismadb";

import { SteeringForm } from './components/steering-form';

const SteeringPage = async ({ params }: { params: { steeringId: string } }) => {
	const steering = await prismadb.steering.findUnique({
		where: {
			id: params.steeringId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SteeringForm initialData={steering} />
			</div>
		</div>
	);
};

export default SteeringPage;
