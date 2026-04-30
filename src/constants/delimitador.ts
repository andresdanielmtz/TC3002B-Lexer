/**
 * Regex patterns for delimiters and indentation
 * Special characters are escaped when required by regex syntax
 */

// =======================
// DELIMITERS
// =======================

// Parentheses
export const LPAREN = /\(/;
export const RPAREN = /\)/;

// Brackets
export const LBRACKET = /\[/;
export const RBRACKET = /\]/;

// Braces
export const LBRACE = /\{/;
export const RBRACE = /\}/;

// Punctuation delimiters
export const COMMA = /,/;
export const COLON = /:/;
export const DOT = /\./;
export const AT = /@/;
export const ARROW = /->/;

// Bitwise and symbolic delimiters
export const TILDE = /~/;
export const AMPERSAND = /&/;
export const PIPE = /\|/;
export const CARET = /\^/;
export const LSHIFT = /<</;
export const RSHIFT = />>/;

/**
 * Combined delimiter regex patterns
 */
export const delimiters = {
  LPAREN,
  RPAREN,
  LBRACKET,
  RBRACKET,
  LBRACE,
  RBRACE,
  COMMA,
  COLON,
  DOT,
  AT,
  ARROW,
  TILDE,
  AMPERSAND,
  PIPE,
  CARET,
  LSHIFT,
  RSHIFT,
};

/**
 * Array of all delimiter patterns with their names
 */
export const delimiterList = [
  { name: "LPAREN", pattern: LPAREN },
  { name: "RPAREN", pattern: RPAREN },
  { name: "LBRACKET", pattern: LBRACKET },
  { name: "RBRACKET", pattern: RBRACKET },
  { name: "LBRACE", pattern: LBRACE },
  { name: "RBRACE", pattern: RBRACE },
  { name: "COMMA", pattern: COMMA },
  { name: "COLON", pattern: COLON },
  { name: "DOT", pattern: DOT },
  { name: "AT", pattern: AT },
  { name: "ARROW", pattern: ARROW },
  { name: "TILDE", pattern: TILDE },
  { name: "AMPERSAND", pattern: AMPERSAND },
  { name: "PIPE", pattern: PIPE },
  { name: "CARET", pattern: CARET },
  { name: "LSHIFT", pattern: LSHIFT },
  { name: "RSHIFT", pattern: RSHIFT },
];


// =======================
// INDENTATION
// =======================

/**
 * Regex patterns for indentation-related tokens
 * NOTE:
 * - NEWLINE is directly detectable
 * - INDENT is used to capture leading whitespace
 * - DEDENT is handled with lexer logic (stack), not regex
 */

export const NEWLINE = /\r?\n/;
export const INDENT = /^[ \t]+/;
export const DEDENT = /(?<![\s\S])/;

export const indentation = {
  NEWLINE,
  INDENT,
  DEDENT,
};

/**
 * Array of all indentation patterns with their names
 */
export const indentationList = [
  { name: "NEWLINE", pattern: NEWLINE },
  { name: "INDENT", pattern: INDENT },
  { name: "DEDENT", pattern: DEDENT },
];


// =======================
// GLOBAL COMBINED EXPORT (optional but useful)
// =======================

export const allPatterns = {
  ...delimiters,
  ...indentation,
};

export const allPatternList = [
  ...delimiterList,
  ...indentationList,
];