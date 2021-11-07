<!-- markdownlint-disable first-line-h1 line-length -->

[![Coverage Status](https://coveralls.io/repos/github/andreidmt/library-stack-node/badge.svg)](https://coveralls.io/github/andreidmt/library-stack-node)

# Library Stack for Node.js projects

> **library stack**  
> _noun_
>
> Multiple libraries and services configured and composed together with the
> purpose of automating common development practices: __compilation__,
> __linting__, __typechecking__, __testing__, __test coverage__,
> __benchmarking__ and __releasing__.

- :godmode: **Composition over hierarchy** - While similar to a
  [Framework](https://en.wikipedia.org/wiki/Software_framework), providing an
  opinionated ways of handling certain development topics, it intentionally
  leaves visible the containing libraries details - configuration file, npm
  scripts, commit hooks etc.

- :honeybee: :ocean: **Continuous stack refactoring** - Configuration freedom
  and choice over their application core libraries, focusing on __zero
  lock-in__ and __experimentation__ with new libraries and workflows.

## Table of contents

<!-- vim-markdown-toc GFM -->

- [How to use](#how-to-use)
- [Responsibilities](#responsibilities)
  - [Compile](#compile)
  - [Lint](#lint)
  - [Typecheck](#typecheck)
  - [Test](#test)
    - [All tests one time](#all-tests-one-time)
    - [All tests when something inside `src` changes](#all-tests-when-something-inside-src-changes)
  - [Test coverage](#test-coverage)
  - [Benchmark](#benchmark)
  - [Release](#release)
- [Changelog](#changelog)

<!-- vim-markdown-toc -->

## How to use

## Responsibilities

### Compile

1. [**typescript**](https://github.com/microsoft/TypeScript) -
   [`.tscrc`](.tscrc)  
  A superset of JavaScript that compiles to clean JavaScript output.

1. [**swc**](https://github.com/swc-project/swc) - [`.swcrc`](.swcrc)  
  A super-fast compiler written in Rust; producing widely-supported JavaScript
  from modern standards and typescript.

Compile TypeScript files inside `src` folder, with type definitions and source
maps, into `dist`.

```bash
# "build.js": "swc src -d dist",
# "build.types": "tsc --project .tscrc --emitDeclarationOnly",
# "build": "npm run build.js && npm run build.types",
npm run build
```

### Lint

1. [**eslint**](https://github.com/eslint/eslint) - [`.eslintrc`](.eslintrc)  
  Find and fix problems in your JavaScript code.

1. [**prettier**](https://github.com/prettier/prettier) -
   [`.prettierrc`](.prettierrc)  
  Opinionated code formatter. Enforces a consistent style by parsing your
  code and re-printing it with its own rules that take the maximum line length
  into account, wrapping code when necessary.

1. [**markdownlint**](https://github.com/igorshubovych/markdownlint-cli) -
   [`.markdownlintrc`](.markdownlintrc)  
  Style checker and lint tool for Markdown/CommonMark files.

1. [**commitlint**](https://github.com/conventional-changelog/commitlint) -
[`.commitlintrc`](.commitlintrc)  
  Check your commit messages meet the [conventional commit
  format](https://www.conventionalcommits.org).

1. [**lint-staged**](https://github.com/okonet/lint-staged) -
[`.lintstagedrc`](.lintstagedrc)  
  Run linters against staged git files and don't let :hankey: slip into your
  codebase!

```bash
# "lint.js": "eslint --quiet src",
# "lint.md": "markdownlint '*.md'",
# "lint": "npm run lint.js && npm run lint.md",
npm run lint
```

### Typecheck

1. [**typescript**](https://github.com/microsoft/TypeScript) - [`.tscrc`](.tscrc)  
  A superset of JavaScript that compiles to clean JavaScript output.

```bash
# "typecheck": "tsc --project .tscrc --noEmit",
npm run typecheck
```

### Test

1. [**tape**](https://github.com/substack/tape)
   [TAP](https://en.wikipedia.org/wiki/Test_Anything_Protocol) producing test
   harness for node and browsers.

1. [**tap-nirvana**](https://github.com/inadarei/tap-nirvana)  
  Tap Nirvana is a proper diffing reporter for TAP.

1. [**nodemon**](https://github.com/remy/nodemon/)  
  Monitor changes in your application and automatically run an npm script -
  perfect for development.

#### All tests one time

```bash
# "pretest": "npm run build.js",
# "test": "tape 'dist/*.test.js' 'dist/**/*.test.js' | tap-nirvana",
npm run test
```

#### All tests when something inside `src` changes

```bash
# "tdd": "nodemon --watch src --ext js,ts,json --exec 'npm test'",
npm run tdd
```

### Test coverage

![tape running all test files inside src folder](/docs/screenshot-test.png)

1. [**c8**](https://github.com/bcoe/c8) - [`.c8rc`](.c8rc)  
  Output coverage reports using Node.js' built in coverage.

1. [**coveralls.io**](https://coveralls.io/)  
  Service for test coverage reporting.  
  
Use either `.coveralls.yml` or `COVERALLS_REPO_TOKEN` environment variable to
submit the reports to your project, see [Coveralls Currently Supports These
CIs](https://docs.coveralls.io/supported-ci-services) for details.  

```bash
# "coverage": "c8 npm test && c8 report --reporter=text-lcov | coveralls",
npm run coverage
```

### Benchmark

![benchmark suite code (left) and output](/docs/screenshot-benchmark.png)

1. [**benny**](https://github.com/caderek/benny)  
  A dead simple benchmarking framework for JS/TS libs.

```bash
# "prebenchmark": "npm run build.js && rm -rf ./benchmark",
# "benchmark": "node dist/**/*.bench.js",
npm run benchmark
```

### Release

1. [**semantic-release**](https://github.com/semantic-release/semantic-release)  
  Fully automated version management and package publishing.

1. [**CircleCI**](https://circleci.com) - [`.circleci/config.yml`](.circleci/config.yml)  
  Continuous integration platform.

## Changelog

See the [releases section](https://github.com/andreidmt/library-stack-node) for
details.
