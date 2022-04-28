import { Navigate, Outlet } from 'react-router-dom';
// import Spinner from './Spinner';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';

const PrivateRoute = () => {
  const currentUser = useSelector(selectCurrentUser);

  // if (checkingStatus) {
  //   return <Spinner />;
  // }

  return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
