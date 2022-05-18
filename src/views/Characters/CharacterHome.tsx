// import type { FC } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { fetchCharacters, reset } from '@store/Character/Character.Actions';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { selectCharacterReducer } from '@store/Character/Character.Selector';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import SearchField from '@components/FormInputs/SearchField';
import CharacterCard from '@components/CharacterCard/CharacterCard';
import { toast } from 'react-toastify';
import { FiUserPlus } from 'react-icons/fi';

const CharacterHome = () => {
  const dispatch = useAppDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const { characters, isSuccess, isError, message } = useSelector(selectCharacterReducer);

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

  return (
    <>
      <div>
        <header>
          <Breadcrumbs crumbs={[{ to: '/characters', label: 'Characters' }]} />
          <h1 className='text-4xl headline gradient-on-text inline mb-4'>Characters</h1>
        </header>

        <div className='flex flex-row justify-between flex-wrap mb-8'>
          <form className='max-w-md grow'>
            <SearchField />
          </form>
          <Link to='new' className='btn btn--gradient'>
            <FiUserPlus className='fill-transparent' />
            Add New
          </Link>
        </div>

        <div>
          <div className='flex justify-between mb-4'>
            <h2 className='font-bold'>Player Character</h2>
            <div className='flex items-center px-2 bg-slate-300 rounded-md text-xs'>
              10 PC Slots
            </div>
          </div>
          <ul className='flex md:grid md:grid-cols-2 xl:grid-cols-3 md:flex-row gap-2 flex-wrap w-full'>
            {Object.entries(characters).map(([id, character]) => (
              <CharacterCard key={id} id={id} character={character} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CharacterHome;
