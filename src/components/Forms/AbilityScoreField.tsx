import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';
import { getAbilityBonusDisplay } from '@utils/helpers/characterSheet.helpers';
import { ReactComponent as Checkmark } from '@assets/svg/checkmark-line.svg';

interface AbilityScoreInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  proficiencyBonus?: number;
  ability: {
    score: number;
    proficient: boolean;
  };
}

const AbilityScoreField: FC<AbilityScoreInputProps> = ({
  id = uniqid(),
  className,
  label,
  name,
  ability,
  proficiencyBonus = 0,
  ...otherProps
}) => {
  proficiencyBonus = ability.proficient ? proficiencyBonus : 0;
  const abilityScoreBonus = getAbilityBonusDisplay(ability.score, proficiencyBonus);

  return (
    <div className={`w-24 md:w-28 relative mt-1 ${className}`}>
      <div className='flex flex-col justify-center grow relative mb-8'>
        <label
          className={`
              font-mono font-bold tracking-widest text-sm block px-2
              bg-white dark:bg-slate-900 
              w-max absolute left-1/2 -top-2 -translate-x-1/2 rounded-md
            `}
          htmlFor={`${id}Score`}
        >
          <span>{label.substring(0, 3).toUpperCase()}</span>
        </label>

        <input
          type='number'
          className={`
          peer hideNumberArrows w-full rounded-md bg-white
          dark:bg-slate-900 border-2 border-indigo-800 dark:border-slate-500
          focus:outline focus:outline-2 focus:outline-indigo-700 dark:outline-indigo-500 
          text-4xl md:text-5xl text-center px-1 pt-4 pb-6
          `}
          id={`${id}Score`}
          name={`${name}.score`}
          value={ability.score}
          {...otherProps}
        />

        <div
          className={`
            bg-indigo-900 dark:bg-slate-500 text-white text-2xl dark:text-slate-100
              font-bold text-center leading-none py-2 rounded-lg
              peer-focus:outline  peer-focus:outline-2 peer-focus:outline-indigo-700 dark:peer-focus:outline-indigo-500
              w-3/5 absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-md
         `}
        >
          {abilityScoreBonus}
        </div>
      </div>

      <div className={`relative mt-1 p-1 pb-2 rounded-lg bg-slate-200 dark:bg-slate-700`}>
        <input
          className='peer sr-only'
          type='checkbox'
          id={`${id}Proficiency`}
          name={`${name}.proficient`}
          checked={ability.proficient}
          {...otherProps}
        />
        <Checkmark
          className={`
          w-5 h-5 absolute bottom-[.65rem] left-1/2 -translate-x-1/2 z-10
          pointer-events-none block
          stroke-white dark:stroke-slate-900 transition-all duration-300 checkmark-animate--start peer-checked:checkmark-animate--end
        `}
        />
        <label
          className={`
            leading-none flex flex-col gap-1 items-center justify-start cursor-pointer relative
            after:content-[' '] after:block after:w-6 after:h-6 after:border-2 after:rounded-md
            after:bg-white after:transition-all after:border-indigo-900 
            peer-checked:after:bg-gradient  peer-checked:after:border-0
            dark:peer-checked:after:bg-gradient-dark dark:after:border-slate-500 dark:after:bg-slate-900
        `}
          htmlFor={`${id}Proficiency`}
        >
          <span className='block text-xs md:text-sm'>Save Bonus</span>
        </label>
      </div>
    </div>
  );
};
export default AbilityScoreField;
