import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { userId } = auth();

		const body = await req.json();

		const {
			name,
			price,
			categoryId,
			colorId,
			makeId,
			conditionId,
			driveTypeId,
			engineVolumeId,
			fuelTypeId,
			locationId,
			modelId,
			optionId,
			passengerId,
			steeringId,
			transmissionId,
			yearId,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!images || !images.length) {
			return new NextResponse('Images are required', { status: 400 });
		}

		if (!price) {
			return new NextResponse('Price is required', { status: 400 });
		}

		if (!categoryId) {
			return new NextResponse('Category id is required', { status: 400 });
		}

		if (!colorId) {
			return new NextResponse('Color id is required', { status: 400 });
		}

		if (!makeId) {
			return new NextResponse('Make id is required', { status: 400 });
		}

		if (!yearId) {
			return new NextResponse('Year id is required', { status: 400 });
		}

		if (!conditionId) {
			return new NextResponse('Condition id is required', { status: 400 });
		}

		if (!driveTypeId) {
			return new NextResponse('Drive Type id is required', { status: 400 });
		}

		if (!engineVolumeId) {
			return new NextResponse('Engine Volume id is required', { status: 400 });
		}

		if (!fuelTypeId) {
			return new NextResponse('Fuel Type id is required', { status: 400 });
		}

		if (!locationId) {
			return new NextResponse('Location id is required', { status: 400 });
		}

		if (!modelId) {
			return new NextResponse('Model id is required', { status: 400 });
		}

		if (!optionId) {
			return new NextResponse('Option id is required', { status: 400 });
		}

		if (!passengerId) {
			return new NextResponse('Passenger id is required', { status: 400 });
		}

		if (!steeringId) {
			return new NextResponse('Steering id is required', { status: 400 });
		}

		if (!transmissionId) {
			return new NextResponse('Transmission id is required', { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
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

		const product = await prismadb.product.create({
			data: {
				name,
				price,
				isFeatured,
				isArchived,
				categoryId,
				colorId,
				makeId,
				conditionId,
				driveTypeId,
				engineVolumeId,
				fuelTypeId,
				locationId,
				modelId,
				optionId,
				passengerId,
				steeringId,
				transmissionId,
				yearId,
				storeId: params.storeId,
				images: {
					createMany: {
						data: [...images.map((image: { url: string }) => image)],
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.log('[PRODUCTS_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const { searchParams } = new URL(req.url);
		const categoryId = searchParams.get('categoryId') || undefined;
		const colorId = searchParams.get('colorId') || undefined;
		const makeId = searchParams.get('makeId') || undefined;
		const yearId = searchParams.get('yearId') || undefined;
		const conditionId = searchParams.get('conditionId') || undefined;
		const engineVolumeId = searchParams.get('engineVolumeId') || undefined;
		const driveTypeId = searchParams.get('driveTypeId') || undefined;
		const fuelTypeId = searchParams.get('fuelTypeId') || undefined;
		const locationId = searchParams.get('locationId') || undefined;
		const modelId = searchParams.get('modelId') || undefined;
		const optionId = searchParams.get('optionId') || undefined;
		const passengerId = searchParams.get('passengerId') || undefined;
		const steeringId = searchParams.get('steeringId') || undefined;
		const transmissionId = searchParams.get('transmissionId') || undefined;
		const isFeatured = searchParams.get('isFeatured');

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const products = await prismadb.product.findMany({
			where: {
				storeId: params.storeId,
				categoryId,
				colorId,
				makeId,
				yearId,
				conditionId,
				driveTypeId,
				engineVolumeId,
				fuelTypeId,
				locationId,
				modelId,
				optionId,
				passengerId,
				steeringId,
				transmissionId,
				isFeatured: isFeatured ? true : undefined,
				isArchived: false,
			},
			include: {
				images: true,
				category: true,
				color: true,
				make: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.log('[PRODUCTS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
};