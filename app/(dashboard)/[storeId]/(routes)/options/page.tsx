import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { OptionColumn } from './components/columns';
import { OptionsClient } from './components/client';

const OptionsPage = async ({ params }: { params: { storeId: string } }) => {
	const options = await prismadb.option.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedOptions: OptionColumn[] = options.map((item) => ({
		id: item.id,
		name: item.name,
		// value: item.value,
		createdAt: format(item.createdAt, 'MMMM do, yyyy'),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<OptionsClient data={formattedOptions} />
			</div>
		</div>
	);
};

export default OptionsPage;
