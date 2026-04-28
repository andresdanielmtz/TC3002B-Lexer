import { Token, TOKEN_TYPE } from "./constants/tokens";
import { readTritonFile, matchToken, isWordAConditional } from "./readFile";

/**
 * Entry point
 */
const main = () => {
    const tokenList: Token[] = [];

    const sourceCode = readTritonFile("triton"); // triton.py
    console.log(sourceCode);

    const lines = sourceCode.split(/\r?\n/);

    // Go through each line of the source code.
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const lineText = lines[lineIndex] ?? "";
        const line = lineIndex + 1;
        const wordRegex = /\S+/g;
        let match: RegExpExecArray | null;

        // Use regex to find words in the line and match them to token types
        while ((match = wordRegex.exec(lineText)) !== null) {
            const word = match[0];
            const column = match.index + 1;

            if (isWordAConditional(word)) {
                console.log(
                    `Found conditional "${word}" at line ${line}, column ${column}.`,
                );
            } else {
                const token = matchToken(word, line, column);
                if (token.type === TOKEN_TYPE.IDENTIFIER) {
                    console.warn(
                        `Warning: Unrecognized token "${word}" at line ${line}, column ${column}. Defaulting to IDENTIFIER.`,
                    );
                    // todo: add automatas to detect if its another token type (e.g., NUMBER, STRING, PUNCTUATION, COMMENT, WHITESPACE) instead of defaulting to IDENTIFIER.
                }
                tokenList.push(token);
            }
        }
    }

    console.log(tokenList);
};

main();
