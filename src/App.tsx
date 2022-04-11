import { Routes, Route } from 'react-router-dom';
import Navigation from '@root/src/components/Navigation/Navigation';
import Home from '@views/Home/Home';
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder';
import Initiative from '@views/Initiative/Initiative';
import Players from '@views/Players/Players';
import Auth from '@/views/Auth/Auth';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className='h-screen bg-base-100'>
      <main>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='/players' element={<Players />} />
            <Route path='/initiative' element={<Initiative />} />
            <Route path='/encounter-builder' element={<EncounterBuilder />} />
            <Route path='/sign-in' element={<Auth />} />
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
