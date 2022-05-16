import SignOutButton from '@components/SignOutButton/SignOutButton';
import { ReactComponent as GoogleIcon } from '@assets/svg/google-icon.svg';
import { ReactComponent as GithubIcon } from '@assets/svg/github-icon.svg';
import Button from '@components/Button/Button';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';

const Profile = () => {
  const isLoading = false;

  return (
    <main className='w-52'>
      <h1>Profile</h1>

      <SignOutButton />
    </main>
  );
};
export default Profile;
