import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Task Manager',
  description: 'Next.js + TypeScript + Tailwind demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* header */}
        <header className="border-b dark:border-gray-700">
          <div className="mx-auto flex max-w-3xl items-center
                          justify-between p-4">
            <Link href="/" className="text-xl font-bold">
              Task&nbsp;Manager
            </Link>
          </div>
        </header>

        {/* main container */}
        <main className="mx-auto max-w-3xl p-4">{children}</main>
      </body>
    </html>
  );
}
