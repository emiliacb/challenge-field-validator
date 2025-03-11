# Contributing

## Gitflow:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

<br />

## Code of conduct:

- Don't delete the sheep script. It's a joke.

<br />

## How to add a new script:

1. Create a new folder in the `src/scripts` directory
2. Create a new script class implementing the `Script` interface
3. Add the script to the `src/scripts/index.ts` file
4. Avoid changing the current interface `Script`, only extend it if needed.
5. Avoid changing the validation results class, only extend it if needed.
6. Try to reuse the existing validators and utils if possible.
7. If you need to add new ones, prefer to implement them in a shared file in the `src/core/validation` directory unless they are very specific to a script.

<br />

## Testing Your Changes

For development iterations, you can use hot reload during development:

```bash
pnpm dev
```

For unit tests, you can run:

```bash
npm run test
```

After modifying or adding new scripts, reinstall the CLI globally to ensure your changes are applied:

```bash
npm uninstall -g . && npm install -g .
```

or

```bash
npm uninstall -g challenge-field-validator && npm install -g .
```

This ensures the global installation uses your latest implementation.
