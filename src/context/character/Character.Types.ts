import { DocumentReference } from 'firebase/firestore';

export enum CHARACTER_ACTION_TYPES {
  FETCH_CHARACTERS = 'character/FETCH_CHARACTERS',
  FETCH_CHARACTER = 'character/FETCH_CHARACTER',
  SET_LOADING = 'character/SET_LOADING',
}

export interface ReducerAction {
  type: CHARACTER_ACTION_TYPES;
  payload?: any;
}

interface CharacterSheet {
  avatar: string;
  race: string;
  class: string;
  subclass: string | null;
  level: number;
  experiencePoints: number;
  inspiration: boolean;
  background: string | null;
  patronOrDeity: string | null;
  hpMax: number;
  ac: number;
  spellSave: number;
  speed: {
    walk: number;
    [key: string]: number;
  };
  abilityScores: {
    strength: {
      value: number;
      proficient: boolean;
    };
    dexterity: {
      value: number;
      proficient: boolean;
    };
    constitution: {
      value: number;
      proficient: boolean;
    };
    intelligence: {
      value: number;
      proficient: boolean;
    };
    wisdom: {
      value: number;
      proficient: boolean;
    };
    charisma: {
      value: number;
      proficient: boolean;
    };
  };
  skills:
    | { skill: string; proficiency: ['proficient' | 'expert' | null] }[]
    | null;
}

export const initialCharacterSheet: CharacterSheet = {
  avatar: '',
  race: '',
  class: '',
  subclass: null,
  level: 1,
  experiencePoints: 0,
  inspiration: false,
  background: null,
  patronOrDeity: null,
  hpMax: 0,
  ac: 10,
  spellSave: 0,
  speed: {
    walk: 30,
  },
  abilityScores: {
    strength: {
      value: 0,
      proficient: false,
    },
    dexterity: {
      value: 0,
      proficient: false,
    },
    constitution: {
      value: 0,
      proficient: false,
    },
    intelligence: {
      value: 0,
      proficient: false,
    },
    wisdom: {
      value: 0,
      proficient: false,
    },
    charisma: {
      value: 0,
      proficient: false,
    },
  },
  skills: null,
};

export interface CharacterData {
  name: string;
  createdAt: Date | null;
  createdBy: DocumentReference | null;
  playedBy: DocumentReference | null;
  characterSheet: CharacterSheet | null;
}

export const initialCharacterData: CharacterData = {
  name: '',
  createdAt: null,
  createdBy: null,
  playedBy: null,
  characterSheet: null,
};

export interface CharacterState {
  readonly characters: CharacterData[] | null;
  readonly character: CharacterData | null;
  readonly loading: boolean;
}
