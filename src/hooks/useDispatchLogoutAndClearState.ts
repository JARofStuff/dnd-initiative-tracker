import { useAppDispatch } from '@hooks/asyncDispatch';
import { logout } from '@store/Auth/Auth.Actions';
import { clearProfile } from '@store/Profile/Profile.Actions';
import { toast } from 'react-toastify';

const useDispatchSignOutAndClearStates = () => {
  const dispatch = useAppDispatch();

  return async () => {
    await dispatch(logout());
    dispatch(clearProfile());
    toast.success('Successfully Signed out');
  };
};

export default useDispatchSignOutAndClearStates;
