import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthReducer } from '@root/src/store/Auth/Auth.Selector';
import { reset } from '@root/src/store/Auth/Auth.Actions';
import { toast } from 'react-toastify';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import SignInForm from '@/components/SignInForm/SignInForm';

export interface LocationState {
  from: { pathname: string };
}

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentUser, isError, isSuccess, message } = useSelector(selectAuthReducer);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || currentUser) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, currentUser, message, dispatch, navigate]);

  return (
    <div className='flex justify-center gap-8 w-full'>
      <div className='basis-80'>
        <h1 className='text-2xl'>Sign Up</h1>
        <SignUpForm />
      </div>
      <div className='basis-80'>
        <h1 className='text-2xl'>Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
};
export default Auth;
