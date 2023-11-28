import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { ModelColumn } from './components/columns';
import { ModelsClient } from './components/client';

const ModelsPage = async ({ params }: { params: { storeId: string } }) => {
	const models = await prismadb.model.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedModels: ModelColumn[] = models.map((item) => ({
		id: item.id,
		name: item.name,
		// value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ModelsClient data={formattedModels} />
			</div>
		</div>
	);
};

export default ModelsPage;
