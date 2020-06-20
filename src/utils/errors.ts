import Quest from "../quest/Quest";

export class QuestError extends Error {
  constructor() {
    super();
    this.name = "QuestError";
  }
}

export class NobodyJoinedError extends QuestError {
  __proto__: QuestError;
  constructor() {
    super();
    this.message = `Nobody joined the Quest!`;
  }
}