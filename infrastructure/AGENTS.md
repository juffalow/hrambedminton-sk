# Agents

## Project Overview

## Tech Stack

**Backend**: AWS AppSync + JavaScript resolvers
**Database**: AWS DynamoDB
**Code Quality**: ESLint + Prettier

## Project Structure

```
hrambedminton-sk/infrastructure/
|-- bin/
|-- lib/
├── test/                  # Test files
|-- cdk.context.json
|-- cdk.json
├── package.json
├── tsconfig.json
└── README.md
```

## Development Guidelines

## Environment Setup

### Development Requirements

* Node.js >= 24.0.0
* yarn >= 4.0.0

### Installation Steps

```bash
# 1. Install dependencies
yarn install

# 2. Install additional dependencies
yarn add @heroui/react loglevel zod
yarn add --dev @types/node

# 3. Start development server
yarn run dev
```

## Reference Resources

- [AWS CDK](https://aws.amazon.com/cdk/)
- [AWS DynamoDB](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-dynamodb/)
