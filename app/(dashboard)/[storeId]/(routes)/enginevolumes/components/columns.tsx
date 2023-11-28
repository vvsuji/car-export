"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type EngineVolumeColumn = {
	id: string;
	name: string;
	// value: string;
	createdAt: string;
};

export const columns: ColumnDef<EngineVolumeColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},

	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
