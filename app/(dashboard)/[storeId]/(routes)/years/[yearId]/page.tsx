import prismadb from "@/lib/prismadb";

import { YearForm } from './components/year-form';

const YearPage = async ({ params }: { params: { yearId: string } }) => {
	const year = await prismadb.year.findUnique({
		where: {
			id: params.yearId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<YearForm initialData={year} />
			</div>
		</div>
	);
};

export default YearPage;
