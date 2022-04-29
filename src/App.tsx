import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '@hooks/asyncDispatch';

import { authStateChangeListener, googleSignInRedirectListener } from '@store/Auth/Auth.Service';
import { setCurrentUser } from '@store/Auth/Auth.Actions';
import { createUserDoc } from '@store/Profile/Profile.Actions';
import Navigation from '@views/Navigation/Navigation';
import Home from '@views/Home/Home';
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder';
import Initiative from '@views/Initiative/Initiative';
import Players from '@views/Players/Players';
import Auth from '@views/Auth/Auth';
// import PrivateRoute from '@views/PrivateRoute/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = authStateChangeListener(async (user) => {
      if (user) {
        dispatch(setCurrentUser(user.providerData[0]));
        dispatch(createUserDoc(user.providerData[0]));
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
            <Route path='/sign-in' element={<Auth />} />

            <Route path='/players/*' element={<Players />} />
            <Route path='/initiative' element={<Initiative />} />
            <Route path='/encounter-builder' element={<EncounterBuilder />} />
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
