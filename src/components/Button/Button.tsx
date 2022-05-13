import type { FC, ButtonHTMLAttributes } from 'react';

const BTN_CLASSES = {
  base: 'inline-block px-6 py-3 rounded-full bg-indigo-900 text-white',
  gradient: 'inline-block px-6 py-3 rounded-full text-white gradient',
  ghost:
    'inline-block px-6 py-3 rounded-full border-solid border-2 text-indigo-900 border-indigo-900 hover:text-pink-500 hover:border-pink-500',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  btnStyle?: 'base' | 'gradient' | 'ghost';
}

const Button: FC<ButtonProps> = ({ children, btnStyle, loading, className, ...otherProps }) => {
  const btnClasses = btnStyle ? BTN_CLASSES[btnStyle] : BTN_CLASSES.base;

  return (
    <button className={`${btnClasses} ${className}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
