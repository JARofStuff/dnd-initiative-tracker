import { DocumentReference } from 'firebase/firestore';
import { Timestamp, FieldValue } from 'firebase/firestore';

export interface CharacterSheet {
  avatar: string;
  gender: string;
  race: string;
  characterClass: string;
  subclass: string;
  level: number;
  experiencePoints: number;
  inspiration: boolean;
  background: string;
  // alignment: string;
  // patronOrDeity: string;
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

const initialCharacterSheet: CharacterSheet = {
  avatar: '',
  gender: '',
  race: '',
  characterClass: '',
  subclass: '',
  level: 1,
  experiencePoints: 0,
  inspiration: false,
  background: '',
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
  id?: string;
  characterName: string;
  createdAt: FieldValue | Timestamp | { seconds: number; nanoseconds: number } | undefined;
  createdBy: DocumentReference | String;
  playerName: string;
  characterSheet: CharacterSheet;
}

export const initialCharacterData: CharacterData = {
  characterName: '',
  createdAt: undefined,
  createdBy: '',
  playerName: '',
  characterSheet: initialCharacterSheet,
};
