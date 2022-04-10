import { useState, useEffect, useContext, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
  catchGoogleSignInRedirect,
} from '@root/src/utils/firebase/auth.utils';
import UserContext from '@context/user/User.Context';
import FormInput from '../FormInput/FormInput';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  useEffect(() => {
    catchGoogleSignInRedirect();
  }, []);

  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser, navigate]);

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

    await signInAuthUserWithEmailAndPassword(email, password);
  };

  const onGoogleSignInHandler = () => {
    signInWithGoogleRedirect();
  };

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
        <button className='btn btn-primary'>Sign In</button>
        <button
          type='button'
          className='btn w-full'
          onClick={onGoogleSignInHandler}
        >
          Sign in with Google
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
