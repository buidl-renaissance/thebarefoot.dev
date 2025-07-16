import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export function withAdminAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithAdminAuthComponent(props: P) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      // If not authenticated and finished loading, redirect to login
      if (status === 'unauthenticated') {
        router.replace('/admin/login');
      }
    }, [status, router]);

    // Show nothing while loading
    if (status === 'loading') {
      return null;
    }

    // Only render the component if authenticated
    if (status === 'authenticated' && session) {
      return <WrappedComponent {...props} />;
    }

    // Show nothing while redirecting or if not authenticated
    return null;
  };
} 