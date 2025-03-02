# Field Validator CLI

A command-line interface tool for validating annotations in built for the field engineering team.

## Documentation

- [Getting Started](./docs/GETTING_STARTED.md)
- [Goals and Next Steps](./docs/goals-and-next-steps.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Challenge](./docs/CHALLENGE.md)

## Features

- Validate annotations against predefined modular rules
- Multiple output formats (JSON, HTML)
- Interactive CLI menu for script selection
- Support for output piped operations
- Pagination support for large datasets based on generator functions
- Highly scalable and modular design

## Project Structure

- `/src`: Source code
  - `/cli`: CLI-related functionality
  - `/core`: Core validation logic shared by all scripts
  - `/lib`: Shared utilities and interfaces
  - `/scripts`: Individual validation scripts
- `/docs`: Documentation
- `/bin`: Executable files (not tracked)
- `/results`: Results output directory (not tracked)
