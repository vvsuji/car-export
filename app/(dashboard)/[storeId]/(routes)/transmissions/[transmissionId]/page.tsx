import prismadb from "@/lib/prismadb";

import { TransmissionForm } from './components/transmission-form';

const TransmissionPage = async ({
	params,
}: {
	params: { transmissionId: string };
}) => {
	const transmission = await prismadb.transmission.findUnique({
		where: {
			id: params.transmissionId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<TransmissionForm initialData={transmission} />
			</div>
		</div>
	);
};

export default TransmissionPage;
