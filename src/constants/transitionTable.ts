import { TOKEN_TYPE } from "./tokens";

type TransitionState = string;
type TransitionSymbol = string;

type TransitionTable = Record<TransitionState, Partial<Record<TransitionSymbol, TransitionState>>>;

const LETTER = "LETTER";
const DIGIT = "DIGIT";
const STRING_CHARACTER = "STRING_CHARACTER";

/**
 * Defines a deterministic finite automaton that can classify a complete source input as a token type.
 */
interface Automaton {
  name: string;
  tokenType: TOKEN_TYPE;
  startState: TransitionState;
  acceptStates: readonly TransitionState[];
  transitions: TransitionTable;
}

/**
 * Automaton that recognizes the `while` keyword using a single transition chain.
 */
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

/**
 * Automaton that recognizes the `if`, `else`, and `elif` keywords.
 * All successful paths finish in the same `END` accept state.
 */
const CONDITIONAL_KEYWORD_AUTOMATON: Automaton = {
  name: "CONDITIONAL_KEYWORD",
  tokenType: TOKEN_TYPE.KEYWORD,
  startState: "START",
  acceptStates: ["END"],
  transitions: {
    START: { i: "I", e: "E" },
    I: { f: "END" },
    E: { l: "EL" },
    EL: { s: "ELS", i: "ELI" },
    ELS: { e: "END" },
    ELI: { f: "END" },
    END: {},
  },
};

/**
 * Automaton that recognizes identifier names that start with a letter or underscore.
 */
const NAME_AUTOMATON: Automaton = {
  name: "NAME",
  tokenType: TOKEN_TYPE.IDENTIFIER,
  startState: "START",
  acceptStates: ["NAME"],
  transitions: {
    START: { [LETTER]: "NAME", _: "NAME" },
    NAME: { [LETTER]: "NAME", _: "NAME", [DIGIT]: "NAME" },
  },
};

/**
 * Automaton that recognizes integer and decimal number literals.
 */
const NUMBER_AUTOMATON: Automaton = {
  name: "NUMBER",
  tokenType: TOKEN_TYPE.IDENTIFIER,
  startState: "START",
  acceptStates: ["NUMBER", "NUMBER_FRACTION"],
  transitions: {
    START: { [DIGIT]: "NUMBER" },
    NUMBER: { [DIGIT]: "NUMBER", ".": "DECIMAL_POINT" },
    DECIMAL_POINT: { [DIGIT]: "NUMBER_FRACTION" },
    NUMBER_FRACTION: { [DIGIT]: "NUMBER_FRACTION" },
  },
};

/**
 * Automaton that recognizes single-quoted and double-quoted string literals.
 */
const STRING_AUTOMATON: Automaton = {
  name: "STRING",
  tokenType: TOKEN_TYPE.IDENTIFIER,
  startState: "START",
  acceptStates: ["STRING_END"],
  transitions: {
    START: { '"': "DOUBLE_STRING", "'": "SINGLE_STRING" },
    DOUBLE_STRING: { '"': "STRING_END", [STRING_CHARACTER]: "DOUBLE_STRING" },
    SINGLE_STRING: { "'": "STRING_END", [STRING_CHARACTER]: "SINGLE_STRING" },
    STRING_END: {},
  },
};

/**
 * Automaton that recognizes arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, and `**`.
 */
const ARITHMETIC_OPERATOR_AUTOMATON: Automaton = {
  name: "ARITHMETIC_OPERATOR",
  tokenType: TOKEN_TYPE.OPERATOR,
  startState: "START",
  acceptStates: ["END", "TIMES", "DIVIDE"],
  transitions: {
    START: { "+": "END", "-": "END", "*": "TIMES", "/": "DIVIDE", "%": "END" },
    TIMES: { "*": "END" },
    DIVIDE: { "/": "END" },
    END: {},
  },
};

/**
 * Ordered collection of transition-table automata used by the lexer before regex fallback.
 */
const tokenAutomata: readonly Automaton[] = [
  WHILE_KEYWORD_AUTOMATON,
  CONDITIONAL_KEYWORD_AUTOMATON,
  NAME_AUTOMATON,
  NUMBER_AUTOMATON,
  STRING_AUTOMATON,
  ARITHMETIC_OPERATOR_AUTOMATON,
];

/**
 * Checks whether a single input symbol belongs to a supported transition class.
 * @param transitionSymbol The transition key from the current state's transition table.
 * @param sourceSymbol The current input character being consumed by the automaton.
 * @returns True when the transition key is a class that contains the input character.
 */
const matchesTransitionClass = (transitionSymbol: TransitionSymbol, sourceSymbol: string): boolean => {
  switch (transitionSymbol) {
    case LETTER:
      return /^[A-Za-z]$/.test(sourceSymbol);
    case DIGIT:
      return /^\d$/.test(sourceSymbol);
    case STRING_CHARACTER:
      return sourceSymbol.length === 1;
    default:
      return false;
  }
};

/**
 * Resolves the next state for one source symbol, checking exact transitions before class transitions.
 * @param transitions The current state's transition definitions.
 * @param sourceSymbol The input character to consume.
 * @returns The next state, or undefined when no transition matches.
 */
const findNextState = (
  transitions: Partial<Record<TransitionSymbol, TransitionState>> | undefined,
  sourceSymbol: string,
): TransitionState | undefined => {
  if (transitions === undefined) {
    return undefined;
  }

  const exactNextState = transitions[sourceSymbol];

  if (exactNextState !== undefined) {
    return exactNextState;
  }

  const matchingTransition = Object.entries(transitions).find(([transitionSymbol]) =>
    matchesTransitionClass(transitionSymbol, sourceSymbol),
  );

  return matchingTransition?.[1];
};

/**
 * Runs a source input through one automaton and returns true only when the whole input ends in an accept state.
 * @param automaton The automaton that contains the transition table and accepted final states.
 * @param sourceInput The complete input fragment to classify.
 * @returns True when the input follows valid transitions and finishes in an accept state.
 */
const runAutomaton = (automaton: Automaton, sourceInput: string): boolean => {
  let currentState = automaton.startState;

  for (const symbol of sourceInput) {
    const nextState = findNextState(automaton.transitions[currentState], symbol);

    if (nextState === undefined) {
      return false;
    }

    currentState = nextState;
  }

  return automaton.acceptStates.includes(currentState);
};

/**
 * Finds the first transition-table automaton that recognizes the source input.
 * @param sourceInput The complete input fragment to classify.
 * @returns The token type produced by the matched automaton, or undefined when none match.
 */
export const matchTransitionTableToken = (sourceInput: string): TOKEN_TYPE | undefined => {
  const matchedAutomaton = tokenAutomata.find((automaton) => runAutomaton(automaton, sourceInput));
  return matchedAutomaton?.tokenType;
};

export {
  ARITHMETIC_OPERATOR_AUTOMATON,
  CONDITIONAL_KEYWORD_AUTOMATON,
  NAME_AUTOMATON,
  NUMBER_AUTOMATON,
  STRING_AUTOMATON,
  WHILE_KEYWORD_AUTOMATON,
  tokenAutomata,
};
export type { Automaton, TransitionTable };
