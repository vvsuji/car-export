import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { DriveTypeColumn } from './components/columns';
import { DriveTypesClient } from './components/client';

const DriveTypesPage = async ({ params }: { params: { storeId: string } }) => {
	const driveTypes = await prismadb.driveType.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedDriveTypes: DriveTypeColumn[] = driveTypes.map((item) => ({
		id: item.id,
		name: item.name,
		// value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<DriveTypesClient data={formattedDriveTypes} />
			</div>
		</div>
	);
};

export default DriveTypesPage;
