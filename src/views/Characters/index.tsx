import { Routes, Route } from 'react-router-dom';
import CharacterHome from './CharacterHome';
import EditCharacter from './EditCharacter';
import NewCharacter from './NewCharacter';

const Characters = () => {
  return (
    <main className='container mx-auto p-2 md:p-4'>
      <section>
        <Routes>
          <Route index element={<CharacterHome />} />
          <Route path='new' element={<NewCharacter />} />
          <Route path='edit/:id' element={<EditCharacter />} />
        </Routes>
      </section>
    </main>
  );
};
export default Characters;
