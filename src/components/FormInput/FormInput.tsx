import { FC, InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className='form-control w-full'>
      {label && otherProps.id && (
        <label className='label' htmlFor={otherProps.id}>
          <span className='label-text'>{label}</span>
        </label>
      )}

      <input className='input input-bordered w-full' {...otherProps} />
    </div>
  );
};
export default FormInput;
