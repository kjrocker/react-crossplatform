[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Introduction

This is a demo of how resources can be shared between a web and native application that uses Typescript and Lerna for rapid development and a good overall experience.

# Setting up this repo

You may need to add yarn and lerna to your global packages, if you haven't already (you should, yarn is amazing).

```
npm install -g yarn lerna
```

Clone the repo, go into the directory, and run the following command to build the project and verify the test suite.

```
yarn init && yarn test
```

### General Structure

Under our `packages` folder, we have three packages. The first, `core`, includes all our shared code and behavior (services, higher order components, etc). The `web` and `native` packages use these shared behaviors to create a web and native app, respectively.

```
packages/
| tsconfig.settings.json
| tsconfig.json
| web/
  | tsconfig.json
  | src/
  | | (typescript files)
| native/
  | (same as web)
| core/
  | (same as web)
```

Because one of these is a pure typescript library, one is a web app powered by Parcel, and one is react-native powered by Expo, every package is structured a little differently.

Generally, however, each provides a `yarn start` command that runs the project in watch mode. If you're running `core` in watch mode, changes to it will be detected by both `web` and `native`.

Each package also provides `yarn test`, `yarn test:watch`, and `yarn build`. Building the native package will require an Expo account.
