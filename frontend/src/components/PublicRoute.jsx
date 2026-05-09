import { useAuth } from '../contexts/auth';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const { isAuthed, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (isAuthed) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}