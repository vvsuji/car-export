'use client';

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import { Location } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
========
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Year } from '@prisma/client';
import { useParams, useRouter } from "next/navigation"
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx

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

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
type LocationFormValues = z.infer<typeof formSchema>;

interface LocationFormProps {
	initialData: Location | null;
}

export const LocationForm: React.FC<LocationFormProps> = ({ initialData }) => {
========
type YearFormValues = z.infer<typeof formSchema>;

interface YearFormProps {
	initialData: Year | null;
};

export const YearForm: React.FC<YearFormProps> = ({ initialData }) => {
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
	const title = initialData ? 'Edit location' : 'Create location';
	const description = initialData ? 'Edit a location.' : 'Add a new location';
	const toastMessage = initialData ? 'Location updated.' : 'Location created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<LocationFormValues>({
========
	const title = initialData ? 'Edit year' : 'Create year';
	const description = initialData ? 'Edit a year.' : 'Add a new year';
	const toastMessage = initialData ? 'Year updated.' : 'Year created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<YearFormValues>({
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
		},
	});

<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
	const onSubmit = async (data: LocationFormValues) => {
========
	const onSubmit = async (data: YearFormValues) => {
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
					`/api/${params.storeId}/locations/${params.locationId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/locations`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/locations`);
========
					`/api/${params.storeId}/years/${params.yearId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/years`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/years`);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
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
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
			await axios.delete(
				`/api/${params.storeId}/locations/${params.locationId}`,
			);
			router.refresh();
			router.push(`/${params.storeId}/locations`);
			toast.success('Location deleted.');
		} catch (error: any) {
			toast.error(
				'Make sure you removed all products using this location first.',
			);
========
			await axios.delete(`/api/${params.storeId}/years/${params.yearId}`);
			router.refresh();
			router.push(`/${params.storeId}/years`);
			toast.success('Year deleted.');
		} catch (error: any) {
			toast.error('Make sure you removed all products using this year first.');
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
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
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
											placeholder='Location name'
========
											placeholder='Year name'
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
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
<<<<<<<< HEAD:app/(dashboard)/[storeId]/(routes)/locations/[locationId]/components/location-form.tsx
											placeholder='Location value'
========
											placeholder='Year value'
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/(dashboard)/[storeId]/(routes)/years/[yearId]/components/year-form.tsx
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
