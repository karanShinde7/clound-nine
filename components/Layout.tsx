
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = "Welcome to Our Baby Shower!" }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col p-4 md:p-6">
      <header className="text-center mb-8 pt-8">
        <h1 className="text-4xl font-pacifico text-pink-400 mb-2 drop-shadow-sm">
          {title}
        </h1>
        <div className="flex justify-center gap-4 mt-4">
          <span className="text-3xl">🧸</span>
          <span className="text-3xl">🍼</span>
          <span className="text-3xl">🐥</span>
        </div>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="text-center py-6 text-gray-400 text-sm italic">
        Made with ❤️ for the little one
      </footer>
    </div>
  );
};

export default Layout;
