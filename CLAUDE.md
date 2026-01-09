# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Badminton game planner application. Players can create events and invite other players (registered users or guests). Events support singles (1v1) or doubles (2v2) matches, with multiple courts running simultaneously.

## Project Structure

```
hrambedminton-sk/
├── webapp/           # React 19 frontend
├── infrastructure/   # AWS CDK backend (AppSync + DynamoDB)
└── docs/             # Documentation (DATABASE.md)
```

## Development Commands

### Webapp (frontend)

```bash
cd webapp
yarn install
yarn dev              # Start development server (http://localhost:5173)
yarn build            # Production build
yarn typecheck        # Run TypeScript type checking
yarn lint             # Run ESLint
yarn prettier:check   # Check formatting
yarn prettier:write   # Fix formatting
```

### Infrastructure (backend)

```bash
cd infrastructure
yarn install
yarn build            # Compile TypeScript
yarn test             # Run Jest tests
yarn lint             # Run ESLint
yarn cdk synth        # Synthesize CloudFormation template
yarn cdk diff         # Compare with deployed stack
yarn cdk deploy       # Deploy to AWS
yarn deploy:all       # Deploy all stacks
```

## Tech Stack

- **Frontend**: React 19, TypeScript, React Router 7, HeroUI, Tailwind CSS, AWS Amplify
- **Backend**: AWS AppSync (GraphQL), AWS DynamoDB (single-table design), AWS CDK
- **Auth**: AWS Cognito (via Amplify)
- **i18n**: i18next with language detection

## Architecture

### Frontend (webapp/app/)

- `api/` - GraphQL client and auth services (uses urql)
- `components/` - Reusable UI components
- `routes/` - Page components (React Router file-based routing)
- `hooks/` - Custom hooks (useAuth, useTracking)
- `locales/` - Translation JSON files
- `types/` - TypeScript type definitions

### Backend (infrastructure/lib/)

- `stacks/` - CDK stack definitions
- `types/` - Region and Stage type definitions
- Uses single-table DynamoDB design with GSI

### Database Design

Single-table DynamoDB with composite keys using `#` delimiter:
- User: `PK: user#<id>`, `SK: user#<id>`
- Event: `PK: event#<id>`, `SK: event#<id>`, with GSI for owner queries
- EventPlayer: Links events to users/guests with team assignment

Attributes use camelCase. Entity prefixes are lowercase (user#, event#, guest#, email#).

## Code Style

- Use single quotes, semicolons, strict equality (===)
- 120 character line limit, trailing commas in multiline literals
- PascalCase: Components, Types, Interfaces
- camelCase: Variables, functions, hooks, props
- UPPERCASE: Environment variables, constants
- Prefix: `handle*` for event handlers, `is*/has*/can*` for booleans, `use*` for hooks

## Requirements

- Node.js >= 24.0.0
- Yarn >= 4.0.0
