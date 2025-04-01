import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components to fix the module not found errors
const Header = dynamic(() => import('./Header'), { ssr: true });
const Footer = dynamic(() => import('./Footer'), { ssr: true });

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full max-w-[100vw] container mx-auto px-4 sm:px-6 pt-28 pb-12 mt-0 overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 