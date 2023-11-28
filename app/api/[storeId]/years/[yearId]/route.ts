import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
	req: Request,
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
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { yearId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.yearId) {
			return new NextResponse('Year id is required', { status: 400 });
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

		const year = await prismadb.year.delete({
			where: {
				id: params.yearId,
			},
		});

		return NextResponse.json(year);
	} catch (error) {
		console.log('[YEAR_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
};


export async function PATCH(
	req: Request,
	{ params }: { params: { yearId: string; storeId: string } },
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

		if (!params.yearId) {
			return new NextResponse('Year id is required', { status: 400 });
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

		const year = await prismadb.year.update({
			where: {
				id: params.yearId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(year);
	} catch (error) {
		console.log('[YEAR_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
};
