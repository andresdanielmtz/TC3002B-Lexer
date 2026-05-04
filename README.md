# Lexer

## How to run the project

```bash
npm i
npm run build
npm start
```

## Input

We'll use Triton as our input language. You can find the specification for the language [in this link.](https://triton-lang.org/main/index.html).

See `/input` for sample Triton files.

## Project Structure

```text
.
├── input/
│   └── triton.py
├── scripts/
├── src/
│   ├── index.ts
│   ├── readFile.ts
│   └── constants/
│       ├── automaton.ts
│       ├── regex.ts
│       ├── tokens.ts
│       └── transitionTable.ts
├── package.json
├── README.md
├── TODO.md
└── tsconfig.json
```

## Github Workflow

Right now, the current github workflow only checks for whether or not the project compiles, so you can use the following command to check out if it works:

```bash
npm run build
```

## Tests

The project uses Node's built-in test runner. The tests are written in TypeScript under `src/tests/`, compiled to `dist/tests/`, and then executed from the compiled output.

Run them with:

```bash
npm test
```

The current test case checks the lexer output for a small Triton-like snippet and verifies that token types, values, line numbers, and column numbers are preserved correctly.
