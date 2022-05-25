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
import Button from '@components/Button/Button';
import {
  InputField,
  AbilityScoreField,
  SkillProficiencyField,
  ToggleSwitchField,
  CheckboxField,
} from '@components/Forms';
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
    },
  } = formData;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevState) => {
      return update(prevState, {
        [e.target.name]: { $set: value },
      });
    });
  };

  const onChangeCharacterSheetHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData((prevState) => {
      return update(prevState, {
        characterSheet: { [e.target.name]: { $set: value } },
      });
    });
  };

  const onChangeAbilityScoreHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const scoreValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    const path = e.target.name.split('.');
    const abilityName = path[0];
    const scoreKey = path[1];

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
      <div className='border p-4 mb-4'>
        <h3>Level &amp; Base Stats</h3>
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
      <div className='border p-4 mb-4'>
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
      <div className='border p-4 mb-4'>
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
      <div className='border p-4 mb-4'>
        <h3>Other Settings</h3>
        <CheckboxField label='Dead' name='isDead' checked={isDead} onChange={onChangeHandler} />
        <ToggleSwitchField
          label='Friendly'
          name='isFriendly'
          checked={isFriendly}
          onChange={onChangeHandler}
        />
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
          label='alignment'
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
      </div>
      <div className='form-control w-full mt-4 gap-4'>
        <Button loading={isLoading}>
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
