import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { engineVolumeId: string } },
) {
	try {
		if (!params.engineVolumeId) {
			return new NextResponse('Engine volume id is required', { status: 400 });
		}

		const engineVolume = await prismadb.engineVolume.findUnique({
			where: {
				id: params.engineVolumeId,
			},
		});

		return NextResponse.json(engineVolume);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { engineVolumeId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.engineVolumeId) {
			return new NextResponse('Engine volume id is required', { status: 400 });
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

		const engineVolume = await prismadb.engineVolume.delete({
			where: {
				id: params.engineVolumeId,
			},
		});

		return NextResponse.json(engineVolume);
	} catch (error) {
		console.log('[ENGINEVOLUME_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { engineVolumeId: string; storeId: string } },
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

		if (!params.engineVolumeId) {
			return new NextResponse('Engine volume id is required', { status: 400 });
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

		const engineVolume = await prismadb.engineVolume.update({
			where: {
				id: params.engineVolumeId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(engineVolume);
	} catch (error) {
		console.log('[ENGINEVOLUME_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
