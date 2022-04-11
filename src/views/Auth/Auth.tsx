import { useContext } from 'react';
import UserContext from '@root/src/context/user/User.Context';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import SignInForm from '@/components/SignInForm/SignInForm';

const Auth = () => {
  const {
    state: { loading },
  } = useContext(UserContext);

  return loading ? (
    <h1>Signing you in</h1>
  ) : (
    <div className='flex justify-center gap-8 w-full'>
      <div className='basis-80'>
        <h1 className='text-2xl'>Sign Up</h1>
        <SignUpForm />
      </div>
      <div className='basis-80'>
        <h1 className='text-2xl'>Sign In</h1>
        <SignInForm />
      </div>
    </div>
  );
};
export default Auth;
