import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectAuthReducer } from '@root/src/store/Auth/Auth.Selector';
import { reset } from '@root/src/store/Auth/Auth.Actions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '@components/Button/Button';
import SignInForm from '@components/SignInForm/SignInForm';
import logo from '@assets/png/logo.png';
import { ReactComponent as GoogleIcon } from '@assets/svg/google-icon.svg';
import { ReactComponent as GithubIcon } from '@assets/svg/github-icon.svg';
import { signInWithGoogleRedirect, signInWithGithubRedirect } from '@store/Auth/Auth.Service';

const CLASSES = {
  container: 'flex h-screen p-2 md:p-4',
  contentWrap: 'w-full max-w-xs m-auto text-center',
  imageContainer: 'max-w-[9.5rem] text-center mx-auto mb-8',
  header: `font-extrabold uppercase tracking-widest	text-2xl block gradient-on-text  mb-4`,
};

export interface LocationState {
  from: { pathname: string };
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser, isError, isSuccess, message } = useSelector(selectAuthReducer);

  const onGoogleSignInHandler = () => signInWithGoogleRedirect();
  const onGithubSignInHandler = () => signInWithGithubRedirect();

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
        <h1 className={CLASSES.header}>Log In</h1>
        <SignInForm />

        <div className='my-4'>or</div>

        <div className='flex gap-4'>
          <Button type='button' className='grow' btnStyle='ghost' onClick={onGoogleSignInHandler}>
            <GoogleIcon className='mx-auto' />
          </Button>
          <Button type='button' className='grow' btnStyle='ghost' onClick={onGithubSignInHandler}>
            <GithubIcon className='mx-auto' />
          </Button>
        </div>

        <footer className='mt-6'>
          Don't have an account?{' '}
          <Link to='/sign-up' className='underline text-pink-500 visited:text-indigo-800'>
            Sign up.
          </Link>
        </footer>
      </div>
    </div>
  );
};
export default Login;
