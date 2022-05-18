import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SearchField: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='w-full mb-8 relative'>
      {label && otherProps.id && (
        <label
          className='text-sm inline-block px-2 bg-white dark:bg-slate-900 absolute left-2 -top-2 rounded-md'
          htmlFor={otherProps.id}
        >
          <span>{label}</span>
        </label>
      )}

      <input
        type='search'
        placeholder='Search'
        className='h-12 w-full rounded-md bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-500 text-base placeholder-indigo-300'
        {...otherProps}
      />
    </div>
  );
};
export default SearchField;
