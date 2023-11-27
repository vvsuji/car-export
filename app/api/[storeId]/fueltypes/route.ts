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

		const fuelType = await prismadb.fuelType.create({
			data: {
				name,
				storeId: params.storeId,
			},
		});

		return NextResponse.json(fuelType);
	} catch (error) {
		console.log('[FUELTYPES_POST]', error);
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

		const fuelTypes = await prismadb.fuelType.findMany({
			where: {
				storeId: params.storeId,
			},
		});

		return NextResponse.json(fuelTypes);
	} catch (error) {
		console.log('[FUELTYPES_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
