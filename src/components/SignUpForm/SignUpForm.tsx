import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthReducer } from '@store/Auth/Auth.Selector';
import { register } from '@store/Auth/Auth.Actions';
import { toast } from 'react-toastify';
import FormInput from '@components/FormInput/FormInput';
import { Button } from 'react-daisyui';

const SignInForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(selectAuthReducer);

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

    // if (password !== passwordMatch) {
    //   toast.error('Please make sure both password fields match');
    //   return;
    // }

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
        // required
        onChange={onChangeHandler}
      />
      <FormInput
        type='email'
        id='sign-up-email'
        name='email'
        value={email}
        label='Email'
        // required
        onChange={onChangeHandler}
      />
      <FormInput
        type='password'
        id='sign-up-password'
        name='password'
        value={password}
        label='Password'
        // required
        onChange={onChangeHandler}
      />
      {/* <FormInput
        type='password'
        id='passwordMatch'
        name='passwordMatch'
        value={passwordMatch}
        label='Confirm Password'
        // required
        onChange={onChangeHandler}
      /> */}

      <div className='form-control w-full mt-4 gap-4'>
        <Button color='primary' loading={isLoading}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
