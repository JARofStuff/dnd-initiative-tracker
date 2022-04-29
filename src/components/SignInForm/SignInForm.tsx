import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthLoading } from '@store/Auth/Auth.Selector';
import { login } from '@store/Auth/Auth.Actions';
import FormInput from '../FormInput/FormInput';
import { Button } from 'react-daisyui';
import { signInWithGoogleRedirect } from '@store/Auth/Auth.Service';

import { toast } from 'react-toastify';

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill out all the fields');
      return;
    }

    dispatch(login({ email, password }));
  };

  const onGoogleSignInHandler = () => signInWithGoogleRedirect();

  return (
    <form onSubmit={onSubmitHandler} className=''>
      <FormInput
        id='sign-in-email'
        label='Email'
        type='email'
        name='email'
        value={email}
        required
        onChange={onChangeHandler}
      />
      <FormInput
        id='sign-in-password'
        label='Password'
        type='password'
        name='password'
        value={password}
        required
        onChange={onChangeHandler}
        className='input input-bordered w-full'
      />

      <div className='form-control w-full mt-4 gap-4'>
        <Button color='primary' loading={isLoading}>
          Sign In
        </Button>
        <Button type='button' onClick={onGoogleSignInHandler}>
          Sign in with Google
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
