"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { Make } from '@prisma/client';
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"

const formSchema = z.object({
	name: z.string().min(1),
});

type MakeFormValues = z.infer<typeof formSchema>;

interface MakeFormProps {
	initialData: Make | null;
};

export const MakeForm: React.FC<MakeFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit make' : 'Create make';
	const description = initialData ? 'Edit a make.' : 'Add a new make';
	const toastMessage = initialData ? 'Make updated.' : 'Make created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<MakeFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
		},
	});

	const onSubmit = async (data: MakeFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/makes/${params.makeId}`,
					data,
				);
			} else {
				await axios.post(`/api/${params.storeId}/makes`, data);
			}
			router.refresh();
			router.push(`/${params.storeId}/makes`);
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
			await axios.delete(`/api/${params.storeId}/makes/${params.makeId}`);
			router.refresh();
			router.push(`/${params.storeId}/makes`);
			toast.success('Make deleted.');
		} catch (error: any) {
			toast.error('Make sure you removed all products using this make first.');
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
											placeholder='Make name'
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
											placeholder='Make value'
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
