import prismadb from '@/lib/prismadb';

import { OptionForm } from './components/options-form';

const OptionPage = async ({ params }: { params: { optionId: string } }) => {
	const option = await prismadb.option.findUnique({
		where: {
			id: params.optionId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<OptionForm initialData={option} />
			</div>
		</div>
	);
};

export default OptionPage;
