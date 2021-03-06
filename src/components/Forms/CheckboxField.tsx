import { FC, InputHTMLAttributes } from 'react';
import { ReactComponent as Checkmark } from '@assets/svg/checkmark-line.svg';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const CheckboxField: FC<FormInputProps> = ({ id = uniqid(), label, className, ...otherProps }) => {
  return (
    <div className={`relative ${className}`}>
      <input type='checkbox' className='peer sr-only' {...otherProps} id={id} />
      <Checkmark
        className={`
          w-5 h-5 absolute inset-[2px] z-10
          pointer-events-none block
          stroke-white dark:stroke-slate-900 transition-all duration-300 checkmark-animate--start peer-checked:checkmark-animate--end
        `}
      />
      <label
        className={`
            leading-none flex flex-row items-center justify-start cursor-pointer relative
            before:content-[''] before:block before:w-6 before:h-6 before:border-2
            before:rounded-md before:mr-2 before:border-indigo-900 
            before:bg-white before:transition-all
            peer-checked:before:bg-gradient  peer-checked:before:border-0
            dark:peer-checked:before:bg-gradient-dark dark:before:border-slate-500 dark:before:bg-slate-900
        `}
        htmlFor={id}
      >
        <span className='block'>{label}</span>
      </label>
    </div>
  );
};
export default CheckboxField;
