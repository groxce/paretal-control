import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
       const token = localStorage.getItem('token');
       setIsLoggedIn(!!token);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router.asPath]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h2 className="text-2xl font-bold text-primary">Safeguard Kids</h2>
          {isLoggedIn && (
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-primary font-medium transition-colors">Dashboard</Link>
              <Link href="/geofences" className="text-gray-600 hover:text-primary font-medium transition-colors">Geofences</Link>
              <Link href="/usage" className="text-gray-600 hover:text-primary font-medium transition-colors">App Usage</Link>
            </div>
          )}
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
            Logout
          </button>
        ) : (
          <Link href="/login" className="text-sm font-medium text-primary hover:text-blue-700 transition-colors">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
