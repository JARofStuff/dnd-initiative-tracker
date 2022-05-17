import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const InputField: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='w-full mb-8 relative '>
      {label && otherProps.id && (
        <label
          className='text-sm inline-block px-2 bg-white dark:bg-slate-900 absolute left-2 -top-2 rounded-md'
          htmlFor={otherProps.id}
        >
          <span>{label}</span>
        </label>
      )}

      <input
        className='input input-bordered w-full rounded-md bg-white dark:bg-slate-900 border-indigo-700 dark:border-indigo-500 text-lg pt-4 pb-3'
        {...otherProps}
      />
    </div>
  );
};
export default InputField;
