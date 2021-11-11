[![Piral Logo](https://github.com/smapiot/piral/raw/develop/docs/assets/logo.png)](https://piral.io)

# [Piral Sample](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

> single-spa using Piral

:zap: Using the Piral Feed Service for single-spa applications

This example takes sample code from single-spa (found here [github.com/react-microfrontends](https://github.com/react-microfrontends)) and uses the Piral Feed Service instead of some customly created and hosted importmap.

**Note**: Originally, all of the directories (or packages) have been in dedicated repositories. This can (and should be!) done here, too, however, for simplicity we kept everything in a single repository (but not a mono repo, just multiple NPM packages in a single repository).

## Differences

Each microfrontend defines the shared dependencies that appear in the final importmap. In the *package.json* you'll find:

```json
"piletDependencies": {
  "react": "https://cdn.jsdelivr.net/npm/react@17.0.1/umd/react.production.min.js",
  "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@17.0.1/umd/react-dom.production.min.js",
  "rxjs": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@6.6.3/system/es2015/rxjs.min.js",
  "rxjs/operators": "https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs@6.6.3/system/es2015/rxjs-operators.min.js",
  "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.8.2/lib/system/single-spa.min.js"
},
```

To be considered only one microfrontend would need to define that. However, it makes sense to duplicate this information due to the following reasons:

- Even though Single SPA usually only deals with a single microfrontend composition in general we don't know what microfrontends are considered - it could be only the one you have at hand... In this case no other defined `piletDependencies` will be used to assemble the importmap
- Other microfrontends may want to update - a majority vote ensures that in case of conflicting sources the majority of microfrontends will still work
- The shared dependencies are no longer some mystery coming from a single microfrontend

Additionally, the Piral CLI has been installed in the `devDependencies`.

```json
"devDependencies": {
  // ...
  "piral-cli": "0.14.0",
},
```

In order to work correctly the `main` field has to be correctly specified. It must point to the bundled / processed file that should be used later. For instance, for the `styleguide` microfrontend we have:

```json
"main": "dist/single-spa-example-styleguide.js",
```

The name of the file has been specified in the Webpack configuration *webpack.config.js*.

In the *index.ejs* of `root-config` (i.e., the app shell) the path to the importmap has been changed. It now uses the `URL` environment variable or falls back to a standard importmap.

The last difference is that we used "classic" NPM instead of PNPM. This, however, is only a matter of taste and has no technical motivation. Either one would / should work.

## Usage

Each package first needs to resolve its dependencies:

```sh
npm i
```

Then we can build it to get the corresponding ESM for use in the browser:

```sh
npm run build
```

At this point we can publish the ESM to use it in the central app shell.

The easiest way to publish the ESM microfrontend is to just create the NPM package via `npm pack` and then use the Piral CLI for publishing.

```sh
npm pack
npx pilet publish --url <feed-url> --api-key <feed-key>
rm *.tgz
```

Finally, the tarball is removed to clean up the directory. This avoids bundling in the tarball in packages and helps the Piral CLI to choose the right file as there will only be one tarball in the working directory.

## Demo

For demonstration purposes you can run the `publish.sh` script. Make sure to modify it beforehand, replacing the values for `URL` and `API_KEY` to values pointing to *your* feed and an API key that you generated.

The script will build and publish every microfrontend. Finally, the app shell is run via some lightweight HTTP server. You can reach the solution at [http://localhost:9000](localhost:9000).

## Advantages

Using a sophisticated and dedicated service for the importmap has some nice advantages. You'll get:

- Rollback functionality
- Overview of what is published by who
- Possibility of auto managing / declaring shared dependencies
- Possibility of request-based rules (e.g., for A/B testing of microfrontends)
- API keys / publish rights per team (with revocation)

While a self-assembled JSON file is sufficient to get going, a dedicated service allows professionalizing the microfrontend solution.

## License

Piral and this sample code is released using the MIT license. For more information see the [license file](./LICENSE).
