import { FC, InputHTMLAttributes } from 'react';
import { ReactComponent as Checkmark } from '@assets/svg/checkmark-line.svg';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const RadioButtonField: FC<FormInputProps> = ({
  id = uniqid(),
  label,
  className,
  ...otherProps
}) => {
  return (
    <div className={`relative ${className}`}>
      <input type='radio' className='peer sr-only' {...otherProps} id={id} />
      <div
        className={`
          w-1 h-1 absolute inset-[.625rem] z-10 rounded-full shrink-0
          pointer-events-none transition-all  ease-out-back
          peer-checked:w-4 peer-checked:h-4 peer-checked:inset-1
          peer-checked:bg-gradient dark:peer-checked:bg-gradient-dark
      `}
      />
      <label
        className={`
            leading-none flex flex-row items-center justify-start cursor-pointer relative
            before:content-[''] before:block before:w-6 before:h-6 before:border-2
            before:rounded-full before:mr-2 before:border-indigo-900 
            before:bg-white before:transition-all before:shrink-0
            dark:before:border-slate-500 dark:before:bg-slate-900
        `}
        htmlFor={id}
      >
        <span className='block'>{label}</span>
      </label>
    </div>
  );
};
export default RadioButtonField;
