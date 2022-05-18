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
    <ul className='flex justify-start items-center gap-1 mb-12 mt-8 text-sm'>
      <li className='inline-block h-5 w-5'>
        <Link to='/'>
          <D20 className='gradient-on-svg' />
        </Link>
      </li>
      {crumbs.map(({ to, label }, i) => (
        <Fragment key={i}>
          <li className='inline-block h-5 w-5'>
            <FiChevronRight className='fill-transparent stroke-indigo-200' />
          </li>
          {to ? (
            <Link to={to} className='hover:underline hover:text-pink-500'>
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
