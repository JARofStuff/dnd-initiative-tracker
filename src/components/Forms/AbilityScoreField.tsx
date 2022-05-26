import { FC, InputHTMLAttributes } from 'react';
import uniqid from 'uniqid';

interface AbilityScoreInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  ability: {
    score: number;
    proficient: boolean;
  };
}

const AbilityScoreField: FC<AbilityScoreInputProps> = ({
  id = uniqid(),
  label,
  name,
  ability,
  ...otherProps
}) => {
  return (
    <>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col justify-center grow'>
          <label className='label' htmlFor={`${id}Score`}>
            <span className='label-text'>{label}</span>
          </label>

          <input
            className='input input-bordered'
            type='number'
            id={`${id}Score`}
            name={`${name}.score`}
            value={ability.score}
            {...otherProps}
          />
        </div>
        <div className='flex flex-col justify-start items-center'>
          <label className='label' htmlFor={`${id}Proficiency`}>
            <span className='label-text'>Proficient</span>
          </label>

          <input
            className='checkbox'
            type='checkbox'
            id={`${id}Proficiency`}
            name={`${name}.proficient`}
            checked={ability.proficient}
            {...otherProps}
          />
        </div>
      </div>
    </>
  );
};
export default AbilityScoreField;
