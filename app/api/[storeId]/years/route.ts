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

		// if (!value) {
		// 	return new NextResponse('Value is required', { status: 400 });
		// }

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

<<<<<<<< HEAD:app/api/[storeId]/locations/route.ts
		const location = await prismadb.location.create({
========
		const year = await prismadb.year.create({
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/route.ts
			data: {
				name,
				storeId: params.storeId,
			},
		});

<<<<<<<< HEAD:app/api/[storeId]/locations/route.ts
		return NextResponse.json(location);
	} catch (error) {
		console.log('[LOCATIONS_POST]', error);
========
		return NextResponse.json(year);
	} catch (error) {
		console.log('[YEARS_POST]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/route.ts
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

<<<<<<<< HEAD:app/api/[storeId]/locations/route.ts
		const locations = await prismadb.location.findMany({
========
		const years = await prismadb.year.findMany({
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/route.ts
			where: {
				storeId: params.storeId,
			},
		});

<<<<<<<< HEAD:app/api/[storeId]/locations/route.ts
		return NextResponse.json(locations);
	} catch (error) {
		console.log('[LOCATIONS_GET]', error);
========
		return NextResponse.json(years);
	} catch (error) {
		console.log('[YEARS_GET]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}
