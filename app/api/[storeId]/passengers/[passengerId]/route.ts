import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { passengerId: string } },
) {
	try {
		if (!params.passengerId) {
			return new NextResponse('Passenger id is required', { status: 400 });
		}

		const passenger = await prismadb.passenger.findUnique({
			where: {
				id: params.passengerId,
			},
		});

		return NextResponse.json(passenger);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { passengerId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.passengerId) {
			return new NextResponse('Passenger id is required', { status: 400 });
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

		const passenger = await prismadb.passenger.delete({
			where: {
				id: params.passengerId,
			},
		});

		return NextResponse.json(passenger);
	} catch (error) {
		console.log('[PASSENGER_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { passengerId: string; storeId: string } },
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

		if (!params.passengerId) {
			return new NextResponse('Passenger id is required', { status: 400 });
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

		const passenger = await prismadb.passenger.update({
			where: {
				id: params.passengerId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(passenger);
	} catch (error) {
		console.log('[PASSENGER_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
