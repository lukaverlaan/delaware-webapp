import { useAuth } from '../contexts/auth';
import { Navigate } from 'react-router-dom';

export default function RootRedirect() {
  const { isAuthed, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Navigate
      to={isAuthed ? '/dashboard' : '/login'}
      replace
    />
  );
}