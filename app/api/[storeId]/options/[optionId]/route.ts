import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
	{ params }: { params: { driveTypeId: string } },
) {
	try {
		if (!params.driveTypeId) {
			return new NextResponse('driveType id is required', { status: 400 });
		}

		const driveType = await prismadb.driveType.findUnique({
			where: {
				id: params.driveTypeId,
			},
		});

		return NextResponse.json(driveType);
========
	{ params }: { params: { optionId: string } },
) {
	try {
		if (!params.optionId) {
			return new NextResponse('Option id is required', { status: 400 });
		}

		const option = await prismadb.option.findUnique({
			where: {
				id: params.optionId,
			},
		});

		return NextResponse.json(option);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
	{ params }: { params: { driveTypeId: string; storeId: string } },
========
	{ params }: { params: { optionId: string; storeId: string } },
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
		if (!params.driveTypeId) {
			return new NextResponse('driveType id is required', { status: 400 });
========
		if (!params.optionId) {
			return new NextResponse('Option id is required', { status: 400 });
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
		const driveType = await prismadb.driveType.delete({
			where: {
				id: params.driveTypeId,
			},
		});

		return NextResponse.json(driveType);
	} catch (error) {
		console.log('[DRIVETYPE_DELETE]', error);
========
		const option = await prismadb.option.delete({
			where: {
				id: params.optionId,
			},
		});

		return NextResponse.json(option);
	} catch (error) {
		console.log('[OPTION_DELETE]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
	{ params }: { params: { driveTypeId: string; storeId: string } },
========
	{ params }: { params: { optionId: string; storeId: string } },
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const { name } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
		if (!params.driveTypeId) {
			return new NextResponse('Drive Type id is required', { status: 400 });
========
		// if (!value) {
		// 	return new NextResponse('Value is required', { status: 400 });
		// }

		if (!params.optionId) {
			return new NextResponse('Option id is required', { status: 400 });
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse('Unauthorized', { status: 405 });
		}

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
		const driveType = await prismadb.driveType.update({
			where: {
				id: params.driveTypeId,
========
		const option = await prismadb.option.update({
			where: {
				id: params.optionId,
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
			},
			data: {
				name,
			},
		});

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/[driveTypeId]/route.ts
		return NextResponse.json(driveType);
	} catch (error) {
		console.log('[DRIVETYPE_PATCH]', error);
========
		return NextResponse.json(option);
	} catch (error) {
		console.log('[OPTION_PATCH]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/[optionId]/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}
