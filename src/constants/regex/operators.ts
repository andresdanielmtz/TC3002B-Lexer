/**
 * Regex patterns for Python operators
 */

// Comparison operators
export const LT = /</;
export const GT = />/;
export const LE = /<=/;
export const GE = />=/;
export const EQ = /==/;
export const NE = /!=/;

// Assignment operators
export const ASSIGN = /=/;
export const PLUSEQ = /\+=/;
export const MINUSEQ = /-=/;
export const TIMESEQ = /\*=/;
export const DIVEQ = /\/=/;

/**
 * Combine both assignment and comparison operators.
 */
export const operators = {
  LT,
  GT,
  LE,
  GE,
  EQ,
  NE,
  ASSIGN,
  PLUSEQ,
  MINUSEQ,
  TIMESEQ,
  DIVEQ,
};

export const operatorList = [
  { name: "LE", pattern: LE },
  { name: "GE", pattern: GE },
  { name: "EQ", pattern: EQ },
  { name: "NE", pattern: NE },
  { name: "LT", pattern: LT },
  { name: "GT", pattern: GT },
  { name: "ASSIGN", pattern: ASSIGN },
  { name: "PLUSEQ", pattern: PLUSEQ },
  { name: "MINUSEQ", pattern: MINUSEQ },
  { name: "TIMESEQ", pattern: TIMESEQ },
  { name: "DIVEQ", pattern: DIVEQ },
];
