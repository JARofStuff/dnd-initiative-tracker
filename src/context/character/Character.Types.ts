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

export interface CharacterSheet {
  avatar: string;
  gender: string | undefined;
  race: string;
  characterClass: string;
  subclass: string | undefined;
  level: number;
  experiencePoints: number;
  inspiration: boolean | undefined;
  background: string | undefined;
  // alignment: string | undefined;
  // patronOrDeity: string | undefined;
  hpMax: number;
  ac: number;
  spellSave: number;
  speed: {
    walk: number;
    [key: string]: number | undefined;
  };
  abilityScores: {
    [key: string]: {
      score: number;
      proficient: boolean;
    };
  };
  skills: {
    [key: string]: {
      proficient: boolean;
      expertise: boolean;
    };
  };
}

export const initialCharacterSheet: CharacterSheet = {
  avatar: '',
  gender: undefined,
  race: '',
  characterClass: '',
  subclass: undefined,
  level: 1,
  experiencePoints: 0,
  inspiration: false,
  background: undefined,
  // alignment: undefined,
  // patronOrDeity: undefined,
  hpMax: 0,
  ac: 10,
  spellSave: 0,
  speed: {
    walk: 30,
  },
  abilityScores: {
    strength: {
      score: 0,
      proficient: false,
    },
    dexterity: {
      score: 0,
      proficient: false,
    },
    constitution: {
      score: 0,
      proficient: false,
    },
    intelligence: {
      score: 0,
      proficient: false,
    },
    wisdom: {
      score: 0,
      proficient: false,
    },
    charisma: {
      score: 0,
      proficient: false,
    },
  },
  skills: {
    dexAcrobatics: {
      proficient: false,
      expertise: false,
    },
    wisAnimalHandling: {
      proficient: false,
      expertise: false,
    },
    intArcana: {
      proficient: false,
      expertise: false,
    },
    strAthletics: {
      proficient: false,
      expertise: false,
    },
    chaDeception: {
      proficient: false,
      expertise: false,
    },
    intHistory: {
      proficient: false,
      expertise: false,
    },
    wisInsight: {
      proficient: false,
      expertise: false,
    },
    chaIntimidation: {
      proficient: false,
      expertise: false,
    },
    intInvestigation: {
      proficient: false,
      expertise: false,
    },
    wisMedicine: {
      proficient: false,
      expertise: false,
    },
    intNature: {
      proficient: false,
      expertise: false,
    },
    wisPerception: {
      proficient: false,
      expertise: false,
    },
    chaPerformance: {
      proficient: false,
      expertise: false,
    },
    chaPersuasion: {
      proficient: false,
      expertise: false,
    },
    intReligion: {
      proficient: false,
      expertise: false,
    },
    dexSleightOfHand: {
      proficient: false,
      expertise: false,
    },
    dexStealth: {
      proficient: false,
      expertise: false,
    },
    wisSurvival: {
      proficient: false,
      expertise: false,
    },
  },
};

export interface CharacterData {
  characterName: string;
  createdAt: Date | null;
  createdBy: DocumentReference | null;
  playedBy: DocumentReference | null;
  characterSheet: CharacterSheet | null;
}

export const initialCharacterData: CharacterData = {
  characterName: '',
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
