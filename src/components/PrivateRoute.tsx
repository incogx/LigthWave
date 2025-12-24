import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check demo mode
        const demoMode = localStorage.getItem('admin_demo_mode');
        if (demoMode === 'true') {
          setIsAuthorized(true);
          return;
        }

        // Check Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthorized(!!session?.user);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  // Loading state
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Not authorized - redirect to login
  if (!isAuthorized) {
    return <Navigate to="/admin/login" replace />;
  }

  // Authorized - show component
  return <>{children}</>;
}
