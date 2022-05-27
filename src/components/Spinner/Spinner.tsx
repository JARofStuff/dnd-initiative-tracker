import { ReactComponent as SpinnerIcon } from '@assets/svg/spinner2.svg';
import type { FC, SVGProps } from 'react';

import './Spinner.styles.css';

interface SpinnerProps extends SVGProps<HTMLOrSVGImageElement> {
  className: string;
}

const Spinner: FC<SpinnerProps> = ({ className }) => {
  return <SpinnerIcon className={`${className} spinner w-auto`} title='Loading...' />;
};
export default Spinner;
