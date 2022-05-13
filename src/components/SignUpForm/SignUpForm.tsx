import { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthLoading } from '@store/Auth/Auth.Selector';
import { register } from '@store/Auth/Auth.Actions';
import { toast } from 'react-toastify';

import FormInput from '@components/FormInput/FormInput';
import Button from '../Button/Button';

const SignInForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectAuthLoading);

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

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!displayName || !email || !password) {
      toast.error('Please fill out all the fields');
      return;
    }

    dispatch(register({ email, password, displayName }));
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

      <Button loading={isLoading} className='w-full' btnStyle='gradient'>
        Create Account
      </Button>
    </form>
  );
};

export default SignInForm;
