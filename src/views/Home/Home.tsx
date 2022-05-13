import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { logout } from '@store/Auth/Auth.Actions';

import ButtonLink from '@components/ButtonLink/ButtonLink';
import Button from '@components/Button/Button';
import logo from '@assets/png/logo.png';
import { toast } from 'react-toastify';

const CLASSES = {
  container: 'flex h-screen p-2 md:p-4',
  contentWrap: 'max-w-xs md:max-w-sm m-auto text-center',
  imageContainer: 'max-w-xs md:max-w-sm text-center mx-auto mb-8',
  header: `font-extrabold uppercase tracking-widest	text-4xl md:text-5xl block gradient-on-text  mb-8`,
};

const Home = () => {
  const dispatch = useAppDispatch();

  const authUser = useSelector(selectCurrentUser);
  const signOutUserHandler = async () => {
    dispatch(logout());
    toast.success('Successfully Signed out');
  };
  return (
    <div className={CLASSES.container}>
      <div className={CLASSES.contentWrap}>
        <div className={CLASSES.imageContainer}>
          <img src={logo} alt='Logo' />
        </div>
        <h1 className={CLASSES.header}>5e Initiative Tracker</h1>
        {authUser ? (
          <Button onClick={signOutUserHandler} btnStyle='ghost' className='w-full md:w-auto'>
            Sign out
          </Button>
        ) : (
          <ButtonLink to='login' btnStyle='ghost' className='w-full md:w-auto'>
            Log In
          </ButtonLink>
        )}
      </div>
    </div>
  );
};
export default Home;
