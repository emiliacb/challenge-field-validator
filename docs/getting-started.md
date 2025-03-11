# Getting Started

## Installation

1. Clone the repository

```bash
git clone https://github.com/emiliacb/challenge-field-validator.git
cd challenge-field-validator
```

2. Install dependencies

```bash
pnpm install
```

3. Set the environment variables

Create a `.env` file in the root directory:

```bash
SCALE_BASE_URL=your_scale_base_url
SCALE_LIVE_API_KEY=your_scale_api_key
```

4. Build the project

```bash
pnpm build
```

5. Install globally

```bash
npm install -g .
```

## Usage

### Interactive Mode

Run the CLI without arguments to enter interactive mode:

```bash
field-validator
```

### Command Line Arguments

View available options:

```bash
field-validator --help
```

Run a specific script and/or output format:

```bash
field-validator --script <script-name> --output <json|html>
```

Pipe output to a file:

```bash
field-validator --pipe > output.txt
```

### Available Scripts

- `traffic-lights`: Validates traffic light annotations with pagination support
- `sheep`: Here be dragons! or sheeps?

### Output Formats

- `json`: Machine-readable validation results
- `html`: Human-readable report with visual feedback

### Development

See [CONTRIBUTING.md](./CONTRIBUTING.md) for more information.

## Piped Output Operations

### Overview

Piped output operations are a crucial feature of field-validator that follows the UNIX philosophy of tool composition.

### Why This is Relevant?

- It allows to use the tool in a pipeline with other tools
- It allows to process the output of the tool with other tools
- Is a UNIX philosophy approach to build chains of tools to achieve complex tasks

### Basic Usage

```bash
field-validator --pipe > results.json
```

### Advanced Examples

#### Print invalid results

Note: You need to have `jq` installed to use this example.

```bash
field-validator -s trafficLights -o json -p | jq '[.[] | select(.isValid == false)]'

```
