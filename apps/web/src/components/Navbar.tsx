import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists on mount
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Listen to storage events to update state if token changes elsewhere
    const handleStorageChange = () => {
       const token = localStorage.getItem('token');
       setIsLoggedIn(!!token);
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router.asPath]); // Re-run on route change

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h2 style={{ margin: 0 }}>Safeguard Kids</h2>
          {isLoggedIn && (
            <div style={{ display: 'flex', gap: '15px' }}>
              <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
              <Link href="/geofences" style={{ color: '#fff', textDecoration: 'none' }}>Geofences</Link>
              <Link href="/usage" style={{ color: '#fff', textDecoration: 'none' }}>App Usage</Link>
            </div>
          )}
        </div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #fff', color: '#fff', padding: '5px 10px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <Link href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
