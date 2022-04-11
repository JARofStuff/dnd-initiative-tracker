import { useEffect, useContext } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Drawer } from 'react-daisyui';
import { signOutUser } from '@root/src/utils/firebase/auth.utils';
import UserContext from '@root/src/context/user/User.Context';
import { USER_ACTION_TYPES } from '@root/src/context/user/User.Types';
import { authStateChangeListener } from '@root/src/utils/firebase/auth.utils';
import { createAction } from '@utils/reducer/reducer.utils';

const Navigation = () => {
  const {
    state: { currentUser },
    dispatch,
  } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = authStateChangeListener((user) => {
      dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Drawer
      id='main-menu'
      mobile={true}
      side={
        <div className='overflow-y-auto bg-base-200 divide-y divide-base-300 w-80 '>
          <header className='py-4 px-8 w-full text-2xl'>
            <Link to='/'>D&amp;D DM Screen</Link>
          </header>
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
              {currentUser ? (
                <div className='flex justify-between items-stretch'>
                  <div>
                    <div className='text-sm font-bold'>
                      {currentUser.displayName}
                    </div>
                    <div className='text-xs'>{currentUser.email}</div>
                  </div>
                  <button
                    onClick={signOutUser}
                    className='btn btn-outline btn-sm h-full'
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to='/sign-in' className='px-8'>
                  Sign In
                </Link>
              )}
            </li>
          </ul>
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
