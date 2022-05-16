import { ReactComponent as SpinnerIcon } from '@assets/svg/spinner2.svg';
import type { FC } from 'react';

import './Spinner.styles.css';

const Spinner: FC<{ className: string }> = ({ className }) => {
  return <SpinnerIcon className={`${className} spinner w-auto`} />;
};
export default Spinner;
