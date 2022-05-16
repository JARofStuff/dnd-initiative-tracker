import type { FC } from 'react';
import { NavLink } from 'react-router-dom';
import type { MenuLink } from '@components/Navigation/Navigation';

import './NavMenuLink.styles.css';

const NavMenuLink: FC<MenuLink> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className='nav-menu-link relative w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-1 md:gap-3 bg-transparent hover:bg-indigo-50 cursor-pointer pt-1 md:p-4'
    >
      <div className='nav-menu-link--icon inline-block h-6 transition-all'>{icon}</div>
      <div className='nav-menu-link--label inline-block transition-all text-tiny md:text-base'>
        {label}
      </div>
    </NavLink>
  );
};

// export { DesktopMenuLink, MobileMenuLink };
export default NavMenuLink;
