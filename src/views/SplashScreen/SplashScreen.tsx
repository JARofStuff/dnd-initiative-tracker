import Card from '@components/Card/Card';
import Spinner from '@components/Spinner/Spinner';
// import { ReactComponent as Logo } from '@assets/svg/logo.svg';

const SplashScreen = () => {
  return (
    <main className='flex grow'>
      <Card
        className='max-w-xs'
        header={
          <>
            <div className='block text-center mx-auto mb-2 w-11'>
              <Spinner className='spinner-dark' />
            </div>
            <h1 className='text-indigo-900 font-extrabold uppercase tracking-widest	block'>
              Loading
            </h1>
          </>
        }
      ></Card>
    </main>
  );
};
export default SplashScreen;
