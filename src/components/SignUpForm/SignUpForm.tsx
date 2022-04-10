import { useState, FormEvent, ChangeEvent } from 'react';
import { signUpWithEmailAndPassword } from '@root/src/utils/firebase/auth.utils';
import { toast } from 'react-toastify';

import FormInput from '../FormInput/FormInput';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordMatch: '',
  });

  const { displayName, email, password, passwordMatch } = formData;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!displayName || !email || !password || !passwordMatch) {
      toast.error('Please fill out all the fields');
      return;
    }

    if (password !== passwordMatch) {
      toast.error('Please make sure both password fields match');
      return;
    }

    signUpWithEmailAndPassword(email, password, displayName);
  };

  return (
    <form onSubmit={onSubmitHandler} className=''>
      <FormInput
        type='text'
        id='sign-up-displayName'
        name='displayName'
        value={displayName}
        label='Name'
        required
        onChange={onChangeHandler}
      />
      <FormInput
        type='email'
        id='sign-up-email'
        name='email'
        value={email}
        label='Email'
        required
        onChange={onChangeHandler}
      />
      <FormInput
        type='password'
        id='sign-up-password'
        name='password'
        value={password}
        label='Password'
        required
        onChange={onChangeHandler}
      />
      <FormInput
        type='password'
        id='passwordMatch'
        name='passwordMatch'
        value={passwordMatch}
        label='Confirm Password'
        required
        onChange={onChangeHandler}
      />

      <div className='form-control w-full mt-4 gap-4'>
        <button className='btn btn-primary'>Sign Up</button>
      </div>
    </form>
  );
};

export default SignInForm;
