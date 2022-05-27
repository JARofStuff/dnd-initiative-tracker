import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const LargeNumberInputField: FC<FormInputProps> = ({
  className,
  id = uniqid(),
  label,
  ...otherProps
}) => {
  return (
    <div className={`w-28 relative mt-1 ${className}`}>
      <label
        className='text-sm block px-2 bg-white dark:bg-slate-900 w-max absolute left-1/2 -top-2 -translate-x-1/2 rounded-md'
        htmlFor={id}
      >
        <span>{label}</span>
      </label>

      <input
        type='number'
        className={`
          peer h-full hideNumberArrows w-full rounded-md bg-white dark:bg-slate-900 border border-indigo-700 dark:border-slate-500
          focus:outline focus:outline-2 focus:outline-indigo-700 dark:outline-indigo-500 text-4xl md:text-5xl text-center px-1 pt-3 pb-2
          `}
        {...otherProps}
      />
    </div>
  );
};
export default LargeNumberInputField;
