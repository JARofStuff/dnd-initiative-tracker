import { useAppDispatch } from '@hooks/asyncDispatch';
import { logout } from '@store/Auth/Auth.Actions';
import { toast } from 'react-toastify';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';
import Button from '@components/Button/Button';

const SignOutButton = () => {
  const dispatch = useAppDispatch();

  const signOutUserHandler = async () => {
    await dispatch(logout());
    toast.success('Successfully Signed out');
  };

  return (
    <Button btnStyle='ghost' className='w-full md:w-auto' onClick={signOutUserHandler}>
      <LogoutIcon />
      Sign out
    </Button>
  );
};
export default SignOutButton;
