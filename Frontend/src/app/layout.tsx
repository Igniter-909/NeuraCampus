import type { Metadata } from "next";
// import logo  from '../../public/logo11.svg'
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "@/styles/globals.css";
import {ToastProvider} from '@/components/ui/toaster'
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { Providers } from './providers';


import PageTransition from '@/components/common/PageTransition';
import '@/styles/scrollbar.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NeuraCampus',
  description: 'NeuraCampus is a platform for campus management',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link 
          rel="preload"
          href="/_next/static/css/globals.css"
          as="style"
          type="text/css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased h-screen`}>
        <Providers>
          <ReduxProvider>
            <ThemeProvider>
              <PageTransition />
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </Providers>
        <ToastProvider />
      </body>
    </html>
  );
}
