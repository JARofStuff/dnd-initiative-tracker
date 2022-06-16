import type { FC, ChangeEventHandler } from 'react';
import { ToggleSwitchField, RadioButtonField } from '@components/Forms';

interface CharacterTypePartialProps {
  characterType: string;
  isDead?: boolean;
  onChangeHandler: ChangeEventHandler;
}

export const CharacterTypePartial: FC<CharacterTypePartialProps> = ({
  characterType,
  isDead,
  onChangeHandler,
}) => {
  return (
    <div
      className={`flex flex-row justify-between items-center border text-sm
          rounded-lg px-4 py-2 md:px-6 md:py-4 mb-8 md:mb-4 gap-4
          bg-indigo-50 dark:bg-slate-700
          border-indigo-50 dark:border-slate-700 
          `}
    >
      <div className='flex flex-row justify-start gap-4 items-center '>
        <div className=''>Character Type:</div>
        <div className='flex flex-row justify-start gap-4'>
          <RadioButtonField
            name='characterType'
            label='Player Character'
            value='PC'
            checked={characterType === 'PC'}
            onChange={onChangeHandler}
          />
          <RadioButtonField
            name='characterType'
            label='NPC'
            value='NPC'
            checked={characterType === 'NPC'}
            onChange={onChangeHandler}
          />
        </div>
      </div>

      {isDead !== undefined && (
        <ToggleSwitchField label='Dead' name='isDead' checked={isDead} onChange={onChangeHandler} />
      )}
    </div>
  );
};

export default CharacterTypePartial;
