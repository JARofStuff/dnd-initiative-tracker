import useDispatchLogoutAndClearStates from '@hooks/useDispatchLogoutAndClearState';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';

const SignOutNavMenuLink = () => {
  const dispatchLogoutAndClearStates = useDispatchLogoutAndClearStates();

  const signOutUserHandler = async () => {
    await dispatchLogoutAndClearStates();
  };

  return (
    <button
      onClick={signOutUserHandler}
      className='w-full p-4 flex justify-start items-center gap-3 cursor-pointer min-w-max bg-transparent hover:bg-indigo-50'
    >
      <div className='nav-menu-link--icon inline-block h-6 transition-all'>
        <LogoutIcon className='fill-indigo-900 dark:fill-indigo-200' />
      </div>
      <div className='nav-menu-link--label inline-block transition-all'>Sign out</div>
    </button>
  );
};
export default SignOutNavMenuLink;
