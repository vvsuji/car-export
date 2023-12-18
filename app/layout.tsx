import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { MantineProvider } from '@mantine/core';

import { ModalProvider } from '@/providers/modal-provider';
import { ToastProvider } from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Dashboard',
	description: 'E-Commerce Dashboard',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						{/* Wrap your application with MantineProvider here */}
						<MantineProvider
							theme={
								{
									// Define your Mantine theme configuration here
								}
							}
							// Other global settings for Mantine can go here
						>
							<ToastProvider />
							<ModalProvider />
							{children}
						</MantineProvider>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
