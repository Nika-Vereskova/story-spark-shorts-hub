
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-oxidized-teal to-oxidized-teal/50">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brass mx-auto mb-4"></div>
            <p className="text-oxidized-teal">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-oxidized-teal to-oxidized-teal/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-oxidized-teal mb-4">
              You don't have permission to access this site. Only the site creator has access.
            </p>
            <button
              onClick={() => window.location.href = '/auth'}
              className="text-sm text-oxidized-teal hover:underline"
            >
              Back to Login
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
