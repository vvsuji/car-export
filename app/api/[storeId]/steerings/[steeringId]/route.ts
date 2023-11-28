import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { steeringId: string } },
) {
	try {
		if (!params.steeringId) {
			return new NextResponse('Steering id is required', { status: 400 });
		}

		const steering = await prismadb.steering.findUnique({
			where: {
				id: params.steeringId,
			},
		});

		return NextResponse.json(steering);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { steeringId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.steeringId) {
			return new NextResponse('Steering id is required', { status: 400 });
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

		const steering = await prismadb.steering.delete({
			where: {
				id: params.steeringId,
			},
		});

		return NextResponse.json(steering);
	} catch (error) {
		console.log('[STEERING_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { steeringId: string; storeId: string } },
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

		if (!params.steeringId) {
			return new NextResponse('Steering id is required', { status: 400 });
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

		const steering = await prismadb.steering.update({
			where: {
				id: params.steeringId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(steering);
	} catch (error) {
		console.log('[STEERING_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
