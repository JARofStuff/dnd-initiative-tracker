import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthReducer } from '@root/src/store/Auth/Auth.Selector';
import { reset } from '@root/src/store/Auth/Auth.Actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import logo from '@assets/png/logo.png';

const CLASSES = {
  container: 'flex h-screen p-2 md:p-4',
  contentWrap: 'w-full max-w-xs m-auto text-center',
  imageContainer: 'max-w-[9.5rem] text-center mx-auto mb-8',
  header: `font-extrabold uppercase tracking-widest	text-2xl block gradient-on-text  mb-4`,
};

export interface LocationState {
  from: { pathname: string };
}

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
      navigate('/players');
    }

    dispatch(reset());
  }, [isError, isSuccess, currentUser, message, dispatch, navigate]);

  return (
    <div className={CLASSES.container}>
      <div className={CLASSES.contentWrap}>
        <header className={CLASSES.imageContainer}>
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
        </header>
        <h1 className={CLASSES.header}>Sign Up</h1>
        <SignUpForm />

        <footer className='mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='underline text-pink-500 visited:text-indigo-800'>
            Log in.
          </Link>
        </footer>
      </div>
    </div>
  );
};
export default SignUp;
