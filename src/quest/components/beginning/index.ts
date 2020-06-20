import Quest from "../../Quest";
import { QuestStartDelayMS, msToString, promisifyDelay } from "../../../utils/timing";
import { NobodyJoinedError } from "../../../utils/errors";

export default async function handleBeginning(quest: Quest) {
  const startDelay = QuestStartDelayMS(quest.getSpeedModifier());
  quest.setJoinable(true);

  quest.sendChannelMessage(
`A Quest will begin in ${msToString(startDelay)}
Please type !join to participate!`
  )

  await promisifyDelay(startDelay);

  quest.setJoinable(false);
  
  if (quest.getPlayers().size === 0) throw new NobodyJoinedError();
  
  quest.sendChannelMessage(
`The Quest has started! Good luck to all participants.`
  );
}