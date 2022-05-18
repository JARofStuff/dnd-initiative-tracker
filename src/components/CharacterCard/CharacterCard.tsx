import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { deleteCharacter } from '@store/Character/Character.Actions';
import { toast } from 'react-toastify';

import type { CharacterData } from '@store/Character/Character.Types';

interface CharacterCardProps {
  id: string;
  character: CharacterData;
}

const CharacterCard: FC<CharacterCardProps> = ({ id, character }) => {
  const dispatch = useAppDispatch();

  const handleOnDelete = async (id?: string) => {
    if (!id) return;

    await dispatch(deleteCharacter(id));
    toast.info('Character Deleted');
  };

  const {
    characterName,
    playerName,
    characterSheet: {
      avatar,
      // gender,
      race,
      characterClass,
      subclass,
      level,
      experiencePoints,
      // background,
      hpMax,
      ac,
      spellSave,
      speed,
      abilityScores, //: { strength, dexterity, constitution, intelligence, wisdom, charisma },
      skills: {
        dexAcrobatics,
        wisAnimalHandling,
        intArcana,
        strAthletics,
        chaDeception,
        intHistory,
        wisInsight,
        chaIntimidation,
        intInvestigation,
        wisMedicine,
        intNature,
        wisPerception,
        chaPerformance,
        chaPersuasion,
        intReligion,
        dexSleightOfHand,
        dexStealth,
        wisSurvival,
      },
    },
  } = character;

  const abilityScoresArr = Object.entries(abilityScores).map((ability) => {
    return {
      abr: ability[0].substring(0, 3).toUpperCase(),
      score: ability[1].score,
      proficient: ability[1].proficient,
    };
  });

  return (
    <li className='border border-indigo-200 rounded-lg p-3 w-full min-w-sm'>
      <div className='flex flex-row justify-start gap-3'>
        <div className='bg-indigo-200 rounded-xl w-16 h-16 shrink-0'>ICON</div>
        <div className='grow  overflow-hidden'>
          <h3 className='block text-xl leading-none mb-1 w-full overflow-x-clip whitespace-nowrap font-bold'>
            {characterName}
          </h3>
          <div className='flex flex-row gap-2 text-sm overflow-hidden'>
            <p>Lvl {level}</p>
            <p className='truncate max-w-[5rem]'>{race}</p>
            <p className='truncate max-w-[5rem]'>
              {subclass ? `${subclass} ` : ''}
              {characterClass}
            </p>
          </div>
          <div className='truncate max-w-[14rem] text-sm'>
            Player: <strong>{playerName}</strong>
          </div>
        </div>
        <div className='hidden md:flex flex-col justify-between '>
          <Link to={`edit/${id}`} className='block bg-indigo-200 rounded w-7 h-7'>
            .
          </Link>
          <button
            onClick={() => handleOnDelete(id)}
            className='block bg-indigo-200 rounded w-7 h-7'
          >
            .
          </button>
        </div>
      </div>
      <ul className='flex flex-row justify-evenly mt-3'>
        {abilityScoresArr.map(({ abr, score, proficient }, i) => (
          <li key={i}>
            <div>{abr}</div>
            <div>{score}</div>
          </li>
        ))}
      </ul>
    </li>
  );
};
export default CharacterCard;
