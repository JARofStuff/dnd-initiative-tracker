import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs';
import CharacterForm from '@components/CharacterForm/CharacterForm';

const EditCharacter = () => {
  return (
    <>
      <header>
        <Breadcrumbs
          crumbs={[{ to: '/characters', label: 'Characters' }, { label: 'Edit Character' }]}
        />
        <h1 className='text-2xl md:text-4xl font-bold gradient-on-text inline mb-8'>
          Edit Character
        </h1>
      </header>
      <CharacterForm mode='edit' />
    </>
  );
};
export default EditCharacter;
