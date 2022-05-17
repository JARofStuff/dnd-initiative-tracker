import type { FC } from 'react';
import NavMenuLink from '../NavMenuLink/NavMenuLink';
import SignOutNavMenuLink from './SignOutNavMenuLink';
import { ReactComponent as UserIcon } from '@assets/svg/user.svg';

const ProfileNavMenu: FC<{ className?: string }> = ({ className }) => {
  return (
    <nav
      className={`${className} absolute bottom-0 border-t w-full  border-indigo-100 dark:border-indigo-900`}
      aria-label='Profile and Authentication'
      aria-controls='desktop-menu-drawer'
    >
      <NavMenuLink to='/' icon={<UserIcon className='dark:fill-indigo-200' />} label='Profile' />
      <SignOutNavMenuLink />
    </nav>
  );
};
export default ProfileNavMenu;
