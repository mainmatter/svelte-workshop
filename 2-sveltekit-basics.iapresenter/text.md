# Sveltekit Basics


---
## Generate a new project
---
### Project setup
```bash
npm create svelte@latest svelte-music-player
```
```bash
◆  Which Svelte app template?
│  ○ SvelteKit demo app
│  ● Skeleton project (Barebones scaffolding for your new SvelteKit app)
│  ○ Library project
```
```bash
◆  Add type checking with TypeScript?
│  ○ Yes, using JavaScript with JSDoc comments
│  ○ Yes, using TypeScript syntax
│  ● No
```
```bash
◆  Select additional options (use arrow keys/space bar)
│  ◼ Add ESLint for code linting
│  ◼ Add Prettier for code formatting
│  ◼ Add Playwright for browser testing
│  ◼ Add Vitest for unit testing
```
```bash
Next steps:
  1: cd svelte-music-player
  2: npm install (or pnpm install, etc)
  3: git init && git add -A && git commit -m "Initial commit" (optional)
  4: npm run dev -- --open
```

- using JS over TS as this is an intro to Sveltekit rather than TS
- we will still be using JSDoc for some autocompletion

---

### Command cheatsheet
	Run the development server
	```bash
	7pm run dev
	```
	Run the Playwright tests
	```bash
	npm run test
	```
	Run the Vitest tests
	```bash
	npm run test:unit
	```

---

## Getting started with Sveltekit

---
### Structure of a blank Sveltekit project
```bash
├── jsconfig.json
├── package.json
├── playwright.config.js
├── src
│   ├── app.d.ts
│   ├── app.html
│   ├── index.test.js
│   └── routes
│       └── +page.svelte
├── static
│   └── favicon.png
├── svelte.config.js
├── tests
│   └── test.js
└── vite.config.js
```

"jsconfig.json" - JS configuration including how the app handles or doesn't handle typing with JSDoc.

"package.json" - references to all of the packages and the general app information like "name" and "version".

"playwright.config.js" - Playwright configuration including which commands to run and which ports to run on.
- expects tests in "tests" folder - we will speak a little bit more about that later.

Skipping "src" for now

"static" - assets that won't change, like the logo or favicon,
- also a good place to store your global stylesheet

"svelte.config.js" - where we can configure our app in different ways, 
- aliases to make imports easier,
- adapters - will take a production build and tune it for our target environment.

"tests" - created by Playwright
- where we store all of our Playwright tests
- this will be expanding as we go through this workshop and begin to add more functionality.

back to "src" - the majority of our app code will go,
- we can split it into components, stores, routes and any other folders or files we might find useful later on.

Going through the "src" folder:
"app.d.ts" - define our types if we wanted,
- just by the fact that our JS only app has a types file, you can tell that Svelte loves types.

"app.html" - the entry point for our whole app,
- looks like a fairly standard HTML page. There are just a few things that stick out, all of which allow sveltekit to take over during the compile step and add the correct paths:
"%sveltekit.assets%" - the assets are stored, in our case it defaults to the "static" folder.
"%sveltekit.head%" - adds a portal so that we can add "head" information from anywhere in the app.
"%sveltekit.body%" - where the rest of our app will be output.

"index.test.js" - created by Vitest
- is one option for how to structure your tests,
- Vite and Vitest can be configured to look at any part of the app for the component tests,
- some find it harder to distinguish between the app code and the test code in this situation and so prefer to put it in a separate folder.
- there is no right or wrong way to do this so it's just down to preference.

"src/routes" - one of the strengths of Sveltekit,
- the folder routing structure means that we can group routes together and house logic right next to where it is used
- every new "+page.svelte" file will reflect a new route with the name of its folder 
- (there are some exceptions to this but we will explore them later).

"+page.svelte" file directly in the "routes" folder - this is the index page,
- can access by navigating to the root URL of our dev server.


---
// this needs to change - we do this in Routing now
## Adding a layout
	+layout.svelte

- good place to import global stylesheets
- all other pages will inherit from this layout.

- +layout.svelte is the perfect place to house shared logic across all pages.
- good candidates for usage in the layout file would be things like a navbar or footer.

- breaking out of layouts is possible but we won't be exploring it
// https://learn.svelte.dev/tutorial/breaking-out-of-layouts

For now, just import global stylesheet,
- create +layout.svelte within "routes", giving it a script tag and importing our global styles here.

// wait for them to do it and see the app is broken

---

- app is now displaying nothing,
- <slot/> element allows svelte to know that this is where we want all child elements to be rendered.

- after adding <slot/>, app should now work 

	routes/+layout.svelte
```
<script>
	import '../app.css';
</script>

<slot />
```
---
// Also in Routing now
## Loading data
	+page.server.js

- we'll dig into data loading and distribution later
- for now, let's simply get some data on screen.

- create a +page.server.js file alongside our +page.svelte and +layout.svelte files.

- export a load function that will return our data object.


---
	routes/+page.server.js
```
export function load() {
	return {
		name: 'Billy Bloggs'
	};
}
```


---
## Displaying our loaded data

- add the data object as an export in our +page.svelte file. 
- always has the same call signature - "export let data"

- the "export" keyword here is handled specially by Sveltekit for these situations where there is data coming from outside the component. 

---
// change this to not have the export - hardcode the data for now
	routes/+page.svelte
```
<script>
	export let data;
</script>

<h1>Welcome to The Svelte Music Player</h1>

<p>
	{data.name}, it's great to see you again!
</p>
```