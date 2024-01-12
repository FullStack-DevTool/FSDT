# 🧑‍💻 Introduction

### You are the chosen one!

First of all, thank you for considering contributing to FSDT project. It's people like you that can make FSDT a wonderful application for improving the development experience.

### Why should you read these guidelines?

Adhering to these principles demonstrates your consideration for the valuable time invested by the developers who oversee and contribute to this open-source project. In response, they are expected to reciprocate this respect by addressing your concerns, evaluating modifications, and assisting you in completing your pull requests.

### What kinds of contributions are we looking for?

FSDT is an open source project created by developers for developers. You can contribute by proposing **new features**, improving the **documentation**, submitting **bug reports** or **writing code** which could be integrated to our project.

### Responsibilities

- For new major changes, open issues to talk with the community and get feedbacks.
- Ensure the code is clean and readable by anyone. If necessary, don't hesitate to put comments to explain your implementation.
- Implement the tests related to your code. For the moment, the codebase isn't enough test covered, but we want to improve this part in the future.
- Keep the feature as small as possible: it will enhance the review and bring more composability regarding the versionning.
- Be respectful between each of us, new contributors should be encouraged whatever their background.

# 🚀 Getting started

### Technical requirements

- Yarn: This project is a monorepo and use [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/).
- Node.js (>=18.16.1)

### How to start the project?

First of all, you should install the dependencies 📗.

```bash
yarn install
```

You need to build the SDK since it's used by the FSDT console.

```bash
yarn build:sdk
```

Run the following command to start the console.

```bash
yarn app:start
```

If you update the SDK, you will certainly need to test your changes. To do so, I invite you to download the [example project](https://github.com/FullStack-DevTool/demo-repository). To link this project with your local SDK folder, you should run the following command in `packages/sdk`:

```bash
yarn link
```

In the project example, you should run the following command to achieve the link:

```bash
yarn link @fullstack-devtool/sdk
```

### Specificities

#### @fullstack-devtool/app

In dev mode, you will need to create a .env file in `packages/app` directory.
In this file, you should define these values:

```python
FSDT_PORT=1234 # Default port to run the server on
ACTIVE_TERMINAL=true # (optional) You should remove it if you don't want to open the chrome console when the FSDT app is starting

```

# How to submit a contribution?

1.  Create your own fork of the code
2.  Do the changes in your fork
3.  If you like the change and think the project could use it, you should submit your PR.
    > 💡 Before submitting:
    >
    > - Ensure you have followed the code style for the project.
    > - Ensure you didn't commit local files
    > - Ensure you put a good description while respecting the template

# How to report a bug

If you find a security issue or a critical vulnerability and reporting it in public would impose risk – please feel free to send us a message to <INSERT_EMAIL>.

# How to suggest a feature or enhancement

If you think a new feature would be relevant to add to FSDT application, you should open an issue on our issues list on Github. It should describe the feature you would like to see, why you need it and how it should work.

Don't hesitate to take a look to the [roadmap](INSERT_ROADMAP_LINK) to see if your proposal isn't already planned.

# Code review process

The core team takes a look at Pull Requests list many times a week, your PR should be treated quickly. We are open to discussion so if we give some feedbacks, don't hesitate to challenge them. However, after some weeks with no activity, we may close the PR because we would assume that you aren't able to finish it. Obviously, you are free to recreate it later, when you will have more time to work.

# Commit message convention

Since we are currently using Release-Please to automate the release of our packages, you should follow the [conventional commit rules](https://www.conventionalcommits.org/en/v1.0.0/). <br>

> ⚠️ If your change should be released in a new version, you should use the following perfixes :
>
> - `fix:` which represents bug fixes, and correlates to a SemVer patch.
> - `feat:` which represents a new feature, and correlates to a SemVer minor.
> - `feat!:, or fix!:`, `refactor!:`, `etc.`, which represent a breaking change (indicated by the `!`) and will result in a SemVer major.

> Eg. <br> `feat(sdk): add new feature`
>
> The word between parenthesis represents the scope. If your update is related to a specific package, you should use one of these following scopes: `sdk` - `app` <br>
> If your update is cross-package, you shouldn't use a scope. Your commit message would be: <br> `feat: add new feature`

# Code style

ESLint and prettier are used for checking / enforcing the code style.

camelCase should be used to name the variables and the functions.

PascalCase should be used for react components and classes.

# Labelling convention

For the moment we use the default github labels, but you are free to propose new labels if you think it's relevant.

# Community

We will certainly open a Discord server in the future, so stay tuned!
