import type { FC, ButtonHTMLAttributes } from 'react';
import Spinner from '@components/Spinner/Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  className?: string;
  btnStyle?: string;
}

const Button: FC<ButtonProps> = ({ children, btnStyle, loading, className, ...otherProps }) => {
  const btnClasses = btnStyle && `btn--${btnStyle}`;
  const spinnerColorClass = btnStyle === 'iconGhost' && 'spinner-dark';

  return (
    <button className={`btn ${btnClasses} ${className}`} {...otherProps}>
      {loading ? <Spinner className={`h-full mx-auto ${spinnerColorClass}`} /> : children}
    </button>
  );
};

export default Button;
