# arrows-svg-svelte
`arrows-svg-svelte` provides svelte actions for arrows-svg(todo: add link to arrows-svg)

## Usage

Define an identifier for your arrow

```ts
const id = 'someId';
```

The assign source and destinations elements. 

```svelte
<p use:arrowSrc={id}>Arrow from</p>
<p use:arrowDest={id}>Arrow to</p>
```

Each arrow ID can only have 1 source, but multiple destinations

## Dev
to start development run the following commands (in 3 different terminals)
```
// Install dependencies
npm install
// Runs the dev environment with a vite + svelte single page application to test on
npm run dev
// Creates the distributable (Run at least once before publishing)
npm run build
// Provides CSS (Processes the source code to create a minified css)
npm run tailwind
```

