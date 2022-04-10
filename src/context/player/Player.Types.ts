import { DocumentReference } from 'firebase/firestore';

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

export interface PlayerCharacterData {
  name: string;
  createdAt: Date | null;
  createdBy: DocumentReference | null;
  playedBy: DocumentReference | null;
  characterSheet: CharacterSheet | null;
}

const initialSheet: CharacterSheet = {
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

export const initialPlayerCharacterData: PlayerCharacterData = {
  name: '',
  createdAt: null,
  createdBy: null,
  playedBy: null,
  characterSheet: initialSheet,
};
