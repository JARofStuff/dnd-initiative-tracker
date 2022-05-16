import { useAppDispatch } from '@hooks/asyncDispatch';
import { logout } from '@store/Auth/Auth.Actions';
import { toast } from 'react-toastify';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';

const SignOutNavMenuLink = () => {
  const dispatch = useAppDispatch();

  const signOutUserHandler = async () => {
    dispatch(logout());
    toast.success('Successfully Signed out');
  };

  return (
    <button
      onClick={signOutUserHandler}
      className='w-full p-4 flex justify-start items-center gap-3 cursor-pointer min-w-max bg-transparent hover:bg-indigo-50'
    >
      <div className='nav-menu-link--icon inline-block h-5 transition-all'>
        <LogoutIcon />
      </div>
      <div className='nav-menu-link--label inline-block transition-all'>Sign out</div>
    </button>
  );
};
export default SignOutNavMenuLink;
