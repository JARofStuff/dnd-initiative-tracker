import { FC, InputHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const SearchField: FC<FormInputProps> = ({ id = uniqid(), label, ...otherProps }) => {
  return (
    <div className='flex w-full mb-4 relative'>
      {/* {label && otherProps.id && (
        <label
          className='text-sm inline-block px-2 bg-white dark:bg-slate-900 absolute left-2 -top-2 rounded-md'
          htmlFor={otherProps.id}
        >
          <span>{label}</span>
        </label>
      )} */}

      <input
        className={`
          peer w-full rounded-l-md text-lg h-12 px-3 bg-white dark:bg-slate-900 border-indigo-200 dark:border-slate-600
          border border-r-0 focus:outline focus:outline-2 focus:outline-indigo-700 focus:outline-offset-0 dark:focus:outline-indigo-500
          `}
        type='search'
        autoComplete='current-password'
        {...otherProps}
      />
      <div
        className={`
          border border-l-0 rounded-r-md 
          bg-white dark:bg-slate-900 border-indigo-200 dark:border-slate-600
          peer-focus:outline  peer-focus:outline-2 peer-focus:outline-indigo-600 dark:peer-focus:outline-indigo-500 peer-focus:outline-offset-0
          flex items-center px-2 w-10 password-toggle
          `}
      >
        <FiSearch className='w-full h-auto fill-transparent' />
      </div>
    </div>
  );
};
export default SearchField;
