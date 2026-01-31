import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px 20px', backgroundColor: '#333', color: '#fff', marginBottom: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ margin: 0 }}>Safeguard Kids</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/geofences" style={{ color: '#fff', textDecoration: 'none' }}>Geofences</Link>
          <Link href="/usage" style={{ color: '#fff', textDecoration: 'none' }}>App Usage</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
