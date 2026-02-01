import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Added success state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const endpoint = isRegister ? 'http://localhost:3001/api/auth/register' : 'http://localhost:3001/api/auth/login';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isRegister) {
        setIsRegister(false);
        setSuccess('Registration successful! Please login.'); // Set success message
      } else {
        localStorage.setItem('token', data.token);
        router.push('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'Arial' }}>
      <div style={{ padding: '30px', border: '1px solid #ccc', borderRadius: '8px', width: '300px' }}>
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        {success && <p style={{ color: 'green', fontSize: '14px' }}>{success}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '8px' }}
          />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', cursor: 'pointer' }}>
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '15px', fontSize: '14px', textAlign: 'center' }}>
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
