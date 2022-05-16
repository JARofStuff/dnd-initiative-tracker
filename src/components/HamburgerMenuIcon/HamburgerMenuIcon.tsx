import type { FC } from 'react';
import './HamburgerMenuIcon.styles.css';

const HamburgerMenuIcon: FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <div id='beef' className={`hamburger ${isOpen ? 'js-active' : ''}`}>
      <div></div>
    </div>
  );
};
export default HamburgerMenuIcon;
