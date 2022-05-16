import { FC, MouseEventHandler } from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClickHandler?: MouseEventHandler<HTMLDivElement>;
}

const Overlay: FC<OverlayProps> = ({ isOpen, onClickHandler }) => {
  const visibilityClassNames = isOpen ? 'opacity-50 visible' : 'opacity-0 invisible';

  return (
    <div
      className={`fixed inset-0 z-10 bg-black transition-all duration-500 ${visibilityClassNames}`}
      onClick={onClickHandler}
    ></div>
  );
};
export default Overlay;
