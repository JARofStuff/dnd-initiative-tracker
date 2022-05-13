import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '@hooks/asyncDispatch';

import { authStateChangeListener, googleSignInRedirectListener } from '@store/Auth/Auth.Service';
import { setCurrentUser } from '@store/Auth/Auth.Actions';
import { createUserDoc } from '@store/Profile/Profile.Actions';
import Layout from '@views/Layout/Layout';
import Home from '@views/Home/Home';
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder';
import Initiative from '@views/Initiative/Initiative';
import Players from '@views/Players/Players';
import Login from '@views/Login/Login';
import SignUp from '@views/SignUp/SignUp';
import PrivateRoute from '@views/PrivateRoute/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

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
    <div>
      <main>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />

            <Route element={<PrivateRoute />}>
              <Route path='/players/*' element={<Players />} />
              <Route path='/initiative' element={<Initiative />} />
              <Route path='/encounter-builder' element={<EncounterBuilder />} />
            </Route>
          </Route>
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
