[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Introduction

This is a demo of using a monorepo for code-sharing across a full-stack Typescript application.

# Setting up this repo

You may need to add lerna to your global packages, if you haven't already (you should, yarn is amazing).

```
npm install -g lerna
```

Clone the repo, go into the directory, and run the following command to build the project and verify the test suite.

```
npm run init && npm test
```

### General Structure

Under our `packages` folder, we have five packages. The first, `core`, includes all our shared code and behavior (services, higher order components, etc). The `web` and `native` packages use these shared behaviors to create a web and native app, respectively. The `server` and `serverless` packages provide two flavors of Typescript backend. `serverless` is built using the Serverless library, for deployment to AWS Lamda, Google Cloud Functions, or Azure Functions. `server` is built using Express, and is for running a complete web server.

```
packages/
| tsconfig.settings.json
| tsconfig.json
| {package}/
  | tsconfig.json
  | package.json
  | src/
  | | (typescript files)
```

Because one of these is a pure typescript library, one is a web app powered by Parcel, one is react-native powered by Expo, one is a Serverless package for deployment to a swarm of cloud functions, and one is an express server, it goes without saying that each library is just a _little_ bit different.

Generally, however, each provides a `npm start` command that runs the project in watch mode. If you're running `core` in watch mode, changes to it will be detected by any other packages that are also running in watch mode.

Each package also provides `npm test`, `npm run test:watch`, and `npm run build`. The `build` command will always produce build artifacts in the `dist` directory of the package. Building the native package will require an Expo account.
