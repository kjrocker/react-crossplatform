# Lerna + Project References

This is a demo of how resources can be shared between a web and native application that uses Typescript and Lerna for rapid development and a good overall experience.

# Setting up this repo

### General Structure

Under our `packages` folder, we have three packages. The first, `core`, includes all our pure JS shared code and behavior (services, higher order components, etc). The `web` and `native` packages use these shared behaviors to create a web and native app, respectively.

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

Generally, however, each provides a `yarn start` command that runs the project in watch mode. Both `web` and `native` will pick up on changes to `core` if all the packages are running simultaneously.

#### `tsconfig.settings.json`

```js
{
    "compilerOptions": {
        // Always include these settings
        "composite": true,
        "declaration": true,
        "declarationMap": true,
        "sourceMap": true,

        // These settings are totally up to you
        "esModuleInterop": true,
        "target": "es5",
        "module": "commonjs",
        "strict": true
    }
}
```

This file contains the "default" settings that all packages will use for compilation. You will definitely want the `composite`, `declaration`, `declarationMap`, and `sourceMap` settings enabled for all projects, so include those in this file. Other settings, like `target` and `strict`, can be specified here if you'd like to enable them by default. You'll also be able to override these settings on a per-package basis if needed.

#### `tsconfig.json`

```json
{
  "files": [],
  "references": [{ "path": "web" }, { "path": "native" }, { "path": "core" }]
}
```

This file is pretty simple - simply list the packages that need to be built with `tsc` in the `references` array.
You should also include `"files": []` in this file - this will prevent an incorrect invocation of `tsc` without `-b` from trying to build the entire packages folder source files as one compilation (which will fail, but drop a bunch of .js files in random places as an annoying side effect).

#### `packages/native/tsconfig.json`

We'll just cover one of the `web` / `native` / `core` packages since they're basically identical for the purposes of this demo. Here's `native`'s `tsconfig.json`:

```json
{
  "extends": "../tsconfig.settings.json",
  "compilerOptions": {
    "outDir": "lib",
    "rootDir": "src"
  },
  "references": [{ "path": "../web" }]
}
```

The `extends` property pulls in the settings we wrote in `tsconfig.settings.json`, so we don't have to duplicate any settings described there.

In `compilerOptions`, we've set `outDir` to `lib` and `rootDir` to `src`, then placed all my `.ts` files in `src`. This means `src/index.ts` will build to `lib/index.js` and `lib/index.d.ts`. This is also the place where you could override settings like `strict` or `target` if you needed to change them on a per-project basis.

In the `references` array, we list the paths to the other projects' `tsconfig.json` files (or containing folders, as shown here). This will both ensure that we locate the `.d.ts` files correctly, and set up a proper build ordering.

#### `packages/native/src/index.ts`

```ts
import * as p1 from '@kjrocker/web';

export function fn4() {
  p1.fn();
}
```

Nothing unusual going on here. We import and export with the usual syntax. Notably, if you open this repo in an editor, you can still "Go to Definition (F12)" on `p1.fn` here and land in `web/foo.ts` - the original sourcecode - even though "under the covers" it's using the much faster `.d.ts` file for typechecking.

#### `packages/native/package.json`

Here are the relevant excerpts from the `package.json`:

```json
{
  "main": "lib/index.js",
  "typings": "lib/index.d.ts",
  "scripts": {
    "prepublishOnly": "tsc -b ."
  },
  "devDependencies": {
    "typescript": "^3.0.0-dev.20180626"
  }
}
```

Because we build to `lib`, we need to set `main` to the `.js` file there _and_ `typings` to the `.d.ts` file.

In `scripts`, we use the local copy of `tsc` (listed here as a dev dependency) to run a _build mode_ compilation on the project. This will ensure that the `lib` folder is always built before `npm publish`, and blocks any publishes that try to push non-compiling code.

### Testing

All three modules ship with a `test` and `test:watch` command to manage their jest configurations. Enzyme is included in `core` only, while `web` and `native` just use `react-test-renderer`. This is because 1) Enzyme is a bitch to get running with Expo and 2) If I can't get it in both `web` AND `native`, then I don't want it in either of them to start with.

# Workflow

All your lerna commands and workflow will work as expected here.

To build the TypeScript projects, you can run individual builds with `tsc -b`:

```
 > tsc -b packages/core
```

Or just build everything:

```
 > tsc -b packages
```
