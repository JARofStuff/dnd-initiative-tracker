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
    <button
      className={`relative btn ${btnClasses} ${className}`}
      disabled={loading}
      {...otherProps}
    >
      {loading && (
        <div className='absolute inset-0 px-3 py-2 md:py-2 md:px-5'>
          <Spinner className={`w-auto h-full mx-auto ${spinnerColorClass}`} />
        </div>
      )}
      <span className={`${loading && 'opacity-0'}`}>{children}</span>
    </button>
  );
};

export default Button;
