import type { FC, ChangeEvent } from 'react';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectCharacters } from '@store/Character/Character.Selector';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import SearchField from '@components/Forms/SearchField';
import CharacterCard from '@components/CharacterCard/CharacterCard';
import { FiUserPlus } from 'react-icons/fi';
import { ToggleSwitchField } from '@components/Forms';

const ListCharacters = () => {
  const characters = useSelector(selectCharacters);
  const [showStats, setShowStats] = useState(false);
  const [searchField, setSearchField] = useState('');

  const [filteredCharacters, setFilteredCharacters] = useState(Object.entries(characters));
  const [playerCharacters, setPlayerCharacters] = useState(filteredCharacters);
  const [nonPlayerCharacters, setNonPlayerCharacters] = useState(filteredCharacters);

  useEffect(() => {
    // Split up characters into categories
    setPlayerCharacters(
      filteredCharacters.filter(([_, { characterType }]) => characterType === 'PC')
    );
    setNonPlayerCharacters(
      filteredCharacters.filter(([_, { characterType }]) => characterType !== 'PC')
    );
  }, [filteredCharacters]);

  useEffect(() => {
    //Search Box Functionality
    const newFilteredCharacters = Object.entries(characters).filter(
      ([_, { characterName, playerName }]) => {
        const TermInCharacterName = characterName.toLocaleLowerCase().includes(searchField);
        const TermInPlayerName = playerName.toLocaleLowerCase().includes(searchField);

        return TermInCharacterName || TermInPlayerName;
      }
    );

    setFilteredCharacters(newFilteredCharacters);
  }, [searchField, characters]);

  const toggleShowStats = () => {
    setShowStats((prevState) => !prevState);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  return (
    <>
      <header className='container mx-auto p-2 md:p-4'>
        <Breadcrumbs crumbs={[{ to: '/characters', label: 'Characters' }]} />
        <h1 className='inline-block text-3xl md:text-4xl font-bold gradient-on-text'>Characters</h1>
      </header>

      <section className='container mx-auto p-2 md:p-4'>
        <div className='flex flex-row justify-between flex-wrap mb-4 md:mb-10'>
          <form className='w-full md:max-w-sm grow mb-4 md:mb-0'>
            <SearchField placeholder='Search Name' value={searchField} onChange={onSearchChange} />
          </form>
          <div className='flex flex-row justify-between items-center w-full md:w-auto gap-4'>
            <ToggleSwitchField
              label='Show Stats'
              name='showStats'
              checked={showStats}
              onChange={toggleShowStats}
            />

            <Link to='new' className='btn btn--gradient  w-1/2 md:w-auto'>
              <FiUserPlus className='fill-transparent w-6' />
              Add New
            </Link>
          </div>
        </div>

        {playerCharacters.length > 0 && (
          <div className='mb-10 md:mb-20'>
            <div className='flex justify-between mb-4'>
              <h2 className='font-bold'>Player Characters</h2>
            </div>
            <ul className='flex md:grid md:grid-cols-2 xl:grid-cols-3 md:flex-row gap-3 lg:gap-6 flex-wrap justify-center w-full'>
              {playerCharacters.map(([id, character]) => (
                <CharacterCard key={id} id={id} character={character} showStats={showStats} />
              ))}
            </ul>
          </div>
        )}

        {nonPlayerCharacters.length > 0 && (
          <div>
            <div className='flex justify-between mb-4'>
              <h2 className='font-bold'>NPCs</h2>
            </div>
            <ul className='flex md:grid md:grid-cols-2 xl:grid-cols-3 md:flex-row gap-3 lg:gap-6 flex-wrap justify-center w-full'>
              {nonPlayerCharacters.map(([id, character]) => (
                <CharacterCard key={id} id={id} character={character} showStats={showStats} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default ListCharacters;
