import SignOutButton from '@components/SignOutButton/SignOutButton';
import { ReactComponent as GoogleIcon } from '@assets/svg/google-icon.svg';
import { ReactComponent as GithubIcon } from '@assets/svg/github-icon.svg';
import Button from '@components/Button/Button';
import { ReactComponent as LogoutIcon } from '@assets/svg/logout.svg';
import { CheckboxField, ToggleSwitchField, RadioButtonField } from '@components/Forms';

const Profile = () => {
  return (
    <main className='w-52 p-8'>
      <h1>Profile</h1>

      <SignOutButton />
      <br />
      <CheckboxField id='checkbox' name='checkbox' label='Checkbox' />
      <br />
      <ToggleSwitchField id='toggle' name='toggle' label='Toggle' />
      <br />
      <RadioButtonField id='radio1' name='radio_charactertype' label='Toggle' />
      <br />
      <RadioButtonField id='radio2' name='radio_charactertype' label='Toggle' />
    </main>
  );
};
export default Profile;
