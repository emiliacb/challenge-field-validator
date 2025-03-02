# Goals and Next Steps

## Project Goals

- The original challenge was to create a script, but as we discussed in the interview, my goal was creating a extra mile to show how I think this type of system could be handled in a scalable way. But also being clear and documented enought to be able to include it in any engineering team pipeline.
- This solution has two extra features: the CLI wrapper and the html report.
- The benefits of having a CLI wrapper are:

  - We can quickly run scripts in local.
  - We can reuse code for different types of quality checks. Resulting in a more robust and predictable system than a single script.
  - We can mantain the same input and output for different scripts, while maintaining a Unix-like philosophy, that allows us to chain scripts together with other tools.

## Current Status

- The basic CLI and script of the challenge are complete.
- The Unix philosophy is applied to the output when we add the --pipe flag. The code is prepared to add input piped in the future thanks to the generator functions approach.
- The html report is useful to visualize the results of the quality check, just showing the warnings and errors, with links to the task to perform a manual review with ease.

## Next Steps

**Quality Checks**

- We could implement a small LLM like Moondream to check the quality of the task responses. Being able to run locally with Ollama.

**Technical**

- Retry if a request fails.
- Use the generator functions approach to enable piped inputs too.
- Add unit tests. In this case is crucial to mantain the repo due to its modular nature.
- Show the images with the annotations in the HTML report.
- Implement react or vue for the report to make it more scalable.
- In a real scenario we could register this package in a private npm registry.
- Snapshot for resuming the script in case of failure.
- Cloud deployment with SST. Allowing us to run the scripts in a serverless environment.
