"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, EngineVolumeColumn } from './columns';

interface EngineVolumesClientProps {
	data: EngineVolumeColumn[];
}

export const EngineVolumesClient: React.FC<EngineVolumesClientProps> = ({
	data,
}) => {
	const params = useParams();
	const router = useRouter();

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={`Engine Volumes (${data.length})`}
					description='Manage engine volumes for your products'
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/enginevolumes/new`)}>
					<Plus className='mr-2 h-4 w-4' /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey='name' columns={columns} data={data} />
			<Heading title='API' description='API Calls for Engine Volumes' />
			<Separator />
			<ApiList entityName='enginevolumes' entityIdName='engineVolumeId' />
		</>
	);
};
