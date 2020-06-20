export enum QuestSpeed {
  FAST, NORMAL, SLOW
}

export const mapQuestSpeedToModifier = {
  [QuestSpeed.FAST]: .5,
  [QuestSpeed.NORMAL]: 1,
  [QuestSpeed.SLOW]: 1.5
}