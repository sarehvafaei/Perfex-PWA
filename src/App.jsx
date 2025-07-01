import { Navigate } from 'react-router-dom';

export default function App() {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} />;
}
