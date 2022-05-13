import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='form-control w-full mb-8 relative'>
      {label && otherProps.id && (
        <label
          className='text-sm inline-block px-2 bg-white absolute  left-2 -top-2'
          htmlFor={otherProps.id}
        >
          <span>{label}</span>
        </label>
      )}

      <input
        className='input input-bordered w-full rounded-md border-indigo-100 text-lg pt-4 pb-3'
        {...otherProps}
      />
    </div>
  );
};
export default FormInput;
