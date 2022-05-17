import type { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import type { MenuLink } from '@components/Navigation/Navigation';
import { ReactComponent as UserIcon } from '@assets/svg/user.svg';
import NavMenuLink from '../NavMenuLink/NavMenuLink';

const MobileNavBar: FC<{ menuLinks: MenuLink[] }> = ({ menuLinks }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <nav
      aria-label='Main Navigation'
      className='md:hidden fixed z-10 bottom-0 right-0 left-0 h-14 flex justify-around border-t bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900 '
    >
      {menuLinks.map((link, i) => (
        <NavMenuLink key={i} to={link.to} icon={link.icon} label={link.label} />
      ))}

      {currentUser ? (
        <NavMenuLink
          to='/profile'
          icon={<UserIcon className='dark:fill-indigo-200' />}
          label='Profile'
        />
      ) : (
        <NavMenuLink
          to='/login'
          icon={<UserIcon className='dark:fill-indigo-200' />}
          label='Log in'
        />
      )}
    </nav>
  );
};

export default MobileNavBar;
