import { TOKEN_TYPE } from "./tokens";
import { DFSState } from "./dfs"; // todo: add dfsstate to the transition table itself

/**
 * Transition table for the lexer. This is a 2D table that maps the current state and the input token to the next state.
 */
type TransitionTable = Record<TOKEN_TYPE, Record<TOKEN_TYPE, TOKEN_TYPE>>;

// Todo: implement transition table.