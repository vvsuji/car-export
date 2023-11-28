import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
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
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { optionId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.optionId) {
			return new NextResponse('Option id is required', { status: 400 });
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

		const option = await prismadb.option.delete({
			where: {
				id: params.optionId,
			},
		});

		return NextResponse.json(option);
	} catch (error) {
		console.log('[OPTION_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { optionId: string; storeId: string } },
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

		if (!params.optionId) {
			return new NextResponse('Option id is required', { status: 400 });
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

		const option = await prismadb.option.update({
			where: {
				id: params.optionId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(option);
	} catch (error) {
		console.log('[OPTION_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
