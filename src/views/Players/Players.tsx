import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CharacterForm from '@components/CharacterForm/CharacterForm';

const Players = () => {
  const location = useLocation();

  return (
    <div className='container p-4 max-w-lg'>
      <h1 className='text-2xl'>Players</h1>

      {location.pathname === '/players' && (
        <Link to='new' className='btn'>
          Add New Character
        </Link>
      )}

      <Routes>
        <Route path='new' element={<CharacterForm />} />
        {/* <Route path='edit/:id' element={<CharacterForm />} /> */}
      </Routes>
    </div>
  );
};
export default Players;
