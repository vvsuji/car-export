// import prismadb from "@/lib/prismadb";

// import { OptionForm } from './components/options-form';

// const OptionsPage = async ({ params }: { params: { option: string[] } }) => {
// 	// Assuming optionId is an array of strings
// 	const optionIds = params.option;

// 	const options = await prismadb.option.findMany({
// 		where: {
// 			id: {
// 				in: optionIds,
// 			},
// 		},
// 	});

// 	// Handling multiple options returned from the database
// 	// You might need to adjust the OptionForm component
// 	// to accept and display multiple options if necessary
// 	return (
// 		<div className='flex-col'>
// 			<div className='flex-1 space-y-4 p-8 pt-6'>
// 				{options.map((option) => (
// 					<OptionForm key={option.id} initialData={option} />
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default OptionsPage;

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
