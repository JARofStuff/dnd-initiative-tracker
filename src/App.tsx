import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from '@hooks/asyncDispatch';

import { authStateChangeListener, signInRedirectListener } from '@store/Auth/Auth.Service';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { setCurrentUser } from '@store/Auth/Auth.Actions';

import { createUserDoc } from '@store/Profile/Profile.Actions';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Layout from '@views/Layout/Layout';
import Home from '@views/Home/Home';
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder';
import Initiative from '@views/Initiative/Initiative';
import Characters from '@views/Characters';
import Bestiary from '@views/Bestiary/Bestiary';
import Login from '@views/Login/Login';
import SignUp from '@views/SignUp/SignUp';
import Profile from '@views/Profile/Profile';
import PrivateRoute from '@views/PrivateRoute/PrivateRoute';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const currentAuthUser = useSelector(selectCurrentUser);

  useEffect(() => {
    const unsubscribe = authStateChangeListener(async (user) => {
      if (user) {
        const newUser = user.providerData[0];

        if (!currentAuthUser || newUser.uid !== currentAuthUser?.uid) {
          dispatch(setCurrentUser(newUser));
          dispatch(createUserDoc(newUser));
        }
      }
    });

    return unsubscribe;
  }, [currentAuthUser, dispatch]);

  useEffect(() => {
    // Catches Google Redirect Errors.
    const externalAuthLogIn = async () => {
      try {
        await signInRedirectListener();
      } catch (e) {
        toast.error('Unable to sign in with Google.');
      }
    };

    externalAuthLogIn();
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />

          <Route element={<PrivateRoute />}>
            <Route path='/characters/*' element={<Characters />} />
            <Route path='/initiative' element={<Initiative />} />
            <Route path='/encounter-builder' element={<EncounterBuilder />} />
            <Route path='/bestiary' element={<Bestiary />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
