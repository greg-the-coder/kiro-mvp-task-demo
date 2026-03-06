# Kiro MVP Task Demo

A minimal viable product (MVP) demonstration project for Kiro's task management capabilities. This project showcases how to define, organize, and execute development tasks using Kiro's spec-driven workflow.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Kiro MVP Task Demo provides a reference implementation for teams looking to adopt Kiro's task-driven development approach. It demonstrates:

- **Spec-driven development** — Define requirements as structured specifications before writing code.
- **Task decomposition** — Break down features into discrete, actionable tasks.
- **Automated task tracking** — Let Kiro manage task state and progress throughout the development lifecycle.
- **Iterative refinement** — Use feedback loops to refine specs and tasks as requirements evolve.

## Features

- Structured task definitions with clear acceptance criteria
- Spec-to-task generation workflow
- Task dependency management
- Progress tracking and status reporting
- Integration-ready architecture

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [npm](https://www.npmjs.com/) >= 9.x or [pnpm](https://pnpm.io/) >= 8.x
- [Kiro IDE](https://kiro.dev/) (recommended) or any compatible editor
- Git >= 2.30

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-org/kiro-mvp-task-demo.git
   cd kiro-mvp-task-demo
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your project-specific settings.

4. **Verify the setup:**

   ```bash
   npm test
   ```

## Usage

### Defining a Spec

Create a new spec file in the `.kiro/specs/` directory:

```markdown
# Feature: User Authentication

## Requirements
- Users can sign up with email and password
- Users can log in with existing credentials
- Sessions expire after 24 hours

## Acceptance Criteria
- [ ] Sign-up endpoint returns 201 on success
- [ ] Login endpoint returns a valid JWT
- [ ] Expired tokens are rejected with 401
```

### Generating Tasks from a Spec

Use Kiro to parse the spec and generate actionable tasks:

```bash
# Within Kiro IDE, open the spec and use the task generation command
# Tasks will be created in .kiro/tasks/
```

### Running Tasks

Execute tasks in sequence or let Kiro manage the workflow:

```bash
npm run dev       # Start the development server
npm run build     # Build for production
npm test          # Run the test suite
npm run lint      # Lint the codebase
```

### Viewing Task Progress

Check the current state of all tasks:

```bash
# In Kiro IDE, open the Tasks panel to see status and progress
# Or inspect .kiro/tasks/ for raw task definitions
```

## Project Structure

```
kiro-mvp-task-demo/
├── .kiro/
│   ├── specs/          # Feature specifications
│   └── tasks/          # Generated and managed tasks
├── src/                # Application source code
├── tests/              # Test files
├── .env.example        # Environment variable template
├── package.json        # Project metadata and scripts
└── README.md           # This file
```

## Contributing

Contributions are welcome! Please follow these guidelines to ensure a smooth collaboration.

### Getting Started

1. **Fork the repository** and clone your fork locally.
2. **Create a feature branch** from `master`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** with clear, focused commits.
4. **Write or update tests** to cover your changes.
5. **Run the test suite** to ensure nothing is broken:

   ```bash
   npm test
   ```

6. **Push your branch** and open a Pull Request.

### Code Standards

- Follow the existing code style and conventions.
- Write meaningful commit messages (see [Conventional Commits](https://www.conventionalcommits.org/)).
- Keep pull requests focused — one feature or fix per PR.
- Add documentation for new features or changed behavior.

### Reporting Issues

- Use [GitHub Issues](https://github.com/your-org/kiro-mvp-task-demo/issues) to report bugs or request features.
- Include steps to reproduce, expected behavior, and actual behavior.
- Attach relevant logs or screenshots when possible.

### Code Review

- All PRs require at least one approving review before merge.
- Address review feedback promptly and push updates to the same branch.
- Squash commits before merging to keep the history clean.

## License

This project is licensed under the [MIT License](LICENSE).
