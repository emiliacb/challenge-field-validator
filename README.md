# Field Validator CLI

A command-line interface tool for validating annotations in built for the field engineering team.

## Documentation

- [Getting Started](./docs/GETTING_STARTED.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Challenge](./docs/CHALLENGE.md)

## Features

- Validate annotations against predefined modular rules
- Multiple output formats (JSON, HTML)
- Interactive CLI menu for script selection
- Support for output piped operations
- Pagination support for large datasets based on generator functions
- Highly scalable and modular design

### TODO

- Use the generator functions approach to enable piped inputs too. For example, `cat data.json | field-validator --script trafficLights` where the cat command is used to read the data.json file and pipe it to the field-validator command to validate the annotations.
- Add unit tests. In this case is crucial to mantain the repo due to its modular nature.
- Show the images with the annotations in the HTML report.
- Implement react or vue for the report to make it more scalable.
- In a real scenario we could register this package in a private npm registry.

## Project Structure

- `/bin`: Executable files
- `/docs`: Documentation
- `/results`: Results directory
- `/src`: Source code
  - `/cli`: CLI-related functionality
  - `/core`: Core validation logic shared by all scripts
  - `/lib`: Shared utilities and interfaces
  - `/scripts`: Individual validation scripts
