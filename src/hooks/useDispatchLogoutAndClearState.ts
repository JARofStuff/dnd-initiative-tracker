import { useAppDispatch } from '@hooks/asyncDispatch';
import { logout } from '@store/Auth/Auth.Actions';
import { clearProfile } from '@store/Profile/Profile.Actions';
import { clearCharacters } from '@store/Character/Character.Actions';
import { toast } from 'react-toastify';

const useDispatchSignOutAndClearStates = () => {
  const dispatch = useAppDispatch();

  return async () => {
    await dispatch(logout());
    dispatch(clearProfile());
    dispatch(clearCharacters());
    toast.success('Successfully Signed out');
  };
};

export default useDispatchSignOutAndClearStates;
