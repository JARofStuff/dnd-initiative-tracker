import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import Navigation from '@components/Navigation/Navigation';

const Layout = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <>
      {currentUser && <Navigation />}
      <Outlet />
      {/* <footer></footer> */}
    </>
  );
};

export default Layout;
