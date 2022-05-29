import { FC, InputHTMLAttributes } from 'react';
import { ReactComponent as Checkmark } from '@assets/svg/checkmark-line.svg';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

const InspirationCheckboxField: FC<FormInputProps> = ({
  id = uniqid(),
  label,
  className,
  ...otherProps
}) => {
  return (
    <div className={`relative ${className}`}>
      <input type='checkbox' className='peer sr-only' {...otherProps} id={id} />
      <Checkmark
        className={`
          w-8 h-8 absolute top-[4px] bottom-[4px] right-[4px] z-10
          pointer-events-none block
          stroke-white dark:stroke-slate-900 transition-all duration-300 checkmark-animate--start peer-checked:checkmark-animate--end
        `}
      />
      <label
        className={`
            leading-none flex flex-row items-center justify-start cursor-pointer relative
            after:content-[''] after:block after:w-10 after:h-10 after:border-2
            after:rounded-md after:ml-2 after:border-indigo-900 
            after:bg-white after:transition-all
            peer-checked:after:bg-gradient  peer-checked:after:border-0
            dark:peer-checked:after:bg-gradient-dark dark:after:border-slate-500 dark:after:bg-slate-900
        `}
        htmlFor={id}
      >
        <span className='block'>{label}</span>
      </label>
    </div>
  );
};
export default InspirationCheckboxField;
