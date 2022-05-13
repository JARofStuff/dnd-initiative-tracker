import type { FC } from 'react';
import { Link } from 'react-router-dom';

const BTN_CLASSES: Record<string, string> = {
  base: 'inline-block px-6 py-3 rounded-full bg-indigo-900 text-white',
  gradient: 'inline-block px-6 py-3 rounded-full text-white gradient',
  ghost:
    'inline-block px-6 py-3 rounded-full border-solid border-2 text-indigo-900 border-indigo-900 hover:text-pink-500 hover:border-pink-500',
};

type ButtonProps = {
  to: string;
  loading?: boolean;
  className?: string;
  btnStyle?: 'base' | 'gradient' | 'ghost';
};

const Button: FC<ButtonProps> = ({ to, btnStyle, className, loading, children, ...otherProps }) => {
  const btnClasses = btnStyle ? BTN_CLASSES[btnStyle] : BTN_CLASSES.base;

  return (
    <Link to={to} className={`${btnClasses} ${className}`}>
      {children}
    </Link>
  );
};

export default Button;
