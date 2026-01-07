# Agents

## Project Overview

## Tech Stack

**Frontend Framework**: React 19 + TypeScript
**UI Components**: HeroUI
**Styling**: Tailwind CSS
**Code Quality**: ESLint + Prettier

## Project Structure

```
hrambedminton-sk/webapp/
├── public/                 # Static assets
│   ├── favicon.png
│   └── robots.txt
├── app/
|   |-- api/               # API services
│   ├── components/        # Reusable components
│   ├── routes/            # Page components
│   ├── hooks/             # Custom Hooks
│   ├── locales/           # Translation files
│   ├── logger/            # Logger
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
|   |-- app.css
|   |-- constants.ts       # Constants
|   |-- hero.ts
|   |-- i18n.ts
│   ├── root.tsx
│   └── routes.tsx
├── tests/                 # Test files
├── docs/                  # Project documentation
├── .env.example          # Environment variables example
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Development Guidelines

### Component Development Standards

1. **Function Components First**: Use function components and Hooks
2. **TypeScript Types**: Define interfaces for all props
3. **Component Naming**: Use PascalCase, file name matches component name
4. **Single Responsibility**: Each component handles only one functionality

### Code Implementation Guidelines

#### Planning Phase

* Begin with step-by-step planning
* Write detailed pseudocode before implementation
* Document component architecture and data flow
* Consider edge cases and error scenarios

#### Code Style Standards

* Use spaces for indentation
* Use single quotes for strings (except to avoid escaping)
* Use semicolons
* Eliminate unused variables
* Add space after keywords
* Add space before function declaration parentheses
* Always use strict equality (===) instead of loose equality (==)
* Space infix operators
* Add space after commas
* Keep else statements on the same line as closing curly braces
* Use curly braces for multi-line if statements
* Always handle error parameters in callbacks
* Limit line length to 120 characters
* Use trailing commas in multiline object/array literals

### Naming Conventions

#### General Rules

* PascalCase for: Components, Type definitions, Interfaces
* camelCase for: Variables, Functions, Methods, Hooks, Properties, Props
* UPPERCASE for: Environment variables, Constants, Global configurations

#### Specific Naming Patterns

* Prefix event handlers with 'handle': handleClick, handleSubmit
* Prefix boolean variables with verbs: isLoading, hasError, canSubmit
* Prefix custom hooks with 'use': useAuth, useForm
* Use complete words over abbreviations

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

- [React Official Documentation](https://react.dev/)
- [Vite Official Documentation](https://vitejs.dev/)
- [TypeScript Official Documentation](https://www.typescriptlang.org/)
- [React Router Documentation](https://reactrouter.com/)
- [HeroUI](https://www.heroui.com/)
