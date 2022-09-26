# project-starter

Very opinionated Node.js v16 monorepo project starter using npm workspaces and TypeScript, React + router, GraphQL (Apollo) + codegen, AntDesign, Express, TypeORM + postgres connection, ESLint + prettier.

### getting started


how to install and build client:
- npm i -w client
- npm run build in shared
- npm run build in client
- copy public folder to prod

how to install and build server:
- npm i -w server
- npm run build in shared
- npm run build in server
- copy server/build & server/node_modules & ./node_modules & ./shared/build to prod

`npm i` to install all root level development dependencies.

--> Ready to develop

`npm run migration:create -name=MigrationName`
`npm run migration:generate -name=MigrationName`
`npm run migration:run`
`npm run migration:revert` (reverts last ran migration)

Install an npm package

`npm i aws-sdk -w server`