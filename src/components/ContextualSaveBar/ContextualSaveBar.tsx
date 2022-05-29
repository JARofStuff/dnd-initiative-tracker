import type { FC } from 'react';
import Button from '@components/Button/Button';
import BacktoPreviousPageLink from '@components/BackToPreviousPageLink/BacktoPreviousPageLink';

interface ContextualSaveBarProps {
  isLoading: boolean;
  showSavePrompt: boolean;
  discardChangesHandler: () => void;
}

const ContextualSaveBar: FC<ContextualSaveBarProps> = ({
  isLoading,
  showSavePrompt,
  discardChangesHandler,
}) => {
  if (!showSavePrompt)
    return (
      <div
        className={`
      bg-white mb-5 md:mb-3 
      `}
      >
        <div className='md:relative container mx-auto flex flex-row justify-start items-center py-3 md:py-5 px-2 md:px-4'>
          <BacktoPreviousPageLink />
        </div>
      </div>
    );

  return (
    <div
      className={`
      mb-5 md:mb-3
      bg-indigo-900 text-white
      dark:bg-indigo-800
      sticky top-0 md:top-11 lg:top-14 z-30 left-0 right-0
    `}
    >
      <div className='relative container mx-auto flex flex-row justify-between items-center py-3 px-2  md:px-4 md:py-5'>
        <span className='font-bold text-sm md:text-base'>Unsaved Changes</span>
        <div className='space-x-2 md:space-x-4'>
          <Button type='button' btnStyle='ghost--inv' onClick={() => discardChangesHandler()}>
            Discard
          </Button>
          <Button
            loading={isLoading}
            form='character-edit'
            type='submit'
            btnStyle='gradient'
            className='text-sm md:text-base'
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ContextualSaveBar;
