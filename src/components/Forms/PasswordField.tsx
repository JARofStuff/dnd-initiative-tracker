import { useState, FC, InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import uniqid from 'uniqid';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordField: FC<FormInputProps> = ({ id = uniqid(), label, ...otherProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className='flex w-full mb-8 relative'>
      {label && id && (
        <label
          className='text-sm inline-block px-2 bg-white dark:bg-slate-900  absolute left-2 -top-2 rounded-md'
          htmlFor={id}
        >
          <span>{label}</span>
        </label>
      )}

      <input
        className={`
          peer w-full rounded-l-md text-lg  p-4 pb-3 bg-white dark:bg-slate-900 border-indigo-700 dark:border-slate-500
          border border-r-0 focus:outline focus:outline-2 focus:outline-indigo-700 dark:focus:outline-indigo-500
          `}
        type={passwordVisible ? 'text' : 'password'}
        autoComplete='current-password'
        {...otherProps}
      />
      <div
        className={`
          border border-l-0 rounded-r-md 
          bg-indigo-50 dark:bg-slate-700 border-indigo-700 dark:border-slate-500
          peer-focus:outline  peer-focus:outline-2 peer-focus:outline-indigo-700 dark:peer-focus:outline-indigo-500
          flex items-center px-2 w-10 password-toggle cursor-pointer
          `}
        onClick={togglePasswordVisible}
      >
        {passwordVisible ? (
          <FiEye className='w-full h-auto fill-transparent' />
        ) : (
          <FiEyeOff className='w-full h-auto  fill-transparent' />
        )}
      </div>
    </div>
  );
};
export default PasswordField;
