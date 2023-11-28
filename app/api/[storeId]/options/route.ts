import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
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

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
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

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/route.ts
		const driveType = await prismadb.driveType.create({
========
		const option = await prismadb.option.create({
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/route.ts
			data: {
				name,
				storeId: params.storeId,
			},
		});

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/route.ts
		return NextResponse.json(driveType);
	} catch (error) {
		console.log('[DRIVETYPES_POST]', error);
========
		return NextResponse.json(option);
	} catch (error) {
		console.log('[OPTIONS_POST]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/route.ts
		const driveTypes = await prismadb.driveType.findMany({
========
		const options = await prismadb.option.findMany({
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/route.ts
			where: {
				storeId: params.storeId,
			},
		});

<<<<<<<< HEAD:app/api/[storeId]/drivetypes/route.ts
		return NextResponse.json(driveTypes);
	} catch (error) {
		console.log('[DRIVETYPE_GET]', error);
========
		return NextResponse.json(options);
	} catch (error) {
		console.log('[OPTIONS_GET]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/options/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}
