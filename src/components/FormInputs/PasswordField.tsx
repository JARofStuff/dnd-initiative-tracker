import { useState, FC, InputHTMLAttributes } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const PasswordField: FC<FormInputProps> = ({ label, ...otherProps }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisible = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className='flex w-full mb-8 relative'>
      {label && otherProps.id && (
        <label
          className='text-sm inline-block px-2 bg-white absolute  left-2 -top-2'
          htmlFor={otherProps.id}
        >
          <span>{label}</span>
        </label>
      )}

      <input
        className='input input-bordered w-full rounded-l-md border-indigo-700 border-r-0 text-lg pt-4 pb-3 '
        type={passwordVisible ? 'text' : 'password'}
        autoComplete='current-password'
        {...otherProps}
      />
      <div
        className='bg-white rounded-r-md border bg-indigo-50 border-l-0 border-indigo-700 flex items-center px-3 w-12 password-toggle cursor-pointer'
        onClick={togglePasswordVisible}
      >
        {passwordVisible ? (
          <FiEye className='w-full h-auto' />
        ) : (
          <FiEyeOff className='w-full h-auto' />
        )}
      </div>
    </div>
  );
};
export default PasswordField;
