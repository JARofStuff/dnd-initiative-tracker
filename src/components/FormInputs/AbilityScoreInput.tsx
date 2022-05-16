import { FC, InputHTMLAttributes } from 'react';

interface AbilityScoreInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  ability: {
    score: number;
    proficient: boolean;
  };
}

const AbilityScoreInput: FC<AbilityScoreInputProps> = ({ label, id, ability, ...otherProps }) => {
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
            name={`${id}.score`}
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
            name={`${id}.proficient`}
            checked={ability.proficient}
            {...otherProps}
          />
        </div>
      </div>
    </>
  );
};
export default AbilityScoreInput;
