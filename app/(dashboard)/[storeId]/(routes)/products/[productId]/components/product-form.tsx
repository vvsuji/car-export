'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, UseFormReturn } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Trash } from 'lucide-react';
import {
	Category,
	Color,
	Condition,
	DriveType,
	FuelType,
	Image,
	Location,
	Make,
	Model,
	Option,
	Passenger,
	Product,
	Steering,
	Transmission,
} from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { AlertModal } from '@/components/modals/alert-modal';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import ImageUpload from '@/components/ui/image-upload';
import { Checkbox } from '@/components/ui/checkbox';
import { Container } from 'postcss';
import { carModels } from './car-models';
import { FancyMultiSelect, OptionType } from './fancy-multi-select';

const formSchema = z.object({
	images: z.object({ url: z.string() }).array(),
	price: z.coerce.number().min(1),
	categoryId: z.string().min(1),
	colorId: z.string().min(1),
	makeId: z.string().min(1),
	conditionId: z.string().min(1),
	driveTypeId: z.string().min(1),
	fuelTypeId: z.string().min(1),
	locationId: z.string().min(1),
	modelId: z.string().min(1),
	optionId: z.array(z.string().min(1)),
	passengerId: z.string().min(1),
	steeringId: z.string().min(1),
	transmissionId: z.string().min(1),
	year: z.coerce.number().min(1),
	isFeatured: z.boolean().default(false).optional(),
	isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
	initialData:
		| (Product & {
				images: Image[];
		  })
		| null;
	categories: Category[];
	colors: Color[];
	makes: Make[];
	conditions: Condition[];
	driveTypes: DriveType[];
	fuelTypes: FuelType[];
	locations: Location[];
	models: Model[];
	options: Option[];
	passengers: Passenger[];
	steerings: Steering[];
	transmissions: Transmission[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
	makes,
	colors,
	conditions,
	driveTypes,
	fuelTypes,
	locations,
	models,
	options,
	passengers,
	steerings,
	transmissions,
}) => {
	const params = useParams();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

	const fancyMultiSelectOptions = options.map((option) => ({
		id: option.id,
		name: option.name,
	}));

	const title = initialData ? 'Edit product' : 'Create product';
	const description = initialData ? 'Edit a product.' : 'Add a new product';
	const toastMessage = initialData ? 'Product updated.' : 'Product created.';
	const action = initialData ? 'Save changes' : 'Create';

	const defaultValues = initialData
		? {
				...initialData,
				optionId: Array.isArray(initialData?.optionId)
					? initialData.optionId
					: [],
				price:
					initialData?.price !== null
						? parseFloat(String(initialData.price))
						: 0,
				year:
					initialData?.year !== null ? parseFloat(String(initialData.year)) : 0,
		  }
		: {
				images: [],
				price: 0,
				category: '',
				color: '',
				make: '',
				condition: '',
				driveType: '',
				fuelType: '',
				location: '',
				model: '',
				option: [],
				passenger: '',
				steering: '',
				transmission: '',
				year: 0,
				isFeatured: false,
				isArchived: false,
		  };

	type CarModels = typeof carModels;

	type SelectedMake = keyof CarModels;

	const form = useForm<ProductFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues,
	});

	useEffect(() => {
		const selectedIds = selectedOptions.map((option) => option.id);
		form.setValue('optionId', selectedIds);
	}, [selectedOptions, form]);

	type FormResetProps = {
		form: UseFormReturn<ProductFormValues>;
		watchField: keyof ProductFormValues;
		resetFields: Array<keyof ProductFormValues>;
	};

	const useFormReset = ({ form, watchField, resetFields }: FormResetProps) => {
		useEffect(() => {
			const watchFieldValue = form.watch(watchField);

			if (resetFields.includes(watchField)) {
				resetFields.forEach((field) => {
					if (field !== watchField) {
						form.setValue(field, '');
					}
				});
			}
		}, [form, watchField, resetFields]);
	};

	useFormReset({ form, watchField: 'makeId', resetFields: ['modelId'] });
	useFormReset({
		form,
		watchField: 'categoryId',
		resetFields: ['makeId', 'modelId'],
	});

	const onSubmit = async (data: ProductFormValues) => {
		console.log(data);
		try {
			setLoading(true);
			const updatedData = {
				...data,
				option: selectedOptions.map((o) => o.id), // Convert selected options to just IDs
			};

			const response = initialData
				? await axios.patch(
						`/api/${params.storeId}/products/${params.productId}`,
						updatedData,
				  )
				: await axios.post(`/api/${params.storeId}/products`, updatedData);

			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success(toastMessage);
		} catch (error: any) {
			console.error('Error posting data:', error);
			toast.error('Something went wrong.');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
			router.refresh();
			router.push(`/${params.storeId}/products`);
			toast.success('Product deleted.');
		} catch (error: any) {
			toast.error('Something went wrong.');
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
					<FormField
						control={form.control}
						name='images'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map((image) => image.url)}
										disabled={loading}
										onChange={(url) =>
											field.onChange([...field.value, { url }])
										}
										onRemove={(url) =>
											field.onChange([
												...field.value.filter((current) => current.url !== url),
											])
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='md:grid md:grid-cols-3 gap-8'>
						{/* <FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='Product name'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/> */}
						<FormField
							control={form.control}
							name='categoryId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a category'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.name}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='makeId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Make</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a make'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent className='max-h-40 overflow-y-auto z-10'>
											{makes
												.slice()
												.sort((a, b) => a.name.localeCompare(b.name))
												.map((make) => (
													<SelectItem
														key={make.id}
														value={make.name}
														className='px-2 py-1'>
														{make.name}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='modelId'
							render={({ field }) => {
								const selectedMake = form.getValues('makeId') as SelectedMake;
								const selectedCategory = form.getValues('categoryId') as
									| 'Cars'
									| 'Trucks'
									| 'SUVs';

								let carModelsForSelectedMakeAndCategory: string[] = [];

								if (
									selectedMake &&
									selectedCategory &&
									carModels[selectedMake]
								) {
									carModelsForSelectedMakeAndCategory =
										carModels[selectedMake][selectedCategory];
								}

								return (
									<FormItem>
										<FormLabel>Model</FormLabel>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														placeholder='Select a model'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent className='max-h-40 overflow-y-auto z-10'>
												{carModelsForSelectedMakeAndCategory.map(
													(model, index) => (
														<SelectItem
															key={index}
															value={model}
															className='px-2 py-1'>
															{model}
														</SelectItem>
													),
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								);
							}}
						/>

						{/* <FormField
							control={form.control}
							name='modelId'
							render={({ field }) => (
									<FormItem>
										<FormLabel>Model</FormLabel>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														placeholder='Select a model'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{models?.map((model) => (
													<SelectItem key={model.id} value={model.id}>
														{model.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
						/> */}
						<FormField
							control={form.control}
							name='conditionId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Condition</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a condition'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{conditions?.map((condition) => (
												<SelectItem key={condition.id} value={condition.id}>
													{condition.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='driveTypeId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Drive Type</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a drive type'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{driveTypes?.map((driveType) => (
												<SelectItem key={driveType.id} value={driveType.id}>
													{driveType.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='fuelTypeId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Fuel Type</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a fuel type'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{fuelTypes?.map((fuelType) => (
												<SelectItem key={fuelType.id} value={fuelType.id}>
													{fuelType.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='locationId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Location</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a location'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{locations?.map((location) => (
												<SelectItem key={location.id} value={location.id}>
													{location.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='optionId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Options</FormLabel>
									<FancyMultiSelect
										options={fancyMultiSelectOptions}
										selected={fancyMultiSelectOptions.filter((o) =>
											Array.isArray(field.value)
												? field.value.includes(o.id)
												: false,
										)}
										onChange={(selectedOptions) => {
											const selectedIds = selectedOptions.map(
												(option) => option.id,
											);
											form.setValue('optionId', selectedIds);
											console.log(selectedIds);
										}} // Update form state
									/>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='passengerId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Passenger</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select passengers'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{passengers?.map((passenger) => (
												<SelectItem key={passenger.id} value={passenger.id}>
													{passenger.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='steeringId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Steering</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select steering'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{steerings?.map((steering) => (
												<SelectItem key={steering.id} value={steering.id}>
													{steering.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='transmissionId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Transmission</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select transmission'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{transmissions?.map((transmission) => (
												<SelectItem
													key={transmission.id}
													value={transmission.id}>
													{transmission.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='colorId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Color</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder='Select a color'
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{colors.map((color) => (
												<SelectItem key={color.id} value={color.id}>
													{color.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='year'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Year</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={loading}
											placeholder='2023'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											type='number'
											disabled={loading}
											placeholder='9.99'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isFeatured'
							render={({ field }) => (
								<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
									<FormControl>
										<Checkbox
											checked={field.value}
											// @ts-ignore
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>Featured</FormLabel>
										<FormDescription>
											This product will appear on the home page
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isArchived'
							render={({ field }) => (
								<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
									<FormControl>
										<Checkbox
											checked={field.value}
											// @ts-ignore
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>Archived</FormLabel>
										<FormDescription>
											This product will not appear anywhere in the store.
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
