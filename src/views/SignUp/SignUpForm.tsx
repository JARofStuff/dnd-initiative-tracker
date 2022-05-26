import { useState, FormEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthLoading } from '@store/Auth/Auth.Selector';
import { register } from '@store/Auth/Auth.Actions';
import { toast } from 'react-toastify';

import InputField from '@components/Forms/InputField';
import PasswordField from '@components/Forms/PasswordField';
import Button from '@components/Button/Button';

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
    <form onSubmit={onSubmitHandler} className='w-full space-y-8'>
      <InputField
        type='text'
        id='sign-up-displayName'
        name='displayName'
        value={displayName}
        label='Name'
        required
        onChange={onChangeHandler}
      />
      <InputField
        type='email'
        id='sign-up-email'
        name='email'
        autoComplete='email'
        value={email}
        label='Email'
        required
        onChange={onChangeHandler}
      />
      <PasswordField
        id='sign-in-password'
        label='Password'
        name='password'
        value={password}
        required
        onChange={onChangeHandler}
      />

      <Button loading={isLoading} btnStyle='gradient w-full'>
        Create Account
      </Button>
    </form>
  );
};

export default SignInForm;
