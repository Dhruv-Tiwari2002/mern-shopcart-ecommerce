import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return userInfo && userInfo.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;