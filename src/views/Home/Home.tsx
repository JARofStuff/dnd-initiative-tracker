import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { logout } from '@store/Auth/Auth.Actions';

import Card from '@components/Card/Card';
import ButtonLink from '@components/ButtonLink/ButtonLink';
import Button from '@components/Button/Button';
import logo from '@assets/png/logo.png';
import { toast } from 'react-toastify';

const Home = () => {
  const dispatch = useAppDispatch();

  const authUser = useSelector(selectCurrentUser);
  const signOutUserHandler = async () => {
    dispatch(logout());
    toast.success('Successfully Signed out');
  };
  return (
    <main className='flex h-screen p-2 md:p-4'>
      <Card
        className='max-w-xs md:max-w-sm'
        header={
          <>
            <div className='max-w-xs md:max-w-sm text-center mx-auto mb-8'>
              <img src={logo} alt='Logo' />
            </div>
            <h1 className='headline	text-4xl md:text-5xl gradient-on-text'>5e Initiative Tracker</h1>
          </>
        }
      >
        {authUser ? (
          <Button onClick={signOutUserHandler} btnStyle='ghost' className='w-full md:w-auto'>
            Sign out
          </Button>
        ) : (
          <ButtonLink to='login' btnStyle='ghost' className='w-full md:w-auto'>
            Log In
          </ButtonLink>
        )}
      </Card>
    </main>
  );
};
export default Home;
