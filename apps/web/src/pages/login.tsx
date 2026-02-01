import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        setSuccess('Registration successful! Please login.');
      } else {
        localStorage.setItem('token', data.token);
        router.push('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium text-center">{error}</div>}
        {success && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-sm font-medium text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-primary font-bold cursor-pointer hover:underline"
          >
            {isRegister ? 'Login' : 'Register'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
