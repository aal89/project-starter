# project-starter

Very opinionated Node.js v16 monorepo project starter using npm workspaces and TypeScript, React + router, GraphQL (Apollo) + codegen, AntDesign, Express, TypeORM + postgres connection, ESLint + prettier.

## Development setup

### Dependencies

`npm i` in the root and let npm workspaces install everything everywhere.

### Un/installing a dependency

Install: `npm i aws-sdk -w server`
Uninstall: `npm uninstall aws-sdk -w server`

### Development scripts

#### Start

Start client
```
$ npm run start -w client
```

Start server
```
$ npm run start -w server
```

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

