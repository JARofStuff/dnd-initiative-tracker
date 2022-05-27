import type { AbilityScoreType } from '@store/Character/Character.Types';
import { abilityScoreModifierTable } from '@utils/constants/abilityScoreModifierTable';

const getProficiencyBonus = (level: number): number => {
  // Formula found here: https://dicecove.com/how-to-calculate-proficiency-bonus/
  return Math.ceil(1 + level / 4);
};

const getAbilityScoreModifierValue = (score: number): number => {
  const abilityScoreModifierArr = abilityScoreModifierTable.filter(({ from, to }) => {
    return score >= from && score <= to;
  });

  return abilityScoreModifierArr.length > 0 ? abilityScoreModifierArr[0].val : 0;
};

const getAbilityBonusDisplay = (score: number, proficiencyBonus: number): string => {
  const abilityScoreModifier = getAbilityScoreModifierValue(score);
  return `${abilityScoreModifier >= 0 ? '+' : ''}${abilityScoreModifier + proficiencyBonus}`;
};

const processAbilityScores = (
  abilityScores: AbilityScoreType,
  proficiencyBonus: number = 0
): {
  abr: string;
  score: number;
  modifier: string;
}[] => {
  return Object.entries(abilityScores).map((ability) => {
    //Ability Abbreviation for display
    const abr: string = ability[0].substring(0, 3).toUpperCase();

    //Ability Score
    const score: number = ability[1].score;

    //Proficiency Bonus
    const isProficient = ability[1].proficient;
    proficiencyBonus = isProficient ? proficiencyBonus : 0;

    const modifier = getAbilityBonusDisplay(score, proficiencyBonus);

    return { abr, score, modifier };
  });
};

export {
  processAbilityScores,
  getAbilityScoreModifierValue,
  getAbilityBonusDisplay,
  getProficiencyBonus,
};
