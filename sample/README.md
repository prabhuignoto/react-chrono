# React Chrono Sample App

This is a sample application demonstrating the features of the [react-chrono](https://github.com/prabhuignoto/react-chrono) library.

## Features

- Demonstrates horizontal, vertical, and vertical alternating timelines
- Shows slideshow capability
- Supports different themes
- Responsive design
- Interactive timeline manipulation

## Running the App

### Option 1: Using the shell script

The easiest way to run the sample app is to use the provided shell script:

```
./start.sh
```

This will:

1. Install dependencies for the sample app
2. Build the main react-chrono library using rollup
3. Start the development server

### Option 2: Manual setup

1. Build the main react-chrono library:

   ```
   # From the root directory
   pnpm rollup
   ```

2. Install dependencies for the sample app:

   ```
   # From the sample directory
   pnpm install
   ```

3. Start the development server:
   ```
   # From the sample directory
   pnpm start
   ```

### Option 3: All-in-one command

A convenience script is provided in package.json:

```
# From the sample directory
pnpm dev
```

This will build the main library and then start the sample app.

## Structure

- `src/App.tsx`: Main application component
- `src/data.ts`: Sample timeline data
- `src/types.ts`: TypeScript type definitions
- `src/index.css`: Global styles

## Notes

This sample app uses the built version of react-chrono from the dist folder, not the source code. This ensures you're testing the exact same code that would be used by consumers of the library.
