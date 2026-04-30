import { TOKEN_TYPE } from "./tokens";

type TransitionState = string;
type TransitionSymbol = string;

type TransitionTable = Record<TransitionState, Partial<Record<TransitionSymbol, TransitionState>>>;

interface Automaton {
  name: string;
  tokenType: TOKEN_TYPE;
  startState: TransitionState;
  acceptStates: readonly TransitionState[];
  transitions: TransitionTable;
}

const WHILE_KEYWORD_AUTOMATON: Automaton = {
  name: "WHILE_KEYWORD",
  tokenType: TOKEN_TYPE.KEYWORD,
  startState: "START",
  acceptStates: ["WHILE"],
  transitions: {
    START: { w: "W" },
    W: { h: "WH" },
    WH: { i: "WHI" },
    WHI: { l: "WHIL" },
    WHIL: { e: "WHILE" },
    WHILE: {},
  },
};

const tokenAutomata: readonly Automaton[] = [WHILE_KEYWORD_AUTOMATON];

const runAutomaton = (automaton: Automaton, sourceInput: string): boolean => {
  let currentState = automaton.startState;

  for (const symbol of sourceInput) {
    const nextState = automaton.transitions[currentState]?.[symbol];

    if (nextState === undefined) {
      return false;
    }

    currentState = nextState;
  }

  return automaton.acceptStates.includes(currentState);
};

export const matchTransitionTableToken = (sourceInput: string): TOKEN_TYPE | undefined => {
  const matchedAutomaton = tokenAutomata.find((automaton) => runAutomaton(automaton, sourceInput));
  return matchedAutomaton?.tokenType;
};

export { WHILE_KEYWORD_AUTOMATON, tokenAutomata };
export type { Automaton, TransitionTable };
