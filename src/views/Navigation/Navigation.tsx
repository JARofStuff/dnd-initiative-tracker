import { Link, NavLink, Outlet } from 'react-router-dom';
import { Drawer } from 'react-daisyui';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';

import { logout } from '@store/Auth/Auth.Actions';

import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { toast } from 'react-toastify';

const Navigation = () => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const signOutUserHandler = async () => {
    dispatch(logout());
    toast.success('Successfully Signed out');
  };

  return (
    <Drawer
      id='main-menu'
      mobile={true}
      side={
        <div className='overflow-y-auto bg-base-200 divide-y divide-base-300 w-80 '>
          <header className='py-4 px-8 w-full text-2xl'>
            <Link to='/'>D&amp;D DM Screen</Link>
          </header>
          {currentUser ? (
            <>
              <ul className='menu p-4 w-80'>
                <li>
                  <NavLink to='/players'>Players</NavLink>
                </li>
                <li>
                  <NavLink to='/initiative'>Initiative</NavLink>
                </li>
                <li>
                  <NavLink to='/encounter-builder'>Encounters</NavLink>
                </li>
              </ul>
              <ul className='menu w-full absolute bottom-0'>
                <li>
                  <div className='flex justify-between items-stretch'>
                    <div>
                      <div className='text-sm font-bold'>{currentUser.displayName}</div>
                      <div className='text-xs'>{currentUser.email}</div>
                    </div>
                    <button onClick={signOutUserHandler} className='btn btn-outline btn-sm h-full'>
                      Sign out
                    </button>
                  </div>
                </li>
              </ul>
            </>
          ) : (
            <ul className='menu p-4 w-80'>
              <li>
                <Link to='/sign-in' className='px-8'>
                  Sign In
                </Link>
              </li>
            </ul>
          )}
        </div>
      }
    >
      <div className='w-full flex items-center justify-center lg:hidden'>
        <label htmlFor='main-menu' className='btn btn-outline drawer-button'>
          Open drawer
        </label>
      </div>

      <Outlet />
    </Drawer>
  );
};

export default Navigation;
