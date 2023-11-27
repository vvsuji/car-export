import prismadb from "@/lib/prismadb";

import { EngineVolumeForm } from './components/engine-volume-form';

const EngineVolumePage = async ({
	params,
}: {
	params: { engineVolumeId: string };
}) => {
	const engineVolume = await prismadb.engineVolume.findUnique({
		where: {
			id: params.engineVolumeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<EngineVolumeForm initialData={engineVolume} />
			</div>
		</div>
	);
};

export default EngineVolumePage;
