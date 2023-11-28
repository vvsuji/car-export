"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, TransmissionColumn } from './columns';

interface TransmissionsClientProps {
	data: TransmissionColumn[];
}

export const TransmissionsClient: React.FC<TransmissionsClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Transmissions (${data.length})`}
					description='Manage transmissions for your products'
				/>
				<Button onClick={() => router.push(`/${params.storeId}/transmissions/new`)}>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey='name' columns={columns} data={data} />
			<Heading title='API' description='API Calls for Transmissions' />
			<Separator />
			<ApiList entityName='transmissions' entityIdName='transmissionId' />
		</>
	);
};
