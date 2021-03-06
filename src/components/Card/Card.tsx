import type { FC, ReactNode } from 'react';

const CLASSES = {
  card: 'w-full m-auto text-center p-2',
  header: 'text-center mx-auto mb-4',
  footer: 'mt-8',
};

interface CardTypes {
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
}

const Card: FC<CardTypes> = ({ header, footer, className, children }) => {
  return (
    <div className={`${CLASSES.card} ${className}`}>
      <header className={CLASSES.header}>{header}</header>
      <div>{children}</div>
      <footer className={CLASSES.footer}>{footer}</footer>
    </div>
  );
};
export default Card;
