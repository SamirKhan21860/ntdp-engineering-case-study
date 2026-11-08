import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'NTDP — AI-powered mentorship, reimagined', description: 'A frontend engineering case study on an AI-powered mentorship and talent-development platform.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
