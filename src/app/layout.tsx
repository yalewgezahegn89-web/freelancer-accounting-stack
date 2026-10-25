import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  title: 'Freelancer Accounting Stack',
  description: 'The best accounting software for freelancers and solo consultants.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || 'ca-pub-XXXXXXXXXXXXXXXX'}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Header */}
        <header className="border-b p-4">
          <nav className="max-w-4xl mx-auto flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">Freelancer Accounting</Link>
            <div className="space-x-4 text-sm">
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Footer */}
        <footer className="border-t p-6 text-center text-sm text-gray-500 mt-12">
          <div className="space-x-4 mb-2">
            <Link href="/about">About</Link>
            <Link href="/editorial-policy">Editorial Policy</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <p>&copy; {currentYear} Freelancer Accounting Stack. All rights reserved.</p>
          <p className="mt-2 text-xs">This site contains affiliate links. We may earn a commission if you purchase through our links.</p>
        </footer>
      </body>
    </html>
  );
}