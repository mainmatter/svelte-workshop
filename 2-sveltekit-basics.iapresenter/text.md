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

Because this is an introduction to Sveltekit rather than TypeScript, we will be skipping the type checking, but as you will see later on, we can still use JSDoc to give us hints and autocompletion for some of the internal Sveltekit methods.

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

From top to bottom we have:

"jsconfig.json" is where we store all of the JS configuration data including how the app handles or doesn't handle typing with JSDoc.

"package.json" is where we keep the references to all of the packages we are using as well as the scripts for this project and the general app information like "name" and "version".

"playwright.config.js" is where we house all of the Playwright configuration including which commands to run and which ports to run on. At the moment it is expecting Playwright tests to be found in the "tests" folder and we will speak a little bit more about that later.

Skipping "src" for now we have the "static" folder, which is good for storing assets that won't change, like the logo or favicon, and it's also a good place to store your global stylesheet - anything that can be shipped with the app and doesn't need to be dynamic.

"svelte.config.js" is where we can configure our app in different ways, including adding aliases to make imports easier, and supplying adapters that will take a production build and tune it for our target environment.

"tests" has been created by Playwright and this is where we can store all of our Playwright tests and this will be expanding as we go through this workshop and begin to add more functionality.

And coming back to "src", this is where the majority of our app code will go, we can split it into components, stores, routes and any other folders or files we might find useful later on.

In "app.d.ts" we have a place to define our types if we wanted, and just by the fact that our JS only app has a types folder, you can tell that Svelte loves types.

"app.html" is the entry point for our whole app, this is where everything begins and it most ways it looks like a fairly standard HTML page. There are just a few things that stick out, all of which allow sveltekit to take over during the compile step and add the correct paths:
"%sveltekit.assets%" is where the assets are stored, in our case it defaults to the "static" folder.
"%sveltekit.head%" adds a portal so that we can add "head" information from anywhere in the app.
And "%sveltekit.body%" is where the rest of our app will be output.

Next we have the "index.test.js", this was created by Vitest and is one option for how to structure your tests, because Vite and Vitest can be configured to look at any part of the app for the component tests, it can sometimes be useful to add the test directly next to the component itself. Others find it harder to distinguish between the app code and the test code in this situation and so prefer to put it in a separate folder. But there is no right or wrong way to do this but it's just down to preference.

Looking into "src/routes" we can see one of the strengths of Sveltekit, the folder routing structure means that we can group routes together and house logic right next to where it is used without confusing the route structure. In practice, this means every new "+page.svelte" file will reflect a new route with the name of its folder (there are some exceptions to this but we will explore them later).

At the moment we just have a single "+page.svelte" file directly in the "routes" folder, this means that this is our index page and we can access by navigating to the root URL of our dev server.


---
## Adding a layout
	+layout.svelte

This is a good place to import global stylesheets as all other pages will inherit from this layout.

If you're building an app that has the same visual layout on every page, then +layout.svelte is the perfect place to house that shared logic. Good candidates for usage in the layout file would be things like a navbar or footer.

There are also instances where you can break out of a layout to use another one, but you'll have to refer to the docs for that one as we didn't find it all that relevant in regular applications and so won't be exploring it here
https://learn.svelte.dev/tutorial/breaking-out-of-layouts

For now, we will just be importing our global stylesheet, so we'll create our +layout.svelte within "routes", giving it a script tag and importing our global styles here.

// wait for them to do it and see the app is broken

As you can see, the app is now displaying nothing, and that's because we forgot a very important element in every layout file. The <slot/> element. This allows svelte to know that this is where we want all child elements to be rendered.

So after adding the <slot/> element beneath our script tag, we should now be able to see our very exciting starter template page.

Next up, let's get some data on the page.
---
	routes/+layout.svelte
```
<script>
	import '../app.css';
</script>

<slot />
```
---
## Loading data
	+page.server.js

We will be spending much more time talking about how data is loading and distributed around the app, but for now, let's simply get some data on screen.

To do this, we'll create a +page.server.js file alongside our +page.svelte and +layout.svelte files.

This file will export a load function that will return our data object.


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

Now that we have data coming from our server, we need a way to display it.

In Sveltekit, we can easily do that by adding the data object as an export in our +page.svelte file. This always has the same call signature - "export let data"

Also note that the export keyword here is handled specially by Sveltekit for these situations where there is data coming from outside the component. 

---
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