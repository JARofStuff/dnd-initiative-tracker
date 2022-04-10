import { useContext } from 'react';
import UserContext from '@context/user/User.Context';
import SignUpForm from '@/components/SignUpForm/SignUpForm';
import SignInForm from '@/components/SignInForm/SignInForm';

const Auth = () => {
  const { isLoading } = useContext(UserContext);

  return isLoading ? (
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
