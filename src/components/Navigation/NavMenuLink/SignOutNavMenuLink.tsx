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
      className='nav-menu-link relative w-5/12 md:w-full flex flex-col md:flex-row justify-center md:justify-start items-center gap-1 md:gap-3 bg-transparent hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer pt-1 md:p-4'
    >
      <div className='nav-menu-link--icon inline-block h-6 transition-all'>
        <LogoutIcon className='fill-indigo-900 dark:fill-indigo-200' />
      </div>
      <div className='nav-menu-link--label inline-block transition-all text-tiny md:text-base'>
        Sign out
      </div>
    </button>
  );
};
export default SignOutNavMenuLink;
