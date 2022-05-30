import { FC } from 'react';
import Button from '@components/Button/Button';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './ConfirmDeleteModal.styles.css';

type ConfirmDeleteModalProps = {
  onConfirmHandler: () => void;
  onCloseHandler: () => void;
};

const ConfirmDeleteModal: FC<ConfirmDeleteModalProps> = ({ onConfirmHandler, onCloseHandler }) => {
  return (
    <div
      className={`
      bg-white dark:bg-slate-800
      border rounded-xl py-4 px-6
      m-2 md:m-4
    `}
    >
      <h1 className='font-bold'>Are you sure you want to delete this character?</h1>
      <p className='mb-4'>This cannot be undone.</p>
      <div className='flex flex-row justify-center gap-8'>
        <Button btnStyle='ghost w-1/2' onClick={onCloseHandler}>
          No
        </Button>
        <Button
          className='bg-rose-700 hover:bg-rose-800 w-1/2'
          onClick={() => {
            // this.handleClickDelete();
            onConfirmHandler();
            onCloseHandler();
          }}
        >
          Yes, Delete it!
        </Button>
      </div>
    </div>
  );
};
export default ConfirmDeleteModal;
