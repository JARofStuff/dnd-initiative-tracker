import { Fragment, FC } from 'react';
import { Link, To } from 'react-router-dom';
import { ReactComponent as D20 } from '@assets/svg/d20.svg';
import { FiChevronRight } from 'react-icons/fi';

export type CrumbType = {
  to?: To;
  label: string;
};

interface BreadcrumbsProps {
  crumbs: CrumbType[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <ul className='flex justify-start items-center gap-1 text-sm h-10 md:h-12 mt-1 mb-10 md:mb-12 '>
      <li className='flex h-full items-center'>
        <Link to='/'>
          <D20 className='h-5 w-5 fill-gradient dark:fill-gradient-dark' />
        </Link>
      </li>
      {crumbs.map(({ to, label }, i) => (
        <Fragment key={i}>
          <li className='inline-block h-5 w-5'>
            <FiChevronRight className='h-5 w-5 fill-transparent stroke-indigo-200' />
          </li>
          {to ? (
            <Link to={to} className='hover:underline hover:text-pink-500 flex h-full items-center'>
              {label}
            </Link>
          ) : (
            <span>{label}</span>
          )}
        </Fragment>
      ))}
    </ul>
  );
};
export default Breadcrumbs;
