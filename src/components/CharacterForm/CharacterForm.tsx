import { FC } from 'react';
import { initialCharacterData } from '@store/Character/Character.Types';

import {
  InputField,
  AbilityScoreField,
  SkillProficiencyField,
  ToggleSwitchField,
  CheckboxField,
} from '@components/Forms';

interface CharacterFormProps {
  formData: typeof initialCharacterData;
  onChangeHandler: any;
  onChangeCharacterSheetHandler: any;
  onChangeSkillsHandler: any;
  onChangeAbilityScoreHandler: any;
  onSubmitHandler: any;
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

  return (
    <form id='character-edit' onSubmit={onSubmitHandler}>
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
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
        <InputField
          label='Avatar'
          type='text'
          name='avatar'
          value={avatar}
          onChange={onChangeCharacterSheetHandler}
        />
      </div>
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
      </div>
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
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
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
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
        <InputField
          label='Max HP'
          type='number'
          name='hpMax'
          min='0'
          value={hpMax}
          onChange={onChangeCharacterSheetHandler}
        />
        <InputField
          label='AC'
          type='number'
          name='ac'
          min='0'
          value={ac}
          onChange={onChangeCharacterSheetHandler}
        />
        <InputField
          label='Spell Save DC'
          type='number'
          name='spellSave'
          min='0'
          value={spellSave}
          onChange={onChangeCharacterSheetHandler}
        />
        <InputField
          label='Walk Speed'
          type='number'
          name='speed.walk'
          min='0'
          value={speed}
          onChange={onChangeCharacterSheetHandler}
        />
      </div>
      <div className='border border-indigo-200 dark:border-slate-700 rounded-lg px-4 py-5 md:px-6 md:py-7 mb-8 md:mb-4 space-y-6 md:space-y-8'>
        <h3>Ability Scores</h3>
        <AbilityScoreField
          label='Strength'
          name='strength'
          ability={strength}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreField
          label='Dexterity'
          name='dexterity'
          ability={dexterity}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreField
          label='Constitution'
          name='constitution'
          ability={constitution}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreField
          label='Intelligence'
          name='intelligence'
          ability={intelligence}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreField
          label='Wisdom'
          name='wisdom'
          ability={wisdom}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreField
          label='Charisma'
          name='charisma'
          ability={charisma}
          onChange={onChangeAbilityScoreHandler}
        />
      </div>
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
