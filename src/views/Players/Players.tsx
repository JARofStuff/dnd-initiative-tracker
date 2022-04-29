import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import {
  fetchCharacters,
  deleteCharacter,
  reset,
} from '@root/src/store/Character/Character.Actions';
import { CharacterData } from '@root/src/store/Character/Character.Types';
import { selectCurrentUser } from '@root/src/store/Auth/Auth.Selector';
import { selectCharacterReducer } from '@root/src/store/Character/Character.Selector';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CharacterForm from '@components/CharacterForm/CharacterForm';
import { toast } from 'react-toastify';

const Players = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const { characters, isLoading, isSuccess, isError, message } =
    useSelector(selectCharacterReducer);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && message) {
      toast.success(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCharacters(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  const handleOnDelete = async (id?: string) => {
    if (!id) return;

    await dispatch(deleteCharacter(id));
  };

  return (
    <div className='container p-4 max-w-lg'>
      <h1 className='text-2xl'>
        Players
        {location.pathname.includes('new') && ' [NEW]'}
        {location.pathname.includes('edit') && ' [EDIT]'}
      </h1>

      <Routes>
        <Route
          index
          element={<PlayerHome characters={characters} onDeleteHandler={handleOnDelete} />}
        />
        <Route path='new' element={<CharacterForm mode='new' />} />
        <Route path='edit/:id' element={<CharacterForm mode='edit' />} />
      </Routes>
    </div>
  );
};
export default Players;

interface PlayerHomeProps {
  characters: CharacterData[] | null;
  onDeleteHandler: Function;
}

const PlayerHome: FC<PlayerHomeProps> = ({ characters, onDeleteHandler }) => {
  return (
    <>
      <div>
        <h2>Characters</h2>
        <ul>
          {characters?.map((character) => (
            <li key={character.id}>
              {character.characterName} -{' '}
              <Link to={`edit/${character.id}`} className='link'>
                Edit
              </Link>{' '}
              <span className='link' onClick={() => onDeleteHandler(character.id)}>
                Delete
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Link to='new' className='btn'>
        Add New Character
      </Link>
    </>
  );
};
