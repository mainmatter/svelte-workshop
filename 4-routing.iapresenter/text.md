# Sveltekit Routing

---

## Routing Basics

---

## Folder structure
```bash
routes
└── +page.svelte
```

- simplest folder structure it just shows the index

---

## Folder structure
```bash
routes
├── about ✨
│   └── +page.svelte ✨
└── +page.svelte
```

- this adds a /about page
- how to load data?

---

## Loading data
	+page.server.js

- we'll dig into data loading and distribution soon
- for now, let's simply get some data on screen.

---
	routes/+page.server.js
```
export function load() {
	return {
		name: 'Billy Bloggs'
	};
}
```

- create a +page.server.js file alongside our +page.svelte and +layout.svelte files.
- export a load function that will return our data object.
- the return value must always be an object AND JSON serialisable
- `.server` will only get executed on the server

---

## The Universal load function
	+page.js

- runs on the server AND on the client
- you can receive data from the +page.server.js
- you can return non serialisable data (like a svelte component or a function)
- all the serialisable data gets inlined in the html so that it will not be fetched twice
- lives along side `+page.server.js`

---

	routes/+page.js
```
import MyFancyButton from "$lib/MyFancyButton.svelte";

export function load({data}) {
	return {
	...data,
	component: MyFancyButton,
	};
}
```

- THIS IS JUST AN EXAMPLE! DON'T PUT IT IN YOUR CODE

---

## Displaying our loaded data
	+page.svelte

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

- add the data object as an export in our +page.svelte file.
- always has the same call signature - "export let data"
- as seen in Svelte components, `export` is for data coming from outside the component.
-

---

## Folder structure
```bash
routes
├── about
│   └── +page.svelte
├── +page.server.js ✨
└── +page.svelte
```

- load the data in +page.server.js
- common layout around the pages

---

## Adding a layout
	+layout.svelte

- good place to import global stylesheets
- all other pages will inherit from this layout.

- +layout.svelte is the perfect place to house shared logic across all pages.
- good candidates for usage in the layout file would be things like a navbar or footer.

- breaking out of layouts is possible but we won't be exploring it
- // https://learn.svelte.dev/tutorial/breaking-out-of-layouts

---

	routes/+layout.svelte
```
<script>
	import '../app.css';
</script>

```

This is just a svelte component
For now, just import global stylesheet,

- create +layout.svelte within "routes", giving it a script tag and importing our global styles here.

- // wait for them to do it and see the app is broken

- app is now displaying nothing,
- // see if anyone can tell us why it's broken

---

	routes/+layout.svelte
```
<script>
	import '../app.css';
</script>

<slot />
```

- <slot/> element allows svelte to know that this is where we want all child elements to be rendered.
- Now the app should work as expected

---

## Folder structure
```bash
routes
├── about
│   └── +page.svelte
├── +layout.svelte ✨
├── +page.server.js
└── +page.svelte
```

---

## Grouping
- Add a folder with parenthesis around to not influence the route structure while organising you code
- will also become useful if you want to "break" out of layouts

---

## Folder structure
```bash
routes
├── (app)
└── (marketing)
    ├── about
    │   └── +page.svelte <-- maps to `/about`
    ├── +layout.svelte
    ├── +page.server.js
    └── +page.svelte <-- maps to `/`
```

---

## Parent Data

---

	src/routes/(app)/+layout.server.js
```
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	let response = await fetch('/data/songs/index.json');
	let songs = await response.json();
	return { songs };
}
```
	src/routes/(app)/library/songs/+page.svelte
```
<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="page-content">
	<pre>
		{JSON.stringify(data, null, 2)}
	</pre>
</div>
```

- this is useful as this allows us to load data once and have access to it in all children
- only possible from a layout
  // added information:
- .server files can only get parent data from a `+layout.server.js` file
- universal load (.js) functions can access data from both `+layout.server.js` & `+layout.js`

- "fetch" from the load function is a built-in wrapper around the standard fetch API so that it can be used with SSR
- here we are mocking an API and returning all songs,
- you can see from the route paths, we are in a descendant of the `+layout.server.js`
- this can also be nested to include all parent data

---

	src/routes/(app)/+layout.server.js
```
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	let response = await fetch('/data/songs/index.json');
	let songs = await response.json();
	return { songs };
}
```
	src/routes/(app)/library/songs/+page.server.js
```
/** @type {import('./$types').PageServerLoad} */
export async function load({ parent }) {
	// this will introduce a waterfall
	let songs = await parent();
	let response = await fetch('anotherfetch.json');
	let another = await response.json();
	return { songs, another };
}
```

- by default svelte kit will load layout and page in parallel
- if you await parent it will load them in series
- you should do this only if you really need the data from the parent to load other data
- THIS IS AN EXAMPLE DON'T PUT IT IN YOUR CODE!

---

## Folder structure
```bash
routes
├── (app)
│   ├── library ✨
│   │   └── songs ✨
│   │       └── +page.svelte ✨
│   └── +layout.server.js ✨
└── (marketing)
    ├── about
    │   └── +page.svelte
    ├── +layout.svelte
    ├── +page.server.js
    └── +page.svelte
```

---

## Route params

---

	src/routes/(app)/library/albums/[album]/+page.server.js
```
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const albumSlug = params.album;

	const response = await fetch(`/data/albums/${albumSlug}/index.json`);
	const albumData = await response.json();

	return { album: albumData };
}
```
	src/routes/(app)/library/albums/[album]/+page.svelte
```
<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="page-content">
	<pre>
		{JSON.stringify(data, null, 2)}
	</pre>
</div>
```

- "params" will contain the data from the URL, here it follows the naming of the folder - [album]

- // they can add the `+page.svelte` props to make this display in a JSON blob or something

---

## Linking between pages

---

	src/lib/global/primary-nav.svelte
```
<a href="/about">About</a>
<a href="/library">Library</a>
```

Add the links to the PrimaryNav
- just the same as native HTML
- if client side routing is enabled you'll get a seamless SPA transition

---

## Adding redirects

---

	src/routes/(app)/library/+page.server.js
```
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/library/songs');
}
```

Currently, '/library' will lead us to an unknown page,
We can either make sure that all of our routes are hard-coded to `/library/songs` but then the app would still break if someone were to change the URL.
For safety, we'll add a redirect that will take us from `/library` to `/library/songs`

Within the `load` function, we throw a `redirect` (from Sveltekit) with the redirect code (the specific code is not so important) and the route we want to redirect to.
Every time a user hits `/library` they will be redirected

---

## Updating our route structure

---

## Folder structure
```bash
├── (app)
│   ├── +layout.server.js
│   ├── +layout.svelte
│   └── library
│       ├── +page.server.js
│       ├── albums
│       │   ├── +page.server.js
│       │   ├── +page.svelte
│       │   └── [album]
│       │       ├── +page.server.js
│       │       └── +page.svelte
│       ├── artists
│       │   ├── +layout.server.js
│       │   ├── +layout.svelte
│       │   ├── +page.svelte
│       │   ├── [artist]
│       │   │   ├── +page.js
│       │   │   └── +page.svelte
│       │   └── artists-nav.svelte
│       ├── library-nav-item.svelte
│       ├── library-nav.svelte
│       └── songs
│           └── +page.svelte
├── (marketing)
│   ├── +layout.svelte
│   ├── +page.server.js
│   ├── +page.svelte
│   ├── about
│   │   └── +page.svelte
│   └── boxes.svelte
└── +layout.svelte
```

- each folder is a route name,
- apart from those with parenthesises - these are route groups and don't affect the URL - (marketing and app)
- each rendered route must have a +page.svelte,
- each route can have a +page.server.js, and a +page.js
- +page.server.js only runs in the server,
- +page.js runs both in the server and on the client,
- you can have environment secrets in the +page.server.js but not in the +page.js
- square brackets denotes a dynamic parameter which is available in the +page.server.js and +page.js files
- components can also live next to the route they are used on, or can live in `$lib/components` (or your own version)

- // get stuck in and create this folder structure then play around with the URL to see that each page is working
