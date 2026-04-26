import * as fs from "fs";
import * as path from "path";

/**
 * Read and return the parse source code.
 * It will be a string containining the entirety of the source code, incluiding whitespaces and comments, as they are needed for the lexer to generate the correct tokens.
 */
const readTritonFile = (fileName: string): string => {
  const tritonPath = path.resolve(__dirname, `../input/${fileName}.py`);
  const sourceCode: string = fs.readFileSync(tritonPath, "utf-8");
  return sourceCode;
};

export default readTritonFile;
