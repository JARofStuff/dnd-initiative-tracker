import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import CharacterForm from '@components/CharacterForm/CharacterForm';

const NewCharacter = () => {
  return (
    <>
      <header>
        <Breadcrumbs
          crumbs={[{ to: '/characters', label: 'Characters' }, { label: 'New Character' }]}
        />
        <h1 className='text-4xl font-bold gradient-on-text inline mb-8'>New Character</h1>
      </header>
      <CharacterForm mode='new' />
    </>
  );
};
export default NewCharacter;
