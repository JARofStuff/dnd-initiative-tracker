import { FC, ChangeEventHandler, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { initialCharacterData } from '@store/Character/Character.Types';
import {
  getProficiencyBonusValue,
  bonusScoreToDisplayString,
} from '@utils/helpers/characterSheet.helpers';
import Button from '@components/Button/Button';
import CharacterPortrait from '@components/CharacterPortrait/CharacterPortrait';
import CharacterTypePartial from './CharacterTypePartial';
import {
  InputField,
  AbilityScoreField,
  SkillProficiencyField,
  ToggleSwitchField,
  CheckboxField,
  RadioButtonField,
  InspirationCheckboxField,
  LargeNumberInputField,
} from '@components/Forms';
import { FiTrash2 } from 'react-icons/fi';

interface CharacterFormProps {
  mode: 'new' | 'edit';
  formData: typeof initialCharacterData;
  onChangeHandler: ChangeEventHandler;
  onChangeCharacterSheetHandler: ChangeEventHandler;
  onChangeSkillsHandler: ChangeEventHandler;
  onChangeAbilityScoreHandler: ChangeEventHandler;
  onSubmitHandler: FormEventHandler;
  onDeleteHandler: () => void;
}

const CharacterForm: FC<CharacterFormProps> = ({
  mode,
  formData,
  onChangeHandler,
  onChangeCharacterSheetHandler,
  onChangeSkillsHandler,
  onChangeAbilityScoreHandler,
  onSubmitHandler,
  onDeleteHandler,
}) => {
  const {
    characterName,
    playerName,
    characterType,
    isFriendly,
    isDead,
    characterSheet: {
      avatar,
      race,
      characterClass,
      subclass,
      level,
      experiencePoints,
      initiative,
      inspiration,
      hpMax,
      ac,
      spellSave,
      speed,
      abilityScores: { strength, dexterity, constitution, intelligence, wisdom, charisma },
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
      creatureSize,
      speciesType,
      alignment,
      source,
      challengeRating,
    },
  } = formData;

  const proficiencyBonus = getProficiencyBonusValue(level);

  return (
    <form id='character-edit' onSubmit={onSubmitHandler}>
      {mode === 'new' && (
        <CharacterTypePartial characterType={characterType} onChangeHandler={onChangeHandler} />
      )}
      {/* Basic Info and Character Portrait */}
      <div className='md:flex md:flex-row md:justify-start md:gap-4 flex-wrap md:flex-nowrap'>
        <div className='grow border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
          <InputField
            label='Character Name'
            type='text'
            name='characterName'
            value={characterName}
            required
            onChange={onChangeHandler}
          />

          {characterType === 'PC' ? (
            <InputField
              label='Player Name'
              type='text'
              name='playerName'
              value={playerName}
              onChange={onChangeHandler}
            />
          ) : (
            <InputField
              label='Source'
              name='source'
              value={source}
              onChange={onChangeCharacterSheetHandler}
            />
          )}

          <div className='flex flex-row gap-2'>
            <InputField
              label='Avatar'
              type='text'
              name='avatar'
              value={avatar}
              onChange={onChangeCharacterSheetHandler}
            />
            <CharacterPortrait
              isDead={isDead}
              imgSrc={avatar}
              className='md:hidden w-[58px] h-[58px] rounded-lg'
            />
          </div>
        </div>

        <div className='hidden md:block max-w-[16rem] w-1/2 border border-indigo-200 dark:border-slate-700 rounded-lg mb-8 md:mb-4 overflow-hidden'>
          <CharacterPortrait isDead={isDead} imgSrc={avatar} />
        </div>
      </div>

      {/* PC Only Settings */}
      {characterType === 'PC' && (
        <>
          <div className='lg:grid lg:grid-cols-2 gap-4'>
            {/* Race, Class, SubClass */}
            <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
              <InputField
                label='Race'
                type='text'
                name='race'
                value={race}
                onChange={onChangeCharacterSheetHandler}
              />
              <InputField
                label='Class'
                type='text'
                name='characterClass'
                value={characterClass}
                onChange={onChangeCharacterSheetHandler}
              />
              <InputField
                label='Sub Class'
                type='text'
                name='subclass'
                value={subclass}
                onChange={onChangeCharacterSheetHandler}
              />
            </div>

            {/* Level, Exp, HP, etc... */}
            <div className='md:flex md:flex-col md:justify-start'>
              <div className='flex flex-row justify-start border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-x-6 md:space-x-8'>
                <InputField
                  label='Level'
                  type='number'
                  name='level'
                  value={level}
                  min='1'
                  max='20'
                  onChange={onChangeCharacterSheetHandler}
                />
                <InputField
                  label='Exp. Points'
                  type='number'
                  name='experiencePoints'
                  value={experiencePoints}
                  onChange={onChangeCharacterSheetHandler}
                />
              </div>
              <div className='grow border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
                <div className='h-full flex flex-row justify-center gap-4 md:gap-2 flex-wrap'>
                  <div className='flex flex-row flex-wrap justify-center gap-4 md:gap-2'>
                    <LargeNumberInputField
                      label='Max HP'
                      name='hpMax'
                      min='0'
                      max='999'
                      value={hpMax}
                      onChange={onChangeCharacterSheetHandler}
                    />
                    <LargeNumberInputField
                      label='AC'
                      name='ac'
                      min='0'
                      max='99'
                      value={ac}
                      onChange={onChangeCharacterSheetHandler}
                    />
                  </div>
                  <div className='flex flex-row justify-center gap-4 md:gap-2'>
                    <LargeNumberInputField
                      label='Spell DC'
                      name='spellSave'
                      min='0'
                      max='99'
                      value={spellSave}
                      onChange={onChangeCharacterSheetHandler}
                    />
                    {/* <LargeNumberInputField
                  label='Initiative'
                  name='initiative'
                  min='0'
                  max='99'
                  value={initiative}
                  onChange={onChangeCharacterSheetHandler}
                /> */}

                    <LargeNumberInputField
                      label='Speed'
                      name='speed.walk'
                      min='0'
                      max='99'
                      value={speed}
                      onChange={onChangeCharacterSheetHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Proficiency & Inspiration */}
          <div className='flex flex-col md:flex-row justify-start gap-6 md:gap-8 items-center md:justify-center border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4'>
            <div className='flex flex-row items-center gap-2'>
              <div>Proficiency Bonus</div>
              <div className='bg-slate-200 dark:bg-slate-700 text-center rounded-md py-1 px-2'>
                <span className='text-2xl text-center font-bold'>
                  {bonusScoreToDisplayString(proficiencyBonus)}
                </span>
              </div>
            </div>
            <div className='flex flex-row items-center gap-2'>
              <InspirationCheckboxField
                label='Inspiration'
                name='inspiration'
                checked={inspiration}
                onChange={onChangeCharacterSheetHandler}
              />
            </div>
          </div>
        </>
      )}

      {/* NPC Only Settings */}
      {characterType === 'NPC' && (
        <div className='lg:grid lg:grid-cols-2 gap-4'>
          <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
            <InputField
              label='Size'
              name='creatureSize'
              value={creatureSize}
              onChange={onChangeCharacterSheetHandler}
            />
            <InputField
              label='Type'
              name='speciesType'
              value={speciesType}
              onChange={onChangeCharacterSheetHandler}
            />
            <div className='flex flex-row justify-start items-center gap-4'>
              <InputField
                label='Alignment'
                name='alignment'
                value={alignment}
                onChange={onChangeCharacterSheetHandler}
              />
              <ToggleSwitchField
                label='Friendly'
                name='isFriendly'
                checked={isFriendly}
                onChange={onChangeHandler}
              />
            </div>
          </div>

          <div className='md:flex md:flex-col md:justify-start'>
            <div className='grow border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
              <div className='h-full flex flex-row justify-center gap-4 md:gap-2 flex-wrap'>
                <div className='flex flex-row flex-wrap justify-center gap-4 md:gap-2'>
                  <LargeNumberInputField
                    label='Max HP'
                    name='hpMax'
                    min='0'
                    max='999'
                    value={hpMax}
                    onChange={onChangeCharacterSheetHandler}
                  />
                  <LargeNumberInputField
                    label='AC'
                    name='ac'
                    min='0'
                    max='99'
                    value={ac}
                    onChange={onChangeCharacterSheetHandler}
                  />
                </div>
                <div className='flex flex-row justify-center gap-4 md:gap-2'>
                  <LargeNumberInputField
                    label='Spell DC'
                    name='spellSave'
                    min='0'
                    max='99'
                    value={spellSave}
                    onChange={onChangeCharacterSheetHandler}
                  />
                  {/* <LargeNumberInputField
                  label='Initiative'
                  name='initiative'
                  min='0'
                  max='99'
                  value={initiative}
                  onChange={onChangeCharacterSheetHandler}
                /> */}

                  <LargeNumberInputField
                    label='Speed'
                    name='speed.walk'
                    min='0'
                    max='99'
                    value={speed}
                    onChange={onChangeCharacterSheetHandler}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-row justify-start border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-x-6 md:space-x-8'>
              <InputField
                label='Challange Rating'
                name='challengeRating'
                value={challengeRating}
                onChange={onChangeCharacterSheetHandler}
              />
              <div className='flex flex-row items-center gap-2 w-1/2'>
                <div>Proficiency Bonus</div>
                <div className='bg-slate-200 text-center rounded-md py-1 px-2'>
                  <span className='text-2xl text-center font-bold'>
                    {bonusScoreToDisplayString(proficiencyBonus)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ability Scores */}
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
        <div className='flex flex-row justify-center gap-2 flex-wrap'>
          <div className='flex flex-row justify-center gap-2'>
            <AbilityScoreField
              label='Strength'
              name='strength'
              ability={strength}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeAbilityScoreHandler}
            />
            <AbilityScoreField
              label='Dexterity'
              name='dexterity'
              ability={dexterity}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeAbilityScoreHandler}
            />
            <AbilityScoreField
              label='Constitution'
              name='constitution'
              ability={constitution}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeAbilityScoreHandler}
            />
          </div>
          <div className='flex flex-row justify-center gap-2'>
            <AbilityScoreField
              label='Intelligence'
              name='intelligence'
              ability={intelligence}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeAbilityScoreHandler}
            />
            <AbilityScoreField
              label='Wisdom'
              name='wisdom'
              ability={wisdom}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeAbilityScoreHandler}
            />
            <AbilityScoreField
              label='Charisma'
              name='charisma'
              ability={charisma}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeAbilityScoreHandler}
            />
          </div>
        </div>
      </div>

      {/* Skills & Proficiencies */}
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
        <div className='flex flex-row justify-evenly gap-4 flex-wrap lg:flex-nowrap'>
          <div className='flex w-full max-w-md flex-col justify-center gap-10 md:gap-4'>
            <SkillProficiencyField
              label='Acrobatics'
              name='dexAcrobatics'
              skill={dexAcrobatics}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Animal Handling'
              name='wisAnimalHandling'
              skill={wisAnimalHandling}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Arcana'
              name='intArcana'
              skill={intArcana}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Athletics'
              name='strAthletics'
              skill={strAthletics}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Deception'
              name='chaDeception'
              skill={chaDeception}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='History'
              name='intHistory'
              skill={intHistory}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Insight'
              name='wisInsight'
              skill={wisInsight}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Intimidation'
              name='chaIntimidation'
              skill={chaIntimidation}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Investigation'
              name='intInvestigation'
              skill={intInvestigation}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
          </div>
          <div className='flex w-full max-w-md flex-col justify-center gap-4'>
            <SkillProficiencyField
              label='Medicine'
              name='wisMedicine'
              skill={wisMedicine}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Nature'
              name='intNature'
              skill={intNature}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Perception'
              name='wisPerception'
              skill={wisPerception}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Performance'
              name='chaPerformance'
              skill={chaPerformance}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Persuasion'
              name='chaPersuasion'
              skill={chaPersuasion}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Religion'
              name='intReligion'
              skill={intReligion}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Sleight of Hand'
              name='dexSleightOfHand'
              skill={dexSleightOfHand}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Stealth'
              name='dexStealth'
              skill={dexStealth}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
            <SkillProficiencyField
              label='Survival'
              name='wisSurvival'
              skill={wisSurvival}
              proficiencyBonus={proficiencyBonus}
              onChange={onChangeSkillsHandler}
            />
          </div>
        </div>
      </div>

      {/* Other Settings */}
      {mode === 'edit' && (
        <CharacterTypePartial
          characterType={characterType}
          isDead={isDead}
          onChangeHandler={onChangeHandler}
        />
      )}

      <div
        className={`
          flex flex-row mb-8 mt-8 gap-4 justify-center items-center
          `}
      >
        {mode === 'edit' ? (
          <Button
            type='button'
            className='bg-red-600 hover:bg-red-800'
            onClick={() => onDeleteHandler()}
          >
            <FiTrash2 className='h-5' />
            <span>Delete Character</span>
          </Button>
        ) : (
          <Link to='..' className='btn w-full md:w-auto'>
            Discard Character
          </Link>
        )}
      </div>
    </form>
  );
};
export default CharacterForm;
