import { useEffect, FC } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { fetchCharacters, deleteCharacter, reset } from '@store/Character/Character.Actions';
import { CharacterData } from '@store/Character/Character.Types';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { selectCharacterReducer } from '@store/Character/Character.Selector';
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

    dispatch(reset());
  }, [isSuccess, isError, message, dispatch]);

  useEffect(() => {
    // Load all of player's characters on page load
    if (currentUser) {
      dispatch(fetchCharacters(currentUser.uid));
    }
  }, [currentUser, dispatch]);

  const handleOnDelete = async (id?: string) => {
    if (!id) return;

    await dispatch(deleteCharacter(id));
    toast.info('Character Deleted');
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
  characters: {
    [id: string]: CharacterData;
  };
  onDeleteHandler: Function;
}

const PlayerHome: FC<PlayerHomeProps> = ({ characters, onDeleteHandler }) => {
  return (
    <>
      <div>
        <h2>Characters</h2>
        <ul>
          {Object.entries(characters).map(([id, character]) => (
            <li key={id}>
              {character.characterName}
              {' - '}
              <Link to={`edit/${id}`} className='link'>
                Edit
              </Link>{' '}
              <span className='link' onClick={() => onDeleteHandler(id)}>
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
