# challenge-field-validator

Scale AI Challenge

## Usage

Install dependencies

```bash
pnpm install
```

Build the project

```bash
pnpm build
```

Install the cli globally

```bash
npm install -g .
```

Run the cli with the help flag to see the available options

```bash
field-validator --help
```

Run directly to see the menu and select an script

```bash
field-validator
```

Run the cli with a specific script and output format

```bash
field-validator --script <script-name> --output <output-format>
```

Run the cli and pipe the output to a file while running the script

```bash
field-validator --pipe > output.txt
```
