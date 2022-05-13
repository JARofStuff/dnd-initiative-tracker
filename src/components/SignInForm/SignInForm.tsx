import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthLoading } from '@store/Auth/Auth.Selector';
import { login } from '@store/Auth/Auth.Actions';

import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';

import { toast } from 'react-toastify';
import { ReactComponent as GoogleIcon } from '@assets/svg/google-icon.svg';
import { ReactComponent as GithubIcon } from '@assets/svg/github-icon.svg';
import { signInWithGoogleRedirect, signInWithGithubRedirect } from '@store/Auth/Auth.Service';

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
  const onGithubSignInHandler = () => signInWithGithubRedirect();

  return (
    <>
      <form onSubmit={onSubmitHandler} className='w-full'>
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
        />

        <Button loading={isLoading} className='w-full' btnStyle='gradient'>
          Continue
        </Button>
      </form>
      <div className='my-4'>or</div>

      <div className='flex gap-4'>
        <Button type='button' className='grow' btnStyle='iconGhost' onClick={onGoogleSignInHandler}>
          <GoogleIcon className='mx-auto  h-full w-auto' />
        </Button>
        <Button type='button' className='grow' btnStyle='iconGhost' onClick={onGithubSignInHandler}>
          <GithubIcon className='mx-auto h-full w-auto' />
        </Button>
      </div>
    </>
  );
};

export default SignUpForm;
