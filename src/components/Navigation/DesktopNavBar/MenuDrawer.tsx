import { FC } from 'react';

import ProfileNavMenu from './ProfileNavMenu';
import NavMenuLink from '../NavMenuLink/NavMenuLink';

import type { MenuLink } from '@components/Navigation/Navigation';

interface MenuDrawerProps {
  mainMenuLinks: MenuLink[];
  isOpen: boolean;
}

const MenuDrawer: FC<MenuDrawerProps> = ({ mainMenuLinks, isOpen }) => {
  const visibilityClassNames = !isOpen && '-translate-x-full';

  return (
    <div
      id='desktop-menu-drawer'
      className={`fixed z-20 top-0 left-0 bottom-0 w-60 pt-11 lg:pt-14 bg-white transition-all ${visibilityClassNames}`}
    >
      <nav aria-label='Main Navigation'>
        {mainMenuLinks.map((link, i) => (
          <NavMenuLink key={i} to={link.to} icon={link.icon} label={link.label} />
        ))}
      </nav>
      <ProfileNavMenu />
    </div>
  );
};
export default MenuDrawer;
