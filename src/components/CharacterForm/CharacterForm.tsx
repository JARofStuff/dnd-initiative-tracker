import { useEffect, useState, FC } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import update from 'immutability-helper';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import {
  // reset,
  createCharacter,
  // setCharacter,
  // unsetCharacter,
  updateCharacter,
} from '@store/Character/Character.Actions';
import { initialCharacterData } from '@store/Character/Character.Types';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import { selectCharacterReducer } from '@store/Character/Character.Selector';
import { Link } from 'react-router-dom';
import { Button } from 'react-daisyui';
import FormInput from '@components/FormInput/FormInput';
import AbilityScoreFormInput from '@components/AbilityScoreFormInput/AbilityScoreFormInput';
import SkillProficiencyFormInput from '@components/SkillProficiencyFormInput/SkillProficiencyFormInput';
import { toast } from 'react-toastify';

interface CharacterFormProps {
  mode: 'new' | 'edit';
}

const CharacterForm: FC<CharacterFormProps> = ({ mode }) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { characters, isLoading } = useSelector(selectCharacterReducer);

  const [formData, setFormData] = useState(initialCharacterData);
  const { id: characterId } = params;

  useEffect(() => {
    if (mode === 'new') {
      setFormData(initialCharacterData);
    }

    if (mode === 'edit' && Object.entries(characters).length > 0 && characterId) {
      if (!(characterId in characters)) {
        toast.error(`Unable to find character sheet`);

        return;
      }

      setFormData((prevState) => {
        const character = characters[characterId];

        return {
          ...prevState,
          ...character,
        };
      });
    }
  }, [dispatch, mode, characters, characterId]);

  const {
    characterName,
    playerName,
    characterSheet: {
      avatar,
      gender,
      race,
      characterClass,
      subclass,
      level,
      experiencePoints,
      background,
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
    },
  } = formData;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return update(prevState, {
        [e.target.name]: { $set: e.target.value },
      });
    });
  };

  const onChangeCharacterSheetHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => {
      return update(prevState, {
        characterSheet: { [e.target.name]: { $set: e.target.value } },
      });
    });
  };

  const onChangeAbilityScoreHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const path = e.target.name.split('.');
    const abilityName = path[0];
    const scoreKey = path[1];
    const scoreValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevState) => {
      return update(prevState, {
        characterSheet: {
          abilityScores: {
            [abilityName]: {
              [scoreKey]: { $set: scoreValue },
            },
          },
        },
      });
    });
  };

  const onChangeSkillsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const path = e.target.name.split('.');
    const skillName = path[0];
    const scoreKey = path[1];
    const scoreValue = e.target.checked;

    setFormData((prevState) => {
      return update(prevState, {
        characterSheet: {
          skills: {
            [skillName]: {
              [scoreKey]: { $set: scoreValue },
            },
          },
        },
      });
    });
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === 'new') {
      if (!currentUser) {
        toast.error(`Can't save character, not currently sign in.`);
        return;
      }

      const { payload: character } = await dispatch(
        createCharacter({ characterData: formData, userId: currentUser.uid })
      );

      if (character) {
        toast.success('New Character Saved');
        let characterId = Object.keys(character)[0];
        navigate(`../edit/${characterId}`);
      }
    }

    if (mode === 'edit') {
      if (!currentUser) {
        toast.error(`Can't save character, not currently sign in.`);
        return;
      }

      console.log(formData);
      if (characterId) {
        await dispatch(updateCharacter({ characterId, characterData: formData }));
        toast.success('Changes Saved');
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className=''>
      <div className='border p-4 mb-4'>
        <h3>Character Info</h3>
        <FormInput
          id='characterName'
          label='Character Name'
          type='text'
          name='characterName'
          value={characterName}
          required
          onChange={onChangeHandler}
        />
        <FormInput
          id='playerName'
          label='Player Name'
          type='text'
          name='playerName'
          value={playerName}
          onChange={onChangeHandler}
        />
        <FormInput
          id='avatar'
          label='Avatar'
          type='text'
          name='avatar'
          value={avatar}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='race'
          label='Race'
          type='text'
          name='race'
          value={race}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='gender'
          label='Gender'
          type='text'
          name='gender'
          value={gender}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='characterClass'
          label='Class'
          type='text'
          name='characterClass'
          value={characterClass}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='subclass'
          label='Sub Class'
          type='text'
          name='subclass'
          value={subclass}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='background'
          label='Background'
          type='text'
          name='background'
          value={background}
          onChange={onChangeCharacterSheetHandler}
        />
      </div>
      <div className='border p-4 mb-4'>
        <h3>Level &amp; Base Stats</h3>
        <FormInput
          id='level'
          label='Level'
          type='number'
          name='level'
          value={level}
          min='1'
          max='20'
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='experiencePoints'
          label='Exp. Points'
          type='number'
          name='experiencePoints'
          value={experiencePoints}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='hpMax'
          label='Max HP'
          type='number'
          name='hpMax'
          min='0'
          value={hpMax}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='ac'
          label='AC'
          type='number'
          name='ac'
          min='0'
          value={ac}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='spellSave'
          label='Spell Save DC'
          type='number'
          name='spellSave'
          min='0'
          value={spellSave}
          onChange={onChangeCharacterSheetHandler}
        />
        <FormInput
          id='speed.walk'
          label='Walk Speed'
          type='number'
          name='speed.walk'
          min='0'
          value={speed}
          onChange={onChangeCharacterSheetHandler}
        />
      </div>
      <div className='border p-4 mb-4'>
        <h3>Ability Scores</h3>
        <AbilityScoreFormInput
          label='Strength'
          id='strength'
          ability={strength}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreFormInput
          label='Dexterity'
          id='dexterity'
          ability={dexterity}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreFormInput
          label='Constitution'
          id='constitution'
          ability={constitution}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreFormInput
          label='Intelligence'
          id='intelligence'
          ability={intelligence}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreFormInput
          label='Wisdom'
          id='wisdom'
          ability={wisdom}
          onChange={onChangeAbilityScoreHandler}
        />
        <AbilityScoreFormInput
          label='Charisma'
          id='charisma'
          ability={charisma}
          onChange={onChangeAbilityScoreHandler}
        />
      </div>
      <div className='border p-4 mb-4'>
        <h3>Skills</h3>
        {/* dexAcrobatics, wisAnimalHandling, intArcana, strAthletics, chaDeception, intHistory,
          wisInsight, chaIntimidation, intInvestigation, wisMedicine, intNature, wisPerception,
          chaPerformance, chaPersuasion, intReligion, dexSleightOfHand, dexStealth, wisSurvival, */}
        <SkillProficiencyFormInput
          label='Acrobatics'
          id='dexAcrobatics'
          skill={dexAcrobatics}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Animal Handling'
          id='wisAnimalHandling'
          skill={wisAnimalHandling}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Arcana'
          id='intArcana'
          skill={intArcana}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Athletics'
          id='strAthletics'
          skill={strAthletics}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Deception'
          id='chaDeception'
          skill={chaDeception}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='History'
          id='intHistory'
          skill={intHistory}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Insight'
          id='wisInsight'
          skill={wisInsight}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Intimidation'
          id='chaIntimidation'
          skill={chaIntimidation}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Investigation'
          id='intInvestigation'
          skill={intInvestigation}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Medicine'
          id='wisMedicine'
          skill={wisMedicine}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Nature'
          id='intNature'
          skill={intNature}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Perception'
          id='wisPerception'
          skill={wisPerception}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Performance'
          id='chaPerformance'
          skill={chaPerformance}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Persuasion'
          id='chaPersuasion'
          skill={chaPersuasion}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Religion'
          id='intReligion'
          skill={intReligion}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Sleight of Hand'
          id='dexSleightOfHand'
          skill={dexSleightOfHand}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Stealth'
          id='dexStealth'
          skill={dexStealth}
          onChange={onChangeSkillsHandler}
        />
        <SkillProficiencyFormInput
          label='Survival'
          id='wisSurvival'
          skill={wisSurvival}
          onChange={onChangeSkillsHandler}
        />
      </div>

      <div className='form-control w-full mt-4 gap-4'>
        <Button color='primary' loading={isLoading}>
          {mode === 'new' && 'Save New Character'}
          {mode === 'edit' && 'Save Changes'}
        </Button>
        <Link to='..' className='btn btn-ghost'>
          Cancel
        </Link>
      </div>
    </form>
  );
};
export default CharacterForm;
