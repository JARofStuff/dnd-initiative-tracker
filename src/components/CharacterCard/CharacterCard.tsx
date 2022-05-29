import { useRef, FC, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { deleteCharacter } from '@store/Character/Character.Actions';
import { processAbilityScores, getProficiencyBonusValue } from '@hooks/characterSheet.helpers';
import type { CharacterData } from '@store/Character/Character.Types';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ReactComponent as SkullIcon } from '@assets/svg/skull.svg';
import ConfirmDeleteModal from '@components/ConfirmDeleteModal/ConfirmDeleteModal';
import { confirmAlert } from 'react-confirm-alert';

interface CharacterCardProps {
  id: string;
  character: CharacterData;
  showStats?: boolean;
}

const CharacterCard: FC<CharacterCardProps> = ({ id, character, showStats = false }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const cardControls = useRef<HTMLDivElement>(null);

  const {
    characterName,
    playerName,
    isFriendly,
    isDead,
    characterType,
    characterSheet: {
      // avatar,
      race,
      characterClass,
      subclass,
      level,
      abilityScores,
      creatureSize,
      speciesType,
      alignment,
    },
  } = character;

  const proficiencyBonus = getProficiencyBonusValue(level);
  const abilityScoresArr = processAbilityScores(abilityScores, proficiencyBonus);

  const handleOnDelete = async (id?: string) => {
    if (!id) return;

    const deleteChar = async () => {
      await dispatch(deleteCharacter(id));
      toast.success('Character Deleted');
    };

    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmDeleteModal onConfirmHandler={deleteChar} onCloseHandler={onClose} />
      ),
    });
  };

  const handleClickIgnoringControls = (e: MouseEvent) => {
    const target = e.target as Node;

    //Check if where you clicked was one of the controls
    const controls = cardControls.current;
    if (controls?.contains(target)) return;

    navigate(`edit/${id}`);
  };

  return (
    <li
      onClick={handleClickIgnoringControls}
      className={`border mx-auto rounded-lg p-2 md:p-3 w-full min-w-sm cursor-pointer ${
        isDead
          ? 'border-neutral-300 bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:border-neutral-600'
          : 'border-indigo-200'
      }`}
    >
      <div className='relative flex flex-row justify-start gap-4'>
        <div className='relative'>
          <div
            className={`rounded-lg w-16 h-16 shrink-0 overflow-hidden ${
              isDead ? 'bg-neutral-300 grayscale contrast-50' : 'bg-indigo-200'
            }`}
          >
            <img
              src='https://i0.wp.com/www.hireanillustrator.com/i/images/2018/07/Melanie_gnomeportrait_finalsm.jpg?resize=600%2C750&ssl=1'
              alt='Character Portrait Icon'
            />
          </div>
          {isDead && (
            <div className='absolute w-5 h-5 rounded-full p-[0.15rem] bg-[#925A5A] -top-1 -right-1 border border-neutral-100 dark:border-neutral-800'>
              <SkullIcon className='fill-white' />
            </div>
          )}
        </div>

        <div className='grow overflow-hidden flex flex-col justify-center'>
          <h3 className='block text-xl leading-none mb-1 w-full overflow-x-clip whitespace-nowrap font-bold truncate'>
            {characterName}
          </h3>

          {characterType === 'PC' ? (
            <>
              <div className='flex flex-row justify-start gap-2 md:gap-1 lg:gap-2 text-xs md:text-sm overflow-hidden truncate'>
                <span>Lvl {level}</span>
                <span className='truncate'>{race}</span>
                <span className='truncate'>
                  {subclass ? `${subclass} ` : ''}
                  {characterClass}
                </span>
              </div>
              <div className='truncate max-w-[14rem] text-xs md:text-sm  '>
                Player: <strong>{playerName}</strong>
              </div>
            </>
          ) : (
            <>
              <div className='flex flex-row justify-start gap-2 md:gap-1 lg:gap-2 text-xs md:text-sm overflow-hidden truncate'>
                <span className='truncate'>{creatureSize}</span>
                <span className='truncate'>{speciesType}</span>
              </div>
              <div className='flex flex-row justify-start gap-2 md:gap-1 lg:gap-2 truncate max-w-[14rem] text-xs md:text-sm  '>
                {alignment && <span>{alignment}</span>}
                {isFriendly ? (
                  <span className='inline-block rounded-full px-2 bg-teal-200 text-indigo-900'>
                    Friendly
                  </span>
                ) : (
                  <span className='inline-block rounded-full px-2 bg-orange-300 text-indigo-900'>
                    Enemy
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        <div className='hidden md:flex flex-col justify-between ' ref={cardControls}>
          <Link
            to={`edit/${id}`}
            className={`group block border rounded w-7 h-7 p-1 ${
              isDead
                ? `border-neutral-300 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-500 hover:bg-neutral-300 dark:hover:bg-neutral-300`
                : 'border-indigo-200 hover:bg-indigo-200'
            }`}
          >
            <FiEdit
              className={`fill-transparent dark:group-hover:stroke-slate-900 ${
                isDead ? '' : 'dark:group-hover:stroke-slate-900'
              }`}
            />
          </Link>
          <button
            onClick={() => handleOnDelete(id)}
            className={`group block border rounded w-7 h-7 p-1 hover:bg-red-600 dark:hover:bg-red-600 ${
              isDead
                ? 'border-neutral-300 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                : 'border-indigo-200 '
            }`}
          >
            <FiTrash2 className='fill-transparent group-hover:stroke-white' />
          </button>
        </div>
      </div>

      {showStats && (
        <ul className='flex flex-row justify-center mt-1 md:mt-2 gap-1 md:gap-2'>
          {abilityScoresArr.map(({ abr, score, modifier }, i) => (
            <li
              key={i}
              className={`
              relative text-center w-full max-w-[3.5rem] 
              after:content-[""] after:block after:absolute after:inset-x-0 after:top-2
              after:bottom-2 after:rounded-md md:after:rounded-lg after:z-10
              after:border-2 
              ${
                isDead
                  ? 'after:border-neutral-300 dark:after:border-neutral-600'
                  : 'after:border-indigo-800 after:dark:border-indigo-200'
              }
              `}
            >
              <div
                className={`
                inline-block mx-auto font-mono text-xs font-bold text-center
                leading-none px-1 tracking-wider relative z-20 -translate-y-0.5
                ${
                  isDead
                    ? 'bg-neutral-100 text-neutral-400 dark:bg-neutral-800'
                    : 'bg-white dark:bg-slate-900'
                }
              `}
              >
                {abr}
              </div>
              <div
                className={`
                font-extrabold text-center leading-none md:leading-none text-xl md:text-3xl -mt-1
                ${isDead ? ' text-neutral-400' : ''}
              `}
              >
                {score}
              </div>
              <div
                className={`
                inline-block mx-auto font-bold text-center leading-none p-1 rounded-md relative z-20 translate-y-0.5
                text-white
                ${
                  isDead
                    ? 'bg-neutral-400 text-neutral-100 dark:bg-neutral-600 dark:text-neutral-300'
                    : 'text-white bg-indigo-900 dark:text-slate-900 dark:bg-indigo-200'
                }

              `}
              >
                {modifier}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* {displayMobileContros && (
        <div className='md:hidden mt-6 flex flex-row gap-2'>
          <Link to={`edit/${id}`} className={`btn btn--ghost--character btn--small`}>
            <FiEdit className='fill-transparent' /> Edit
          </Link>
          <button
            onClick={() => handleOnDelete(id)}
            className={`btn btn--ghost--character btn--small`}
          >
            <FiTrash2 className='fill-transparent group-hover:stroke-white' /> Delete
          </button>
        </div>
      )} */}
    </li>
  );
};
export default CharacterCard;
