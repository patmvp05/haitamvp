import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Haita Staff',
    template: '%s · Haita Staff',
  },
  description: 'Private staff dashboard for Haita hotel.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-y-auto bg-slate-100 text-slate-950">
      {children}
    </div>
  );
}
