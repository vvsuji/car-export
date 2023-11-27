import prismadb from '@/lib/prismadb';

import { DriveTypeForm } from './components/drive-type-form';

const DriveTypePage = async ({
	params,
}: {
	params: { driveTypeId: string };
}) => {
	const driveType = await prismadb.driveType.findUnique({
		where: {
			id: params.driveTypeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<DriveTypeForm initialData={driveType} />
			</div>
		</div>
	);
};

export default DriveTypePage;
