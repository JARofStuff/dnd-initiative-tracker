import { useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar } from 'react-daisyui';
import { signOutUser } from '@root/src/utils/firebase/auth.utils';
import UserContext from '@context/user/User.Context';
import { USER_ACTION_TYPES } from '@context/user/User.Types';
import { authStateChangeListener } from '@root/src/utils/firebase/auth.utils';
import { createAction } from '@utils/reducer/reducer.utils';

const { Start, Center, End } = Navbar;

const Header = () => {
  const { currentUser, dispatch } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = authStateChangeListener((user) => {
      dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Navbar className='bg-base-300 rounded-lg'>
      <Start>
        <Link to='/' className='text-3xl font-extralight'>
          D&amp;D DM Screen
        </Link>
      </Start>

      {currentUser && (
        <Center>
          <span>Signed In: {currentUser.displayName} </span>
        </Center>
      )}

      <End>
        <div className='flex items-stretch'>
          <NavLink
            to='/players'
            className={({ isActive }) =>
              isActive
                ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                : 'btn btn-ghost btn-sm rounded-btn'
            }
          >
            Players
          </NavLink>
          <NavLink
            to='/initiative'
            className={({ isActive }) =>
              isActive
                ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                : 'btn btn-ghost btn-sm rounded-btn'
            }
          >
            Initiative
          </NavLink>
          <NavLink
            to='/encounter-builder'
            className={({ isActive }) =>
              isActive
                ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                : 'btn btn-ghost btn-sm rounded-btn'
            }
          >
            Encounters
          </NavLink>

          {currentUser ? (
            <span
              className='btn btn-ghost btn-sm rounded-btn'
              onClick={signOutUser}
            >
              Sign Out
            </span>
          ) : (
            <NavLink
              to='/sign-in'
              className={({ isActive }) =>
                isActive
                  ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                  : 'btn btn-ghost btn-sm rounded-btn'
              }
            >
              Sign In
            </NavLink>
          )}
        </div>
      </End>
    </Navbar>
  );
};
export default Header;
