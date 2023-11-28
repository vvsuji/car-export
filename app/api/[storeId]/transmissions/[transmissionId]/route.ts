import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { transmissionId: string } },
) {
	try {
		if (!params.transmissionId) {
			return new NextResponse('Transmission id is required', { status: 400 });
		}

		const transmission = await prismadb.transmission.findUnique({
			where: {
				id: params.transmissionId,
			},
		});

		return NextResponse.json(transmission);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { transmissionId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.transmissionId) {
			return new NextResponse('Transmission id is required', { status: 400 });
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

		const transmission = await prismadb.transmission.delete({
			where: {
				id: params.transmissionId,
			},
		});

		return NextResponse.json(transmission);
	} catch (error) {
		console.log('[TRANSMISSION_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { transmissionId: string; storeId: string } },
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

		if (!params.transmissionId) {
			return new NextResponse('Transmission id is required', { status: 400 });
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

		const transmission = await prismadb.transmission.update({
			where: {
				id: params.transmissionId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(transmission);
	} catch (error) {
		console.log('[TRANSMISSION_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
