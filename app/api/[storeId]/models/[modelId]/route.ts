import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
	req: Request,
	{ params }: { params: { modelId: string } },
) {
	try {
		if (!params.modelId) {
			return new NextResponse('Model id is required', { status: 400 });
		}

		const model = await prismadb.model.findUnique({
			where: {
				id: params.modelId,
			},
		});

		return NextResponse.json(model);
	} catch (error) {
		console.log('[_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { modelId: string; storeId: string } },
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.modelId) {
			return new NextResponse('Model id is required', { status: 400 });
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

		const model = await prismadb.model.delete({
			where: {
				id: params.modelId,
			},
		});

		return NextResponse.json(model);
	} catch (error) {
		console.log('[MODEL_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
};


export async function PATCH(
	req: Request,
	{ params }: { params: { modelId: string; storeId: string } },
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

		if (!params.modelId) {
			return new NextResponse('Model id is required', { status: 400 });
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

		const model = await prismadb.model.update({
			where: {
				id: params.modelId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(model);
	} catch (error) {
		console.log('[MODEL_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
};
