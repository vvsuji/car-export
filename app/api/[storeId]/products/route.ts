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
			fuelTypeId,
			locationId,
			modelId,
			option,
			passengerId,
			steeringId,
			transmissionId,
			year,
			images,
			isFeatured,
			isArchived,
		} = body;

		if (
			!Array.isArray(option) ||
			option.length === 0 ||
			!option.every((id) => typeof id === 'string')
		) {
			return new NextResponse(
				'Option id must be an array of strings and must not be empty',
				{ status: 400 },
			);
		}

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		// if (!name) {
		// 	return new NextResponse('Name is required', { status: 400 });
		// }

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

		if (!year) {
			return new NextResponse('Year is required', { status: 400 });
		}

		if (!conditionId) {
			return new NextResponse('Condition id is required', { status: 400 });
		}

		if (!driveTypeId) {
			return new NextResponse('Drive Type id is required', { status: 400 });
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
				price,
				isFeatured,
				isArchived,
				year,
				optionId: "hey, don't delete me unless you remove optionId from Product",
				images: {
					createMany: {
						data: images.map((image: { url: string }) => ({ url: image.url })),
					},
				},
				option: {
					connect: option.map((id: string) => ({ id })),
					// expects in this form: [{ id: "8" }, { id: "9" }, { id: "10" }],
				},
				store: {
					connect: {
						id: params.storeId,
					},
				},
				category: {
					connect: {
						id: categoryId,
					},
				},
				make: {
					connect: {
						id: makeId,
					},
				},
				model: modelId,
				fuelType: {
					connect: {
						id: fuelTypeId,
					},
				},
				transmission: {
					connect: {
						id: transmissionId,
					},
				},
				driveType: {
					connect: {
						id: driveTypeId,
					},
				},
				condition: {
					connect: {
						id: conditionId,
					},
				},
				passenger: {
					connect: {
						id: passengerId,
					},
				},
				color: {
					connect: {
						id: colorId,
					},
				},
				steering: {
					connect: {
						id: steeringId,
					},
				},
				location: {
					connect: {
						id: locationId,
					},
				},
			},
		});

		return NextResponse.json(product);
	} catch (error) {
		console.error('[PRODUCTS_POST]', error);
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
		const conditionId = searchParams.get('conditionId') || undefined;
		const driveTypeId = searchParams.get('driveTypeId') || undefined;
		const fuelTypeId = searchParams.get('fuelTypeId') || undefined;
		const locationId = searchParams.get('locationId') || undefined;
		const model = searchParams.get('modelId') || undefined;
		const option = searchParams.get('option') || undefined;
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
				conditionId,
				driveTypeId,
				fuelTypeId,
				locationId,
				model,
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
				option: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(products);
	} catch (error) {
		console.error('[PRODUCTS_GET]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
};