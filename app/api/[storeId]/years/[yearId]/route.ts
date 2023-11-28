import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
	{ params }: { params: { locationId: string } },
) {
	try {
		if (!params.locationId) {
			return new NextResponse('Location id is required', { status: 400 });
		}

		const location = await prismadb.location.findUnique({
			where: {
				id: params.locationId,
			},
		});

		return NextResponse.json(location);
========
	{ params }: { params: { yearId: string } },
) {
	try {
		if (!params.yearId) {
			return new NextResponse('Year id is required', { status: 400 });
		}

		const year = await prismadb.year.findUnique({
			where: {
				id: params.yearId,
			},
		});

		return NextResponse.json(year);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
	{ params }: { params: { locationId: string; storeId: string } },
========
	{ params }: { params: { yearId: string; storeId: string } },
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
		if (!params.locationId) {
			return new NextResponse('Location id is required', { status: 400 });
========
		if (!params.yearId) {
			return new NextResponse('Year id is required', { status: 400 });
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
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

<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
		const location = await prismadb.location.delete({
			where: {
				id: params.locationId,
			},
		});

		return NextResponse.json(location);
	} catch (error) {
		console.log('[LOCATION_DELETE]', error);
========
		const year = await prismadb.year.delete({
			where: {
				id: params.yearId,
			},
		});

		return NextResponse.json(year);
	} catch (error) {
		console.log('[YEAR_DELETE]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
	{ params }: { params: { locationId: string; storeId: string } },
========
	{ params }: { params: { yearId: string; storeId: string } },
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
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

<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
		if (!params.locationId) {
			return new NextResponse('Location id is required', { status: 400 });
========
		if (!params.yearId) {
			return new NextResponse('Year id is required', { status: 400 });
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
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

<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
		const location = await prismadb.location.update({
			where: {
				id: params.locationId,
========
		const year = await prismadb.year.update({
			where: {
				id: params.yearId,
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
			},
			data: {
				name,
			},
		});

<<<<<<<< HEAD:app/api/[storeId]/locations/[locationId]/route.ts
		return NextResponse.json(location);
	} catch (error) {
		console.log('[LOCATION_PATCH]', error);
========
		return NextResponse.json(year);
	} catch (error) {
		console.log('[YEAR_PATCH]', error);
>>>>>>>> 53f550f856d54e612a3c99786edcda9ac800bf03:app/api/[storeId]/years/[yearId]/route.ts
		return new NextResponse('Internal error', { status: 500 });
	}
}
