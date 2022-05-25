import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { Link } from 'react-router-dom';
import Card from '@components/Card/Card';
// import logo from '@assets/png/logo.png';
import { ReactComponent as Logo } from '@assets/svg/logo.svg';

const Home = () => {
  const authUser = useSelector(selectCurrentUser);

  return (
    <main className='flex grow'>
      <Card
        className='max-w-xs md:max-w-md'
        header={
          <>
            <div className='max-w-xs md:max-w-sm text-center mx-auto mb-8'>
              <Logo className='w-full fill-gradient dark:fill-gradient-dark' />
            </div>
            <h1 className='headline	text-4xl md:text-5xl gradient-on-text mb-8'>
              5e Initiative Tracker
            </h1>
          </>
        }
      >
        {!authUser && (
          <Link to='login' className='btn btn--ghost'>
            Log In
          </Link>
        )}
      </Card>
    </main>
  );
};
export default Home;
