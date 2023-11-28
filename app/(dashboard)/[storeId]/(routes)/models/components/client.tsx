"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, ModelColumn } from './columns';

interface ModelsClientProps {
	data: ModelColumn[];
}

export const ModelsClient: React.FC<ModelsClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Models (${data.length})`}
					description='Manage models for your products'
				/>
				<Button onClick={() => router.push(`/${params.storeId}/models/new`)}>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey='name' columns={columns} data={data} />
			<Heading title='API' description='API Calls for Models' />
			<Separator />
			<ApiList entityName='models' entityIdName='modelId' />
		</>
	);
};
