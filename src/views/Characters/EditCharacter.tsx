import { useState, useEffect } from 'react';
import type { FC, FormEvent, ChangeEvent } from 'react';
import update from 'immutability-helper';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/asyncDispatch';
import { selectCharacterReducer } from '@store/Character/Character.Selector';
import { initialCharacterData } from '@store/Character/Character.Types';
import {
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from '@store/Character/Character.Actions';
import { selectCurrentUser } from '@store/Auth/Auth.Selector';
import CharacterForm from '@components/CharacterForm/CharacterForm';
import ContextualSaveBar from '@components/ContextualSaveBar/ContextualSaveBar';
import ConfirmDeleteModal from '@components/ConfirmDeleteModal/ConfirmDeleteModal';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import capitalizeFirstLetter from '@utils/helpers/capitalizeFirstLetter';

interface EditCharacterProps {
  mode: 'new' | 'edit';
}

const EditCharacter: FC<EditCharacterProps> = ({ mode = 'edit' }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { id: characterId } = params;

  const currentUser = useSelector(selectCurrentUser);
  const { characters, isLoading } = useSelector(selectCharacterReducer);

  const [showSaveBar, setShowSaveBar] = useState(false);

  const [formData, setFormData] = useState(initialCharacterData);
  const [uneditedFormData, setUneditedFormData] = useState(initialCharacterData);

  useEffect(() => {
    if (mode === 'new') {
      setUneditedFormData(initialCharacterData);
      setFormData(initialCharacterData);
    }

    if (mode === 'edit' && Object.entries(characters).length > 0 && characterId) {
      if (!(characterId in characters)) {
        toast.error(`Unable to find character sheet`);
        return;
      }

      setUneditedFormData(characters[characterId]);
      setFormData(characters[characterId]);
    }
  }, [mode, characters, characterId]);

  useEffect(() => {
    setShowSaveBar(formData !== uneditedFormData);
  }, [formData, uneditedFormData]);

  const handleDiscardChanges = () => {
    setFormData(uneditedFormData);
    setShowSaveBar(false);
  };

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
    if (!currentUser) {
      toast.error(`Can't save character, not currently sign in.`);
      return;
    }

    if (mode === 'new') {
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
      if (characterId) {
        await dispatch(updateCharacter({ characterId, characterData: formData }));
        toast.success('Changes Saved');
      }
    }
  };

  const onDeleteHandler = async () => {
    if (!characterId) return;

    const deleteChar = async () => {
      await dispatch(deleteCharacter(characterId));
      navigate('..');
      toast.success('Character Deleted');
    };

    confirmAlert({
      customUI: ({ onClose }) => (
        <ConfirmDeleteModal onConfirmHandler={deleteChar} onCloseHandler={onClose} />
      ),
    });
  };

  return (
    <>
      <ContextualSaveBar
        isLoading={isLoading}
        showSavePrompt={showSaveBar}
        discardChangesHandler={handleDiscardChanges}
      />

      <header className='container mx-auto p-2 md:p-4'>
        <h1 className='inline-block text-3xl md:text-4xl font-bold gradient-on-text'>
          <span>{`${capitalizeFirstLetter(mode)} Character`}</span>
        </h1>
      </header>
      <section className='container mx-auto p-2 md:p-4'>
        <CharacterForm
          {...{
            mode,
            formData,
            onChangeHandler,
            onChangeCharacterSheetHandler,
            onChangeSkillsHandler,
            onChangeAbilityScoreHandler,
            onSubmitHandler,
            onDeleteHandler,
          }}
        />
      </section>
    </>
  );
};
export default EditCharacter;
