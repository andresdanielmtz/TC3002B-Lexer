import * as fs from "fs";
import * as path from "path";
import { TOKEN_TYPE, Token } from "./constants/tokens";
import { KEYWORD_REGEX_EXP, OPERATOR_REGEX_EXP } from "./constants/regex";
/**
 * Read and return the parse source code.
 * It will be a string containining the entirety of the source code, incluiding whitespaces and comments, as they are needed for the lexer to generate the correct tokens.
 */
export const readTritonFile = (fileName: string): string => {
  const tritonPath = path.resolve(__dirname, `../input/${fileName}.py`);
  const sourceCode: string = fs.readFileSync(tritonPath, "utf-8");
  return sourceCode;
};

/**
 * This method takes a string of source code and matches it against the defined token patterns to determine its token type using Regex.
 * @param sourceInput The string of source code to be matched against token patterns.
 * @returns The token type that matches the input source code string. If no match is found, it defaults to TOKEN_TYPE.IDENTIFIER.
 */
export const matchToken = (sourceInput: string, line: number, column: number): Token => {
  const outputToken: Token = { type: TOKEN_TYPE.IDENTIFIER, value: sourceInput, line: line, column: column };
  
  switch (true) {
    case KEYWORD_REGEX_EXP.test(sourceInput):
      outputToken.type = TOKEN_TYPE.KEYWORD;
      break;
    case OPERATOR_REGEX_EXP.test(sourceInput):
      outputToken.type = TOKEN_TYPE.OPERATOR;
      break;
    // todo: add more cases for other token types (e.g., NUMBER, STRING, PUNCTUATION, COMMENT, WHITESPACE)

    // ?? By default, we should assume the token is an IDENTIFIER.
    default:
      outputToken.type = TOKEN_TYPE.IDENTIFIER;
  }
  return outputToken;
};