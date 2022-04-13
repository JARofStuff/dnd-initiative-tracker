import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authStateChangeListener, googleSignInRedirectListener } from '@store/Auth/Auth.Service';
import { setCurrentUser } from '@store/Auth/Auth.Actions';
import Navigation from '@views/Navigation/Navigation';
import Home from '@views/Home/Home';
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder';
import Initiative from '@views/Initiative/Initiative';
import Players from '@views/Players/Players';
import Auth from '@views/Auth/Auth';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = authStateChangeListener((user) => {
      // console.log(user?.providerData);
      if (user) {
        dispatch(setCurrentUser(user.providerData[0]));
      } else {
        // dispatch(logout())
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    // Catches Google Redirect Errors.
    const googleLogIn = async () => {
      try {
        await googleSignInRedirectListener();
      } catch (e) {
        toast.error('Unable to sign in with Google.');
      }
    };

    googleLogIn();
  }, [dispatch]);

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
