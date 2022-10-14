# project-starter

Very opinionated Node.js v16 monorepo project starter using npm workspaces, TypeScript, React + router, GraphQL (Apollo) + codegen, AntDesign, Express, TypeORM + postgres connection, ESLint + prettier, GitHub Actions for CI and AWS S3 for storage solutions.

## Development setup

### Dependencies

`npm i` in the root and let npm workspaces install everything everywhere.

### Un/installing a dependency

Install: `npm i aws-sdk -w server`  
Uninstall: `npm uninstall aws-sdk -w server`

This most likely throws an error, something along the lines of "cannot set 'dev' on null". This is an npm bug, everything should just work and be un/installed.

#### server setup

Follow these steps to setup and develop the server:
1) Install docker and pull in a postgres image.
2) Run postgres container
3) Copy .env.default to .env and set values to your liking
4) Create database named 'test' (or w/e you called it in your .env file)
5) Run migration to setup database and seed it
6) Optionally set synchronize to true to develop quicker (use migration:generate after changes to automatically generate migrations)

After, you can start server with:

```
$ npm run start -w server
```

The `-w server` is optional. You can also just start the product with the start script directly in the server directory.

#### client setup

Before developing the client you should build the shared module. The current babel config for react-scripts does not have loaders for externally included typescript (outside of /src). So, to include the shared module you first have to build it and then include the js.

In the root of the project run:

```
$ npm run build -w shared
```

Remember that if you make changes to the shared lib that you have to rebuild the shared library in order for you to import it in the client.

After, you can start client with:

```
$ npm run start -w client
```

The `-w client` is optional. You can also just start the product with the start script directly in the client directory.

#### Migrations

To create a new blank migration run `migration:create`. To generate a migration based on changes made to the model run `migration:generate`.

To revert the latest migration run `migration:revert`.

To execute all the migrations run `migration:run`.

```
$ npm run migration:create -name=MigrationName
$ npm run migration:generate -name=MigrationName
$ npm run migration:run
$ npm run migration:revert
```

## Build

### Client
```
$ npm i -w client
$ npm run build -w shared
$ npm run build -w client
```
then copy `client/build` folder to prod server

### Server
```
$ npm i -w server
$ npm run build -w shared
$ npm run build -w server
```
then copy `server/build` & `server/node_modules` & `./node_modules` & `./shared/build` to prod server

