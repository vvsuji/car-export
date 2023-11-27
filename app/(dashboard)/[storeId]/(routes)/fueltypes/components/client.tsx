"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, FuelTypeColumn } from './columns';

interface FuelTypesClientProps {
	data: FuelTypeColumn[];
}

export const FuelTypesClient: React.FC<FuelTypesClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Fuel types (${data.length})`}
					description='Manage fuel types for your products'
				/>
				<Button onClick={() => router.push(`/${params.storeId}/fueltypes/new`)}>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey='name' columns={columns} data={data} />
			<Heading title='API' description='API Calls for Fuel types' />
			<Separator />
			<ApiList entityName='fueltypes' entityIdName='fuelTypeId' />
		</>
	);
};
