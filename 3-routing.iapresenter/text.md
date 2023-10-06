# SvelteKit Routing

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

### 🧑‍💻 Adding the about page
```bash
routes
├── about ✨
│   └── +page.svelte ✨
└── +page.svelte
```

- this adds a /about page
- you can add anything you like here - "About" header?
- Next: how to load data?

---

## Loading data
	+page.server.js

- we'll dig into data loading and distribution soon
- for now, let's simply get some data on screen.

---

### 🧑‍💻 Adding a page server file
```bash
routes
├── about
│   └── +page.svelte
├── +page.server.js ✨
└── +page.svelte
```

- load the data in +page.server.js
- Next: common layout around the pages

---
	🧑‍💻 src/routes/+page.server.js
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
- Next: if we want something that can load both on the server AND client-side...
---

## The Universal load function
	+page.js

- runs on the server AND on the client
- you can receive data from the +page.server.js
- you can return non serialisable data (like a svelte component or a function)
- all the serialisable data that uses `fetch` gets inlined in the html so that it will not be fetched twice
- lives along side `+page.server.js`

---
- THIS IS JUST AN EXAMPLE! DON'T PUT IT IN YOUR CODE

	src/routes/+page.js
```
import MyFancyButton from "$lib/MyFancyButton.svelte";

export function load({data}) {
	return {
	...data,
	component: MyFancyButton,
	};
}
```

---

## Displaying our loaded data
	+page.svelte

---

	🧑‍💻 src/routes/+page.svelte
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

---

## Common layouts
	+layout.svelte

- good place to import global stylesheets
- all other pages will inherit from this layout.

- +layout.svelte is the perfect place to house shared logic across all pages.
- good candidates for usage in the layout file would be things like a navbar or footer.

- breaking out of layouts is possible but we won't be exploring it
- // https://learn.svelte.dev/tutorial/breaking-out-of-layouts

---

## 🧑‍💻 Adding a layout
```bash
routes
├── about
│   └── +page.svelte
├── +layout.svelte ✨
├── +page.server.js
└── +page.svelte
```

---

	🧑‍💻 src/routes/+layout.svelte
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

	🧑‍💻 src/routes/+layout.svelte
```
<script>
	import '../app.css';
</script>

<slot />
```

- <slot/> element allows svelte to know that this is where we want all child elements to be rendered.
- Now the app should work as expected

---

## Grouping
- Add a folder with parenthesis around to not influence the route structure while organising you code
- will also become useful if you want to "break" out of layouts



---

### 🧑‍💻 Adding route groups
```bash
routes
├── (app) ✨
├── (marketing) ✨
│   ├── about 
│   │   └── +page.svelte 👈 '/about'
│   ├── +page.server.js
│   └── +page.svelte 👈 '/'
└── +layout.svelte
```

---

## Parent Data

---

### How parent data works
/assets/parent-data-1.svg
size: contain
- parent data always goes down the tree
- in this example, root layout returns data then we have access to it in the root route
- we don't actually need the server file, this is available in `page.svelte
- layout data is available in child load function within `parent` attribute (more on that soon)
- anything returned from layout is added to the `data` object on the page

---
### How parent data works
/assets/parent-data-2.svg
size: contain

- parent data can be overwritten in the child
- server loads can overwrite the data but only affects that route specifically (`foo` route)

---
### How parent data works
/assets/parent-data-3.svg
size: contain
- layout load can overwrite data and it will affect all children

---
### How parent data works
/assets/prent-data-4.svg
size: contain
- we showed extra steps but we don't necessarily need them, this data is available directly in all children

---
### How parent data works
/assets/parent-data-5.svg
size: contain
- and even further descendants

---
### How parent data works
/assets/parent-data-6.svg
size: contain
- but it can still be manipulated on the way
---
### How parent data works
/assets/parent-data-3.svg
size: contain
- parent loading is useful as this allows us to load data once and have access to it in all children
- caveat: only possible from `layout` files
- `.server` files can only get parent data from a `+layout.server.js` file
- universal load (`+page.js`) functions can access data from both `+layout.server.js` & `+layout.js`
---

### 🧑‍💻 Adding layout loading
```bash
routes
├── (app)
│   ├── library ✨
│   │   └── songs ✨
│   │       └── +page.svelte ✨
│   └── +layout.server.js ✨
├── (marketing)
│   ├── about
│   │   └── +page.svelte
│   ├── +page.server.js
│   └── +page.svelte
└── +layout.svelte
```

---
- "fetch" from the load function is a built-in wrapper around the standard fetch API so that it can be used with SSR
- here we are mocking an API and returning all songs,
- you can see from the route paths, we are in a descendant of the `+layout.server.js`

	🧑‍💻 src/routes/(app)/+layout.server.js
```
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	let response = await fetch('/data/songs/index.json');
	let songs = await response.json();
	return { songs };
}
```
	🧑‍💻 src/routes/(app)/library/songs/+page.svelte
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

---

- THIS IS AN EXAMPLE DON'T PUT IT IN YOUR CODE!

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
export async function load({ fetch, parent }) {
	// this will introduce a waterfall
	let songs = await parent();
	let response = await fetch(`anotherfetch/${songs.foo}.json`);
	let another = await response.json();
	return { another };
}
```

- by default SvelteKit will run layout and page loads in parallel
- if you `await parent` it will load them in series
- you should do this only if you really need the data from the parent to load other data

---

## Route params

---

### 🧑‍💻 Adding dynamic routes
```bash
routes
├── (app)
│   ├── library
│   │   ├── albums ✨
│   │   │   └── [album] ✨
│   │   │       ├── +page.server.js ✨
│   │   │       └── +page.svelte ✨
│   │   └── songs
│   │       └── +page.svelte
│   └── +layout.server.js
├── (marketing)
│   ├── about
│   │   └── +page.svelte
│   ├── +page.server.js
│   └── +page.svelte
└── +layout.svelte
```

---

	🧑‍💻 src/routes/(app)/library/albums/[album]/+page.server.js
```
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const albumSlug = params.album;

	const response = await fetch(`/data/albums/${albumSlug}/index.json`);
	const albumData = await response.json();

	return { album: albumData };
}
```
	🧑‍💻 src/routes/(app)/library/albums/[album]/+page.svelte
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

	🧑‍💻 src/lib/global/primary-nav.svelte
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

	🧑‍💻 src/routes/(app)/library/+page.server.js
```
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/library/songs');
}
```

Currently, '/library' will lead us to an unknown page,
We can either make sure that all of our routes are hard-coded to `/library/songs` but then the app would still break if someone were to change the URL.
For safety, we'll add a redirect that will take us from `/library` to `/library/songs`

Within the `load` function, we throw a `redirect` (from SvelteKit) with the redirect code (the specific code is not so important) and the route we want to redirect to.
Every time a user hits `/library` they will be redirected

---

## Routing recap
```bash
routes
├── (app)
│   ├── library
│   │   ├── albums
│   │   │   └── [album]
│   │   │       ├── +page.server.js
│   │   │       └── +page.svelte
│   │   └── songs
│   │       └── +page.svelte
│   └── +layout.server.js
├── (marketing)
│   ├── about
│   │   └── +page.svelte
│   ├── +page.server.js
│   └── +page.svelte
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
- behind the scenes we will add the `artists` route and some other minor components
