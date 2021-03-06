import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthReducer } from '@root/src/store/Auth/Auth.Selector';
import { reset } from '@root/src/store/Auth/Auth.Actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpForm from './SignUpForm';
import Card from '@components/Card/Card';
import { ReactComponent as Logo } from '@assets/svg/logo.svg';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser, isError, isSuccess, message } = useSelector(selectAuthReducer);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess || currentUser) {
      navigate('/characters');
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
              <Logo className='w-full fill-gradient dark:fill-gradient-dark' />
            </Link>
            <h1 className='headline text-2xl'>Sign Up</h1>
          </>
        }
        footer={
          <>
            Already have an account?{' '}
            <Link to='/login' className='link'>
              Log in.
            </Link>
          </>
        }
      >
        <SignUpForm />
      </Card>
    </main>
  );
};
export default SignUp;
