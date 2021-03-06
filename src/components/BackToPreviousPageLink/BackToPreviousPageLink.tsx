import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const BacktoPreviousPageLink = () => {
  return (
    <div className='space-x-2 md:space-x-4'>
      <Link
        to='..'
        className={`group
              inline-flex justify-center items-center
              gap-2 bg-transparent transition-all
              text-sm md:text-base h-10 md:h-12 py-2 md:py-3
              text-indigo-900 hover:text-indigo-500 dark:text-indigo-200 dark:hover:text-indigo-300
          `}
      >
        <FiArrowLeft className='stroke-indigo-900 group-hover:stroke-indigo-500 dark:stroke-indigo-200 dark:group-hover:stroke-indigo-300 transition-all -ml-1' />
        Back to Characters
      </Link>
    </div>
  );
};
export default BacktoPreviousPageLink;
