import DesktopNavBar from './DesktopNavBar/DesktopNavBar';
import MobileNavBar from './MobileNavBar/MobileNavBar';

import type { To } from 'react-router-dom';
import type { ReactNode } from 'react';

import { ReactComponent as Party } from '@assets/svg/party.svg';
import { ReactComponent as Skull } from '@assets/svg/skull.svg';
import { ReactComponent as Sword } from '@assets/svg/sword.svg';
import { ReactComponent as Dice } from '@assets/svg/d20.svg';

export type MenuLink = {
  to: To;
  label: string;
  icon?: ReactNode;
};

const menuLinks: MenuLink[] = [
  { to: '/characters', label: 'Characters', icon: <Party className='dark:fill-indigo-200' /> },
  { to: '/initiative', label: 'Initiative', icon: <Dice className='dark:fill-indigo-200' /> },
  {
    to: '/encounter-builder',
    label: 'Encounters',
    icon: <Sword className='dark:fill-indigo-200' />,
  },
  { to: '/bestiary', label: 'Bestiary', icon: <Skull className='dark:fill-indigo-200' /> },
];

const Navigation = () => {
  return (
    <>
      <DesktopNavBar menuLinks={menuLinks} />
      <MobileNavBar menuLinks={menuLinks} />
    </>
  );
};
export default Navigation;
