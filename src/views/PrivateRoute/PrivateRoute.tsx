import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';

const PrivateRoute = () => {
  const authUser = useSelector(selectCurrentUser);

  return authUser ? <Outlet /> : <Navigate to='/sign-in' replace />;
};

export default PrivateRoute;
