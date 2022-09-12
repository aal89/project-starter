# project-starter

Very opinionated Node.js v16 monorepo project starter using npm workspaces and TypeScript, React + router, GraphQL (Apollo) + codegen, AntDesign, Express, TypeORM + postgres connection, ESLint + prettier.

### getting started

`npm i` to install all root level development dependencies.

--> Ready to develop

`npm run migration:create -name=MigrationName`
`npm run migration:run`
`npm run migration:revert` (reverts last ran migration)

Install an npm package

`npm i aws-sdk -w server`