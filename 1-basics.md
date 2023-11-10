# SvelteKit Basics

---

## Generate a new project

---

### Project setup

---

```bash
npm create svelte@latest svelte-music-player
```

---

```bash
◆  Which Svelte app template?
│  ○ SvelteKit demo app
│  ● Skeleton project (Barebones scaffolding for your new SvelteKit app)
│  ○ Library project
```

---

```bash
◆  Add type checking with TypeScript?
│  ● Yes, using JavaScript with JSDoc comments
│  ○ Yes, using TypeScript syntax
│  ○ No
```

---

```bash
◆  Select additional options (use arrow keys/space bar)
│  ◼ Add ESLint for code linting
│  ◼ Add Prettier for code formatting
│  ◼ Add Playwright for browser testing
│  ◼ Add Vitest for unit testing
```

---

```bash
Next steps:
  1: cd svelte-music-player
  2: npm install (or pnpm install, etc)
  3: git init && git add -A && git commit -m "Initial commit" (optional)
  4: npm run dev -- --open
```

Note:

- using JS over TS as this is an intro to SvelteKit rather than TS
- we will still be using JSDoc for some autocompletion
- The library project allows you to quickly build an npm package for svelte/sveltekit

---

## Project Setup for this Workshop

```bash
git clone git@github.com:mainmatter/svelte-workshop-music-player.git
git checkout main
```

---

# Getting started with SvelteKit

---

## Structure of a blank SvelteKit project

```md
├── jsconfig.json
├── package.json
├── playwright.config.js
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── index.test.js
│   └── routes
│   └── +page.svelte
├── static
│   └── favicon.png
├── svelte.config.js
├── tests
│   └── test.js
└── vite.config.js
```

Note:

"jsconfig.json" - JS configuration including how the app handles or doesn't handle typing with JSDoc.

"package.json" - references to all of the packages and the general app information like "name" and "version".

"playwright.config.js" - Playwright configuration including which commands to run and which ports to run on.

- expects tests in "tests" folder - we will speak a little bit more about that later.

Skipping "src" for now

"static" - assets that needs to be served and would be wasteful to make an entire endpoint just for them like the favicon or things like "robots.txt"

"svelte.config.js" - where we can configure our app in different ways,

- aliases to make imports easier,
- adapters - will take a production build and tune it for our target environment.
- node
- vercel
- netlify
- static

"tests" - created by Playwright

- where we store all of our Playwright tests
- this will be expanding as we go through this workshop and begin to add more functionality.

"vite.config.js" - where we define vote specific configuration like plugins and setup for Vitest

back to "src" - the majority of our app code will go,

- we can split it into components, stores, routes and any other folders or files we might find useful later on. The only required files are app.html and routes

"app.d.ts" - define our types if we wanted,

- just by the fact that our JS only app has a types file, you can tell that Svelte loves

---

src/app.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width" />
		%sveltekit.head%
	</head>

	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

Note:

"app.html" - the entry point for our whole app,

- looks like a fairly standard HTML page. There are just a few things that stick out, all of which allow sveltekit to take over during the compile step and add the correct paths:
  "%sveltekit.assets%" - the assets are stored, in our case it defaults to the "static" folder.
  "%sveltekit.head%" - adds a portal so that we can add "head" information from anywhere in the app.
  "%sveltekit.body%" - where the rest of our app will be output.
  "%sveltekit.env.[NAME]%" - gets replaced with the environment variable

---

## Structure of a blank SvelteKit project

```md
├── jsconfig.json
├── package.json
├── playwright.config.js
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── index.test.js
│   └── routes
│       └── +page.svelte
├── static
│   └── favicon.png
├── svelte.config.js
├── tests
│   └── test.js
└── vite.config.js
```

Note:

"index.test.js" - created by Vitest

- is one option for how to structure your tests,
- Vite and Vitest can be configured to look at any part of the app for the component tests,
- some find it harder to distinguish between the app code and the test code in this situation and so prefer to put it in a separate folder.
- there is no right or wrong way to do this so it's just down to preference.

"src/routes" - one of the strengths of SvelteKit,

- the folder routing structure means that we can group routes together and house logic right next to where it is used
- every new "+page.svelte" file will reflect a new route with the name of its folder
- (there are some exceptions to this but we will explore them later).

"+page.svelte" file directly in the "routes" folder - this is the index page,

- can access by navigating to the root URL of our dev server.

---

### Command cheatsheet

```bash
# Run the development server
npm run dev

# Run the Playwright tests
npm run test

# Run the Playwright tests with the UI
npm run test -- --ui

# Run the Vitest tests
npm run test:unit
```

Note:

- get stuck in and run the dev server
- if you try to run the playwright server you may be prompted to complete the installation and setup
- running `-- --ui` will open the Playwright UI, we have configured this to allow us to see our updates - do not use this in production!

---

## Our first route

`+page.svelte`

---

🧑‍💻 src/routes/+page.svelte

```svelte
<script>
	const name = 'Billy Bloggs';
</script>

<h1>Welcome to The Svelte Music Player</h1>

<p>
	{name}, it's great to see you again!
</p>
```

Note:

- add the `name` constant in our +page.svelte file.
- use curly braces to access it in the markup

---

### Command cheatsheet

```bash
# Run the development server
npm run dev

# Run the Playwright tests
npm run test

# Run the Playwright tests with the UI
npm run test -- --ui

# Run the Vitest tests
npm run test:unit
```

Note:

(repeated) if you try to run the playwright server you will be prompted to complete the installation and setup
