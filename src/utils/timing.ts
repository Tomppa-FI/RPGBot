export const QuestStartDelayMS = (speedModifier: number) => 120000 * speedModifier;

export const msToString = (ms: number) => {
  const minutes = Math.floor((ms / 1000) % 3600 / 60);
  const seconds = Math.floor((ms / 1000) % 3600 % 60);
  return `${minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : ""} ${seconds ? `${seconds} ${seconds === 1 ? 'second' : 'seconds'}` : ""}`;
}

export const promisifyDelay = (delayInMs: number) => new Promise(resolve => setTimeout(resolve, delayInMs));