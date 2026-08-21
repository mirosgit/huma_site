# Tic-Tac-Toe E2E automation

## Run

1. Open a terminal in the project root.
2. Open the automation directory and create `.env` from the provided example:

```bash
cd automation
cp .env.example .env
```

3. Run the tests:

```bash
npm test
```

| Command                   | Purpose                              |
| ------------------------- | ------------------------------------ |
| `npm test`                | Run the default test suite           |
| `npm run test:smoke`      | Run smoke tests                      |
| `npm run test:regression` | Run regression tests                 |
| `npm run test:e2e`        | Run end-to-end tests                 |
| `npm run test:headed`     | Run tests in a visible Chrome window |

## Technologies

| Technology | Purpose |
| --- | --- |
| Node.js 20+ | JavaScript runtime for the automation project |
| JavaScript (ES modules) | Test framework and project configuration |
| WebdriverIO 9 | Browser automation and E2E test execution |
| Cucumber 10 and Gherkin | BDD scenarios, feature files, and step definitions |
| Google Chrome and WebDriver | Browser used to run the tests |
| Allure Reporter | Test reports and failure screenshots |
| dotenv | Environment configuration loaded from `.env` |
| ESLint and Prettier | Code quality checks and formatting |
| HTML, CSS, and JavaScript | Tic-Tac-Toe application under test |

## Architecture

```text
app/
└── index.html                         System under test

automation/
├── config/
│   ├── dev.js                         Local environment configuration
│   └── stage.js                       Stage environment configuration
├── test/
│   ├── specs/
│   │   ├── auth/                      Authentication features
│   │   ├── game/                      Game features
│   │   └── profile/                   Profile features
│   ├── steps/                         Cucumber step definitions
│   ├── support/                       Cucumber World and hooks
│   ├── pageobjects/                   Page-specific behavior
│   ├── components/                    Shared navbar and modal behavior
│   ├── locators/                      Central selector registry
│   ├── data/                          Test data and scripted games
│   └── utils/
│       └── storage/                   LocalStorage helpers
├── reports/                           Generated Allure output
├── wdio.conf.js                       WebdriverIO configuration
├── eslint.config.js                   ESLint configuration
└── package.json                       Commands and dependencies
```
