import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { fetchCharacters, reset } from '@store/Character/Character.Actions';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { selectCharacterReducer } from '@store/Character/Character.Selector';

import ListCharacters from './ListCharacters';
import EditCharacter from './EditCharacter';
import { toast } from 'react-toastify';

const Characters = () => {
  const effectTriggered = useRef(false);
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { isSuccess, isError, message } = useSelector(selectCharacterReducer);

  useEffect(() => {
    if (effectTriggered.current) return;
    // Load all of player's characters on page load
    if (currentUser) {
      dispatch(fetchCharacters(currentUser.uid));
      effectTriggered.current = true;
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    // Redux error handling and reset
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [isSuccess, isError, message, dispatch]);

  return (
    <main>
      <Routes>
        <Route index element={<ListCharacters />} />
        <Route path='new' element={<EditCharacter mode='new' />} />
        <Route path='edit/:id' element={<EditCharacter mode='edit' />} />
      </Routes>
    </main>
  );
};
export default Characters;
