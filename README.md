# Mock Files NestJs

Mock Files NestJs: Files/Images with action Upload/Download

## Instruction
- Use: rename file `.env.sample` to `.env` and edit configure yourself
- Docs: [http://localhost:[port]/docs](http://localhost:[port]/docs)
- Private folder: for upload/download documents
- * Request: [http://localhost:[port]/api/attachments](http://localhost:[port]/api/attachments) => Response ("path": "/documents/[filename]")
- Public folder: for upload/show images
- * Request: [http://localhost:[port]/api/images](http://localhost:[port]/api/images) => Response ("path": "/static/images/[filename]")
- * Public link: [http://localhost:[port]/static/images/[filename]](http://localhost:[port]/static/images/[filename])
- Logs: check logs in folder `logs`

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Build

```bash
# build
$ yarn build
```