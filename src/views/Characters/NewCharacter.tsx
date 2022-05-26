import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import CharacterForm from '@components/CharacterForm/CharacterForm';

const NewCharacter = () => {
  return (
    <>
      <header>
        <Breadcrumbs
          crumbs={[{ to: '/characters', label: 'Characters' }, { label: 'New Character' }]}
        />
        <h1 className='inline-block text-3xl md:text-4xl font-bold gradient-on-text mb-4 md:mb-4'>
          New Character
        </h1>
      </header>

      <CharacterForm mode='new' />
    </>
  );
};
export default NewCharacter;
