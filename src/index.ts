import { Token } from "./constants/tokens";
import { readTritonFile, tokenizeLine } from "./readFile";

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
        tokenList.push(...tokenizeLine(lineText, line));
    }

    console.log(tokenList);
};

main();
