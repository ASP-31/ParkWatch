import type { Metadata } from 'next';
import '../index.css';

export const metadata: Metadata = {
  title: 'ParkWatch',
  description: 'Keep our streets clear',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}