import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';

export async function GET(
	req: Request,
	{ params }: { params: { conditionId: string } },
) {
	try {
		if (!params.conditionId) {
			return new NextResponse('Condition id is required', { status: 400 });
		}

		const condition = await prismadb.condition.findUnique({
			where: {
				id: params.conditionId,
			},
		});

		return NextResponse.json(condition);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { conditionId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.conditionId) {
			return new NextResponse('Condition id is required', { status: 400 });
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

		const condition = await prismadb.condition.delete({
			where: {
				id: params.conditionId,
			},
		});

		return NextResponse.json(condition);
	} catch (error) {
		console.log('[CONDITION_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { conditionId: string; storeId: string } },
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

		if (!params.conditionId) {
			return new NextResponse('Condition id is required', { status: 400 });
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

		const condition = await prismadb.condition.update({
			where: {
				id: params.conditionId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(condition);
	} catch (error) {
		console.log('[CONDITION_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
