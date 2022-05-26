import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: FC<FormInputProps> = ({ type = 'text', id = uniqid(), label, ...otherProps }) => {
  return (
    <div className='w-full relative'>
      {label && id && (
        <label
          className='text-sm inline-block px-2 bg-white dark:bg-slate-900 absolute left-2 -top-2 rounded-md'
          htmlFor={id}
        >
          <span>{label}</span>
        </label>
      )}

      <input
        type={type}
        className={`
          peer w-full rounded-md bg-white dark:bg-slate-900 border border-indigo-700 dark:border-slate-500
          focus:outline focus:outline-2 focus:outline-indigo-700 dark:outline-indigo-500 text-lg  p-4 pb-3
          `}
        {...otherProps}
      />
    </div>
  );
};
export default InputField;
