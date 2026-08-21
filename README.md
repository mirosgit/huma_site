# Tic-Tac-Toe E2E automation

## Prerequisites

| Requirement | Why | Check |
| --- | --- | --- |
| Node.js 20+ (npm included) | Runs the automation project | `node -v` |
| Git | Clones the repository | `git --version` |
| Google Chrome | The browser the tests drive | `google-chrome --version` |
| Java 8+ and `allure-commandline` | Only for `npm run report` | `allure --version` |

<details>
<summary>Installing them on a clean machine</summary>

```bash
# Node.js 20+
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -   # Ubuntu/Debian
sudo apt install -y nodejs
brew install node@22                                                # macOS
winget install OpenJS.NodeJS.LTS                                    # Windows

# Google Chrome
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb        # Ubuntu/Debian
brew install --cask google-chrome                                   # macOS

# Allure report viewer - optional, needed only by `npm run report`
sudo apt install -y default-jre                                     # Ubuntu/Debian
npm install -g allure-commandline
```

WebdriverIO downloads a matching ChromeDriver on its own, so nothing has to be
installed for the driver itself.

</details>

## Run

1. Open a terminal in the project root.
2. Open the automation directory, install the dependencies, and create `.env`
   from the provided example:

```bash
cd automation
npm ci
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
| `npm run report`          | Build and open the Allure report     |

The Allure results are always written to `reports/allure-results`; only
`npm run report` needs the Allure viewer to turn them into a browsable report.
Pass `ALLURE=false` to skip the reporter entirely.

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
