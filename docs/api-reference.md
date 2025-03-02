# API Reference

## Command Line Interface

The Field Validator CLI provides a flexible interface for validating annotations with various output options.

### Options

| Option     | Alias | Description                                | Default                            |
| ---------- | ----- | ------------------------------------------ | ---------------------------------- |
| `--script` | `-s`  | Specifies which validation script to run   | Interactive prompt if not provided |
| `--output` | `-o`  | Sets the output format (json or html)      | Interactive prompt if not provided |
| `--pipe`   | `-p`  | Pipes the output instead of saving to file | `false`                            |

### Interactive Mode

If you run the CLI without options, it will enter interactive mode where you can:

1. Select a validation script from the available options
2. Choose an output format (JSON or HTML)

### Output Formats

The CLI supports two output formats:

- **JSON**: Machine-readable format suitable for further processing
- **HTML**: Human-readable report with visualization of validation results
