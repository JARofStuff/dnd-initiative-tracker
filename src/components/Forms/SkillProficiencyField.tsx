import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';
import { bonusScoreToDisplayString } from '@utils/helpers/characterSheet.helpers';
import { ReactComponent as Checkmark } from '@assets/svg/checkmark-line.svg';

interface SkillProficiencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  skill: {
    proficient: boolean;
    expertise: boolean;
  };
  proficiencyBonus?: number;
}

const SkillProficiencyField: FC<SkillProficiencyInputProps> = ({
  id = uniqid(),
  label,
  name,
  skill,
  proficiencyBonus = 0,
  ...otherProps
}) => {
  const proficiencyDisplayValue = skill.expertise
    ? bonusScoreToDisplayString(proficiencyBonus * 2)
    : bonusScoreToDisplayString(proficiencyBonus);

  return (
    <fieldset className='flex flex-row justify-center items-stretch md:justify-start gap-4 w-full flex-nowrap'>
      <legend className='md:float-left grow flex flex-row justify-start items-center mb-2 md:mb-0'>
        <div>
          <span
            className={`
            uppercase font-mono leading-none tracking-widest bg-indigo-900 dark:bg-slate-400 dark:text-slate-900
            font-bold text-xs text-slate-200 px-1 py-[.125rem] rounded mr-3
          `}
          >
            {name.substring(0, 3)}
          </span>
          {label}
        </div>
      </legend>
      <div className='grow text-2xl font-bold p-2 dark:bg-slate-800 dark:md:bg-transparent rounded-lg mt-1 flex flex-row justify-end items-center'>
        <span>{skill.proficient && proficiencyDisplayValue}</span>
      </div>
      <div className='flex flex-row justify-start w-2/3 md:w-min'>
        <div
          className={`relative w-1/2 mt-1 p-1 pb-2 rounded-l-lg bg-slate-200 dark:bg-slate-500 dark:text-slate-100`}
        >
          <input
            className='peer sr-only'
            type='checkbox'
            id={`${id}Proficiency`}
            name={`${name}.proficient`}
            checked={skill.proficient}
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
            leading-none flex flex-col px-2 gap-1 items-center justify-start cursor-pointer relative
            after:content-[' '] after:block after:w-6 after:h-6 after:border-2 after:rounded-md
            after:transition-all after:duration-100 
            after:bg-white after:border-indigo-900 
            peer-checked:after:bg-gradient  peer-checked:after:border-0
            dark:peer-checked:after:bg-gradient-dark dark:after:border-slate-400 dark:after:bg-slate-900
            
        `}
            htmlFor={`${id}Proficiency`}
          >
            <span className='block text-xs md:text-sm'>Proficiency</span>
          </label>
        </div>

        <div
          className={`relative w-1/2 mt-1 p-1 pb-2 rounded-r-lg transition-all  ${
            !skill.proficient
              ? 'bg-neutral-300 dark:bg-neutral-700'
              : 'bg-indigo-200 dark:bg-slate-700'
          }`}
        >
          <input
            className='peer sr-only'
            type='checkbox'
            id={`${id}Expertise`}
            name={`${name}.expertise`}
            checked={skill.proficient ? skill.expertise : false}
            disabled={!skill.proficient}
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
            leading-none flex flex-col gap-1 items-center
            justify-start cursor-pointer relative transition-all
            after:content-[' '] after:block after:w-6 after:h-6 after:border-2
            after:rounded-md after:border-indigo-900 
            after:bg-white after:transition-all
            peer-checked:after:bg-gradient  peer-checked:after:border-0
            dark:peer-checked:after:bg-gradient-dark dark:after:border-slate-500 dark:after:bg-slate-900

            peer-disabled:cursor-not-allowed
            peer-disabled:text-neutral-500 dark:peer-disabled:text-neutral-500 
            dark:peer-disabled

            peer-disabled:after:bg-neutral-300 dark:peer-disabled:after:bg-neutral-700 
            peer-disabled:after:border-neutral-400 dark:peer-disabled:after:border-neutral-600            
        `}
            htmlFor={`${id}Expertise`}
          >
            <span className='block text-xs md:text-sm'>Expertise</span>
          </label>
        </div>
      </div>
    </fieldset>
  );
};
export default SkillProficiencyField;

// before:content-[' '] before:block before:w-6 before:h-6 before:border-2
// before:rounded-md before:mr-2 before:border-indigo-900
// before:bg-white before:transition-all

// peer-checked:after:bg-gradient  peer-checked:after:border-0
// dark:peer-checked:after:bg-gradient-dark dark:after:border-slate-500 dark:after:bg-slate-900
