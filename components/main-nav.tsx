"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { cn } from '@/lib/utils';

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const params = useParams();
	const [isMounted, setIsMounted] = useState(false);

	const allRoutes = [
		{
			href: `/${params.storeId}`,
			label: 'Overview',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: 'Billboards',
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			href: `/${params.storeId}/categories`,
			label: 'Categories',
			active: pathname === `/${params.storeId}/categories`,
		},
		{
			href: `/${params.storeId}/makes`,
			label: 'Makes',
			active: pathname === `/${params.storeId}/makes`,
		},
		{
			href: `/${params.storeId}/models`,
			label: 'Models',
			active: pathname === `/${params.storeId}/models`,
		},
		{
			href: `/${params.storeId}/years`,
			label: 'Year',
			active: pathname === `/${params.storeId}/years`,
		},
		{
			href: `/${params.storeId}/fueltypes`,
			label: 'Fuel',
			active: pathname === `/${params.storeId}/fueltypes`,
		},
		{
			href: `/${params.storeId}/transmissions`,
			label: 'Transmission',
			active: pathname === `/${params.storeId}/transmissions`,
		},
		{
			href: `/${params.storeId}/drivetypes`,
			label: 'Drive',
			active: pathname === `/${params.storeId}/drivetypes`,
		},
		{
			href: `/${params.storeId}/conditions`,
			label: 'Condition',
			active: pathname === `/${params.storeId}/conditions`,
		},
		{
			href: `/${params.storeId}/passengers`,
			label: 'Passengers',
			active: pathname === `/${params.storeId}/passengers`,
		},
		{
			href: `/${params.storeId}/enginevolumes`,
			label: 'EV',
			active: pathname === `/${params.storeId}/enginevolumes`,
		},
		{
			href: `/${params.storeId}/options`,
			label: 'Option',
			active: pathname === `/${params.storeId}/options`,
		},
		{
			href: `/${params.storeId}/colors`,
			label: 'Colors',
			active: pathname === `/${params.storeId}/colors`,
		},
		{
			href: `/${params.storeId}/steerings`,
			label: 'Steering',
			active: pathname === `/${params.storeId}/steerings`,
		},
		{
			href: `/${params.storeId}/locations`,
			label: 'Location',
			active: pathname === `/${params.storeId}/locations`,
		},
		{
			href: `/${params.storeId}/products`,
			label: 'Products',
			active: pathname === `/${params.storeId}/products`,
		},
		{
			href: `/${params.storeId}/orders`,
			label: 'Orders',
			active: pathname === `/${params.storeId}/orders`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${params.storeId}/settings`,
		},
	];

	const dropdownRoutes = allRoutes.filter((route) => {
		return (
			route.href.includes(`/${params.storeId}/years`) ||
			route.href.includes(`/${params.storeId}/fueltypes`) ||
			route.href.includes(`/${params.storeId}/transmissions`) ||
			route.href.includes(`/${params.storeId}/drivetypes`) ||
			route.href.includes(`/${params.storeId}/conditions`) ||
			route.href.includes(`/${params.storeId}/passengers`) ||
			route.href.includes(`/${params.storeId}/enginevolumes`) ||
			route.href.includes(`/${params.storeId}/colors`) ||
			route.href.includes(`/${params.storeId}/steerings`) ||
			route.href.includes(`/${params.storeId}/locations`)
		);
	});

	const nonDropdownRoutes = allRoutes.filter((route) => {
		return !dropdownRoutes.find(
			(dropdownRoute) => dropdownRoute.href === route.href,
		);
	});

	useEffect(() => {
		setIsMounted(true); // Set isMounted to true when component is mounted on client side
	}, []);

	return (
		<nav
			className={cn('flex items-center space-x-4 lg:space-x-6', className)}
			{...props}>
			{isMounted &&
				nonDropdownRoutes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						passHref
						className={cn(
							'text-sm font-medium transition-colors hover:text-primary',
							route.active
								? 'text-black dark:text-white'
								: 'text-muted-foreground',
						)}>
						{/* Use a wrapper element instead of an <a> tag */}
						<div>{route.label}</div>
					</Link>
				))}
			{isMounted && dropdownRoutes.length > 0 && (
				<div className='relative'>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<button>More</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{dropdownRoutes.map((route) => (
								<DropdownMenuItem key={route.href}>
									<Link href={route.href}>{route.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)}
		</nav>
	);
}