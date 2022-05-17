import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { Link, useLocation } from 'react-router-dom';
import MenuDrawer from './MenuDrawer';
import Overlay from '@components/Overlay/Overlay';
import HamburgerMenuIcon from '@components/HamburgerMenuIcon/HamburgerMenuIcon';
import type { MenuLink } from '@components/Navigation/Navigation';
import { ReactComponent as Logo } from '@assets/svg/logo.svg';

const DesktopNavBar: FC<{ menuLinks: MenuLink[] }> = ({ menuLinks }) => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', closeOnEscapeKeyPress, false);

    //Remove on unmount
    return () => {
      document.removeEventListener('keydown', closeOnEscapeKeyPress, false);
    };
  });

  useEffect(() => {
    //Close menu on location change
    closeMenuDrawer();
  }, [location]);

  const toggleMenuDrawer = () => {
    setMenuDrawerOpen((prevState) => !prevState);
  };

  const closeMenuDrawer = () => {
    setMenuDrawerOpen(false);
  };

  const closeOnEscapeKeyPress = (e: KeyboardEvent) => {
    if (!menuDrawerOpen) return;
    if (e.key === 'Escape') closeMenuDrawer();
  };

  return (
    <header className='hidden md:grid sticky z-10 top-0 right-0 left-0 max-h-16 border-b grid-cols-3 bg-white dark:bg-slate-900 border-indigo-100 dark:border-indigo-900'>
      <button
        className='p-2 w-[44px] m-0 cursor-pointer justify-self-start relative z-50 hover:bg-indigo-50 dark:hover:bg-slate-800 '
        onClick={toggleMenuDrawer}
        aria-label='Toggle Display of Navigation Menu'
        aria-expanded={menuDrawerOpen}
        aria-haspopup={true}
      >
        <HamburgerMenuIcon isOpen={menuDrawerOpen} />
      </button>

      <Link to='/' className='block p-2 justify-self-center'>
        <Logo className='h-7 lg:h-10 gradient-on-svg transition-transform hover:scale-105' />
        {/* transition-transform hover:scale-105 */}
      </Link>

      {currentUser && (
        <button className='p-2 cursor-pointer justify-self-end'>
          <Link
            to='/profile'
            className='block h-7 w-7 lg:h-10 lg:w-10 m-0 rounded-full overflow-hidden'
          >
            <img
              src={currentUser.photoURL ? currentUser.photoURL : '#'}
              alt='User Icon'
              referrerPolicy='no-referrer'
            />
          </Link>
        </button>
      )}

      <Overlay isOpen={menuDrawerOpen} onClickHandler={closeMenuDrawer} />
      <MenuDrawer isOpen={menuDrawerOpen} mainMenuLinks={menuLinks} />
    </header>
  );
};

export default DesktopNavBar;
