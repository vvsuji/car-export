import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
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
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { driveTypeId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.driveTypeId) {
			return new NextResponse('driveType id is required', { status: 400 });
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

		const driveType = await prismadb.driveType.delete({
			where: {
				id: params.driveTypeId,
			},
		});

		return NextResponse.json(driveType);
	} catch (error) {
		console.log('[DRIVETYPE_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { driveTypeId: string; storeId: string } },
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

		if (!params.driveTypeId) {
			return new NextResponse('Drive Type id is required', { status: 400 });
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

		const driveType = await prismadb.driveType.update({
			where: {
				id: params.driveTypeId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(driveType);
	} catch (error) {
		console.log('[DRIVETYPE_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}