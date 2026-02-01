import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Run auth check on initial load
    authCheck(router.asPath);

    // Run auth check on route change
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck);

    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, []);

  function authCheck(url: string) {
    // Redirect to login if accessing a private page without a token
    const publicPaths = ['/login'];
    const path = url.split('?')[0];
    const token = localStorage.getItem('token');

    if (!token && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Navbar />
      {authorized && <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
