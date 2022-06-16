import useDispatchSignOutAndClearStates from '@hooks/useDispatchLogoutAndClearState';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';
import Button from '@components/Button/Button';

const SignOutButton = () => {
  const dispatchSignOutAndClearStates = useDispatchSignOutAndClearStates();

  const signOutUserHandler = async () => {
    await dispatchSignOutAndClearStates();
  };

  return (
    <Button btnStyle='ghost' className='' onClick={signOutUserHandler}>
      <LogoutIcon className='w-6' />
      <span>Sign out</span>
    </Button>
  );
};
export default SignOutButton;
