import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const ToggleSwitchField: FC<FormInputProps> = ({
  label,
  id = uniqid(),
  className,
  ...otherProps
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <label
        htmlFor={id}
        className='peer flex flex-row items-center justify-start cursor-pointer relative'
      >
        <input type='checkbox' className='peer sr-only' {...otherProps} id={id} />

        <div
          aria-hidden='true'
          className={`
            relative block w-9 h-6 rounded-full mr-2 p-[2px]
            pointer-events-none overflow-hidden
            bg-slate-300 dark:bg-slate-500

            before:content-[''] before:bg-gradient dark:before:bg-gradient-dark before:transition-opacity before:duration-300
            before:absolute before:inset-0 before:opacity-0 peer-checked:before:opacity-100
        `}
        />
        <div
          className={`
              absolute content-[''] block w-5 h-5 rounded-full
              bg-white dark:bg-slate-800 transition-all 
              m-[2px] left-[0px]
              peer-checked:left-3
            `}
        />
        <span className='block'>{label}</span>
      </label>
    </div>
  );
};
export default ToggleSwitchField;
