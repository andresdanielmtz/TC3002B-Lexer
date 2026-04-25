/**
 * This file defines the various token types that the lexer will recognize in the source code.
 */
enum TOKEN_TYPE {
    IDENTIFIER = "IDENTIFIER",
    NUMBER = "NUMBER",
    STRING = "STRING",
    OPERATOR = "OPERATOR",
    KEYWORD = "KEYWORD",
    PUNCTUATION = "PUNCTUATION",
    COMMENT = "COMMENT",
    WHITESPACE = "WHITESPACE",
    EOF = "EOF"   
}

interface Token { 
    type: TOKEN_TYPE;
    value: string;
    line: number;
    column: number;
}

export { TOKEN_TYPE, type Token };