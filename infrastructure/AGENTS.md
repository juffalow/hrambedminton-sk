# Agents

## Project Overview

AWS CDK infrastructure for the Badminton Match Planner application. Deploys:
* AWS AppSync GraphQL API
* AWS DynamoDB table (single-table design)
* AWS Lambda functions (if needed for custom resolvers)
* AWS Cognito (for user management)

## Tech Stack

**Backend**: AWS AppSync + JavaScript resolvers
**Database**: AWS DynamoDB
**Authentication**: Cognito
**Code Quality**: ESLint + Prettier

## Project Structure

```
hrambedminton-sk/infrastructure/
├── bin/
│   └── hrambedminton-sk.ts    # CDK app entry point
├── lib/
│   ├── graphql/               # schema and resolvers
│   ├── lambdas/               # Lambda functions
│   ├── stacks/                # CDK stacks
│   │   └── ApiStack.ts
│   │   └── AuthStack.ts
│   │   └── DatabaseStack.ts
│   ├── types/                 # TypeScript types
│   │   ├── Region.ts
│   │   └── Stage.ts
│   └── utils/                 # Utility functions
│       └── index.ts
├── test/                      # Test files
├── cdk.context.json
├── cdk.json
├── eslint.config.mjs
├── jest.config.js
├── package.json
├── tsconfig.json
├── yarn.lock
└── README.md
```

## Development Guidelines

* Use TypeScript for all CDK code
* Follow single-table design for DynamoDB
* Use JavaScript resolvers for AppSync
* Tag all resources with `project: hrambedminton-sk`

### AppSync Resolver Constraints

* No regex literals (use string methods instead)
* Limited standard library
* Must use @aws-appsync/utils package

### Lint AppSync resolvers

```bash
yarn run lint:appsync
```

### Evaluate AppSync resolvers code

```bash
aws appsync evaluate-code \
  --code file://lib/graphql/resolvers/createGuestEvent.js \
  --function request \
  --context file://test/contexts/createGuestEvent-context.json \
  --region eu-central-1 \
  --runtime name=APPSYNC_JS,runtimeVersion=1.0.0
```

## Environment Setup

### Development Requirements

* Node.js >= 24.0.0
* yarn >= 4.0.0

### Installation Steps

```bash
# 1. Install dependencies
yarn install

# 2. Install additional dependencies
yarn add --dev @types/node aws-cdk aws-cdk-lib constructs
```

## CDK Commands

* `yarn cdk synth` - Synthesize CloudFormation template
* `yarn cdk diff` - Compare deployed stack with current state
* `yarn cdk deploy` - Deploy stack to AWS
* `yarn deploy:all` - Deploy all stacks
* `yarn cdk destroy` - Remove stack from AWS

## Reference Resources

- [AWS CDK](https://aws.amazon.com/cdk/)
- [AWS DynamoDB](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-dynamodb/)
