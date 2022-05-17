import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthReducer } from '@root/src/store/Auth/Auth.Selector';
import { reset } from '@root/src/store/Auth/Auth.Actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as Logo } from '@assets/svg/logo.svg';

import Card from '@components/Card/Card';
import LogInForm from './LogInForm';

import logo from '@assets/png/logo.png';

export interface LocationState {
  from: { pathname: string };
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser, isError, isSuccess, message } = useSelector(selectAuthReducer);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || currentUser) {
      navigate('/players');
    }

    dispatch(reset());
  }, [isError, isSuccess, currentUser, message, dispatch, navigate]);

  return (
    <main className='flex grow'>
      <Card
        className='max-w-xs'
        header={
          <>
            <Link to='/' className='block text-center mx-auto mb-8 max-w-[9.5rem]'>
              <Logo className='w-full gradient-on-svg' />
            </Link>{' '}
            <h1 className='headline text-2xl'>Log In</h1>
          </>
        }
        footer={
          <>
            Don't have an account?{' '}
            <Link to='/sign-up' className='link'>
              Sign up.
            </Link>
          </>
        }
      >
        <LogInForm />
      </Card>
    </main>
  );
};
export default Login;
