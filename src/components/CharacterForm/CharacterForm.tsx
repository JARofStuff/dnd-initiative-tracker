import { FC, ChangeEventHandler, FormEventHandler } from 'react';
import { initialCharacterData } from '@store/Character/Character.Types';
import { getProficiencyBonus } from '@hooks/characterSheet.helpers';

import {
  InputField,
  AbilityScoreField,
  SkillProficiencyField,
  ToggleSwitchField,
  CheckboxField,
  LargeNumberInputField,
} from '@components/Forms';

interface CharacterFormProps {
  formData: typeof initialCharacterData;
  onChangeHandler: ChangeEventHandler;
  onChangeCharacterSheetHandler: ChangeEventHandler;
  onChangeSkillsHandler: ChangeEventHandler;
  onChangeAbilityScoreHandler: ChangeEventHandler;
  onSubmitHandler: FormEventHandler;
}

const CharacterForm: FC<CharacterFormProps> = ({
  formData,
  onChangeHandler,
  onChangeCharacterSheetHandler,
  onChangeSkillsHandler,
  onChangeAbilityScoreHandler,
  onSubmitHandler,
}) => {
  const {
    characterName,
    playerName,
    // characterType,
    isFriendly,
    isDead,
    characterSheet: {
      avatar,
      race,
      characterClass,
      subclass,
      level,
      experiencePoints,
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

  const proficiencyBonus = getProficiencyBonus(level);

  return (
    <form id='character-edit' onSubmit={onSubmitHandler}>
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
          <InputField
            label='Player Name'
            type='text'
            name='playerName'
            value={playerName}
            onChange={onChangeHandler}
          />
          <div className='flex flex-row gap-2 md:block'>
            <InputField
              label='Avatar'
              type='text'
              name='avatar'
              value={avatar}
              onChange={onChangeCharacterSheetHandler}
            />
            <div
              className={`md:hidden rounded-lg w-[58px] h-[58px] shrink-0 overflow-hidden ${
                isDead ? 'bg-neutral-300 grayscale contrast-50' : 'bg-indigo-200'
              }`}
            >
              <img
                src='https://i0.wp.com/www.hireanillustrator.com/i/images/2018/07/Melanie_gnomeportrait_finalsm.jpg?resize=600%2C750&ssl=1'
                alt='Character Portrait Icon'
              />
            </div>
          </div>
        </div>

        <div className='hidden md:block max-w-[16rem] w-1/2 border border-indigo-200 dark:border-slate-700 rounded-lg mb-8 md:mb-4 '>
          Image here
        </div>
      </div>

      {/* NPC Only Settings */}
      {/* <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
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
        <InputField
          label='Alignment'
          name='alignment'
          value={alignment}
          onChange={onChangeCharacterSheetHandler}
        />
        <InputField
          label='Source'
          name='source'
          value={source}
          onChange={onChangeCharacterSheetHandler}
        />
        <InputField
          label='Challange Rating'
          name='challengeRating'
          value={challengeRating}
          onChange={onChangeCharacterSheetHandler}
        />
      </div> */}

      <div className='md:grid md:grid-cols-2 gap-4'>
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
              <div className='flex flex-row justify-center gap-4 md:gap-2'>
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

      {/* Ability Scores */}
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
        <div className='flex flex-row justify-center gap-4 flex-wrap'>
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
        <h3>Skills</h3>
        <SkillProficiencyField
          label='Acrobatics'
          name='dexAcrobatics'
          skill={dexAcrobatics}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Animal Handling'
          name='wisAnimalHandling'
          skill={wisAnimalHandling}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Arcana'
          name='intArcana'
          skill={intArcana}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Athletics'
          name='strAthletics'
          skill={strAthletics}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Deception'
          name='chaDeception'
          skill={chaDeception}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='History'
          name='intHistory'
          skill={intHistory}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Insight'
          name='wisInsight'
          skill={wisInsight}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Intimidation'
          name='chaIntimidation'
          skill={chaIntimidation}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Investigation'
          name='intInvestigation'
          skill={intInvestigation}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Medicine'
          name='wisMedicine'
          skill={wisMedicine}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Nature'
          name='intNature'
          skill={intNature}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Perception'
          name='wisPerception'
          skill={wisPerception}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Performance'
          name='chaPerformance'
          skill={chaPerformance}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Persuasion'
          name='chaPersuasion'
          skill={chaPersuasion}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Religion'
          name='intReligion'
          skill={intReligion}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Sleight of Hand'
          name='dexSleightOfHand'
          skill={dexSleightOfHand}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Stealth'
          name='dexStealth'
          skill={dexStealth}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyField
          label='Survival'
          name='wisSurvival'
          skill={wisSurvival}
          onChange={onChangeSkillsHandler}
        />
      </div>

      {/* Other Settings */}
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
        <h3>Other Settings</h3>
        <CheckboxField label='Dead' name='isDead' checked={isDead} onChange={onChangeHandler} />
        <ToggleSwitchField
          label='Friendly'
          name='isFriendly'
          checked={isFriendly}
          onChange={onChangeHandler}
        />
      </div>
    </form>
  );
};
export default CharacterForm;
