'use client';

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { DriveType } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
========
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Model } from '@prisma/client';
import { useParams, useRouter } from "next/navigation"
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { AlertModal } from '@/components/modals/alert-modal';

const formSchema = z.object({
	name: z.string().min(1),
	// value: z.string().min(1),
});

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
type DriveTypeFormValues = z.infer<typeof formSchema>;

interface DriveTypeFormProps {
	initialData: DriveType | null;
}

export const DriveTypeForm: React.FC<DriveTypeFormProps> = ({
	initialData,
}) => {
========
type ModelFormValues = z.infer<typeof formSchema>;

interface ModelFormProps {
	initialData: Model | null;
};

export const ModelForm: React.FC<ModelFormProps> = ({ initialData }) => {
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
	const title = initialData ? 'Edit condition' : 'Create condition';
	const description = initialData ? 'Edit a condition.' : 'Add a new condition';
	const toastMessage = initialData
		? 'Condition updated.'
		: 'Condition created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<DriveTypeFormValues>({
========
	const title = initialData ? 'Edit model' : 'Create model';
	const description = initialData ? 'Edit a model.' : 'Add a new model';
	const toastMessage = initialData ? 'Model updated.' : 'Model created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<ModelFormValues>({
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
		},
	});

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
	const onSubmit = async (data: DriveTypeFormValues) => {
========
	const onSubmit = async (data: ModelFormValues) => {
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
					`/api/${params.storeId}/drivetypes/${params.driveTypeId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/drivetypes`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/drivetypes`);
========
					`/api/${params.storeId}/models/${params.modelId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/models`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/models`);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
			toast.success(toastMessage);
		} catch (error: any) {
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
			await axios.delete(
				`/api/${params.storeId}/drivetypes/${params.driveTypeId}`,
			);
			router.refresh();
			router.push(`/${params.storeId}/drivetypes`);
			toast.success('Condition deleted.');
		} catch (error: any) {
			toast.error(
				'Condition sure you removed all products using this condition first.',
			);
========
			await axios.delete(`/api/${params.storeId}/models/${params.modelId}`);
			router.refresh();
			router.push(`/${params.storeId}/models`);
			toast.success('Model deleted.');
		} catch (error: any) {
			toast.error('Make sure you removed all products using this model first.');
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant='destructive'
						size='sm'
						onClick={() => setOpen(true)}>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'>
					<div className='md:grid md:grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
											placeholder='Condition name'
========
											placeholder='Model name'
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* <FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/drivetypes/[driveTypeId]/components/drive-type-form.tsx
											placeholder='Condition value'
========
											placeholder='Model value'
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/models/[modelId]/components/model-form.tsx
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
