import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';

interface SkillProficiencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  skill: {
    proficient: boolean;
    expertise: boolean;
  };
}

const SkillProficiencyField: FC<SkillProficiencyInputProps> = ({
  id = uniqid(),
  label,
  name,
  skill,
  ...otherProps
}) => {
  return (
    <fieldset className='flex flex-row justify-start items-center w-full flex-nowrap'>
      <legend className='block float-left grow'>
        <span className='uppercase bg-slate-500 font-bold text-xs text-slate-200 p-1 rounded mr-3'>
          {name.substring(0, 3)}
        </span>
        {label}
      </legend>
      <div className='flex flex-col justify-center  items-center'>
        <label className='label' htmlFor={`${id}Proficiency`}>
          <span className='label-text'>Proficient</span>
        </label>
        <input
          className='checkbox'
          type='checkbox'
          id={`${id}Proficiency`}
          name={`${name}.proficient`}
          checked={skill.proficient}
          {...otherProps}
        />
      </div>
      <div className='flex flex-col justify-start items-center'>
        <label className='label' htmlFor={`${id}Expertise`}>
          <span className='label-text'>Expertise</span>
        </label>

        <input
          className='checkbox'
          type='checkbox'
          id={`${id}Expertise`}
          name={`${name}.expertise`}
          checked={skill.proficient ? skill.expertise : false}
          disabled={!skill.proficient}
          {...otherProps}
        />
      </div>
    </fieldset>
  );
};
export default SkillProficiencyField;
