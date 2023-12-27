import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';



export async function GET(req: Request, { params }: { params: { option: string[] } }) {
	// Expect an array of string
	try {
		if (!params.option || params.option.length === 0) {
			return new NextResponse('Option id(s) are required', { status: 400 });
		}

		const options = await prismadb.option.findMany({
			where: {
				id: {
					in: params.option,
				},
			},
		});

		return NextResponse.json(options);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { option: string[]; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.option || params.option.length === 0) {
			return new NextResponse('Option id(s) are required', { status: 400 });
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

		const deletedOptions = await prismadb.option.deleteMany({
			where: {
				id: {
					in: params.option,
				},
				storeId: params.storeId,
			},
		});

		return NextResponse.json(deletedOptions);
	} catch (error) {
		console.log('[OPTION_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function PATCH(
	req: Request,
	{ params }: { params: { option: string[]; storeId: string } },
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

		if (!params.option || params.option.length === 0) {
			return new NextResponse('Option id(s) are required', { status: 400 });
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

		const updatedOptions = await prismadb.option.updateMany({
			where: {
				id: {
					in: params.option,
				},
				storeId: params.storeId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(updatedOptions);
	} catch (error) {
		console.log('[OPTION_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

