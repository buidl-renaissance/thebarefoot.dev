import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAdminAuthComponent(props: P) {
    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === 'unauthenticated' && router.pathname !== '/admin') {
        router.replace('/admin');
      }
    }, [status, router]);

    // Show nothing while loading
    if (status === 'loading') {
      return null;
    }

    // If we're on /admin and not authenticated, the page will handle showing the login form
    if (router.pathname === '/admin' || status === 'authenticated') {
      return <WrappedComponent {...props} />;
    }

    // Show nothing while redirecting
    return null;
  };
} 