import useDispatchSignOutAndClearStates from '@hooks/useDispatchLogoutAndClearState';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';
import Button from '@components/Button/Button';

const SignOutButton = () => {
  const dispatchSignOutAndClearStates = useDispatchSignOutAndClearStates();

  const signOutUserHandler = async () => {
    await dispatchSignOutAndClearStates();
  };

  return (
    <Button btnStyle='ghost' className='w-full md:w-auto' onClick={signOutUserHandler}>
      <LogoutIcon />
      Sign out
    </Button>
  );
};
export default SignOutButton;
