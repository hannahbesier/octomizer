import { State } from "./types";

export default function exampleStore(): State {
  return {
    explorerContent: 0,
    currentExpanded: [],
    sessionId: null,
    isAuth: false,
  }

}
