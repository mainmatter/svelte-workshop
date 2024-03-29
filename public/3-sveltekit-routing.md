# SvelteKit Routing

---

## Routing Basics

---

## Folder structure

```md
routes
└── +page.svelte
```

Note:

- simplest folder structure it just shows the index

---

### 🧑‍💻 Adding the "About" page

```md
routes
├── about ✨
│ └── +page.svelte ✨
└── +page.svelte
```

Note:

- this adds a /about page
- you can add anything you like here - "About" header?
- Next: how to load data?

---

## Loading data

`+page.server.js`

Note:

- we'll dig into data loading and distribution soon
- for now, let's simply get some data on screen.

---

### 🧑‍💻 Adding a page server file

```md
routes
├── about
│ └── +page.svelte
├── +page.server.js ✨
└── +page.svelte
```

Note:

- load the data in `+page.server.js`

---

🧑‍💻 `src/routes/+page.server.js`

```
export async function load() {
	return {
		name: 'Billy Bloggs'
	};
}
```

Note:

- create a +page.server.js file alongside our +page.svelte and +layout.svelte files.
- export a load function that will return our data object.
- the return value must always be an object AND JSON serialisable
- `.server` will only get executed on the server
- Next: if we want something that can load both on the server AND client-side...

---

## The Universal load function

`+page.js`

Note:

- runs on the server AND on the client
- you can receive data from the +page.server.js
- you can return non serialisable data (like a svelte component or a function)
- all the serialisable data that uses `fetch` gets inlined in the html so that it will not be fetched twice
- lives along side `+page.server.js`

---

`src/routes/+page.js`

```svelte
import MyFancyButton from "$lib/MyFancyButton.svelte";

export async function load({data}) {
	return {
	...data,
	component: MyFancyButton,
	};
}
```

Note:

- THIS IS JUST AN EXAMPLE! DON'T PUT IT IN YOUR CODE

---

## Displaying our loaded data

`+page.svelte`

---

🧑‍💻 `src/routes/+page.svelte`

```svelte
<script>
	export let data;
</script>

<h1>Welcome to The Svelte Music Player</h1>

<p>
	{data.name}, it's great to see you again!
</p>
```

Note:

- add the data object as an export in our +page.svelte file.
- always has the same call signature - "export let data"
- as seen in Svelte components, `export` is for data coming from outside the component.

---

## Common layouts

`+layout.svelte`

Note:

- good place to import global stylesheets
- all other pages will inherit from this layout.

- +layout.svelte is the perfect place to house shared logic across all pages.
- good candidates for usage in the layout file would be things like a navbar or footer.

- breaking out of layouts is possible but we won't be exploring it
- // https://learn.svelte.dev/tutorial/breaking-out-of-layouts

---

## 🧑‍💻 Adding a layout

```md
routes
├── about
│ └── +page.svelte
├── +layout.svelte ✨
├── +page.server.js
└── +page.svelte
```

---

🧑‍💻 `src/routes/+layout.svelte`

```svelte
<script>
	import '../app.css';
</script>

<slot />
```

Note:

This is just a svelte component
For now, just import global stylesheet,

- create +layout.svelte within "routes", giving it a script tag and importing our global styles here.
- <slot/> element allows svelte to know that this is where we want all child elements to be rendered.

---

## Page options

`+page.js` or `+layout.js` <br>
`+page.server.js` or `+layout.server.js`

```svelte
export const ssr = true || false;
export const csr = true || false;

export const prerender = true || false;
export function entries() {
	return [
		{ slug: 'hello-world' },
		{ slug: 'another-blog-post' }
	];
}
```

Note:

- SSR means this page/folder should/not be server side rendered
- CSR disables/enables page hydration
- prerender - whether the page is pre-rendered at build time
- entries goes with prerender if you need to supply specific routes to pre-render (for dynamic routes)

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

<img data-src="/assets/parent-data-1.svg" width="100%" />

Note:

- parent data always goes down the tree
- in this example, root layout returns data then we have access to it in the root route
- we don't actually need the server file, this is available in `page.svelte
- layout data is available in child load function within `parent` attribute (more on that soon)
- anything returned from layout is added to the `data` object on the page

---

### How parent data works

<img data-src="/assets/parent-data-2.svg" width="100%" />

Note:

- parent data can be overwritten in the child
- server loads can overwrite the data but only affects that route specifically (`foo` route)

---

### How parent data works

<img src="/assets/parent-data-3.svg" width="100%" />

Note:

- layout load can overwrite data and it will affect all children

---

### How parent data works

<img data-src="/assets/parent-data-4.svg" width="100%" />

Note:

- we showed extra steps but we don't necessarily need them, this data is available directly in all children

---

### How parent data works

<img data-src="/assets/parent-data-5.svg" width="100%" />

Note:

- and even further descendants

---

### How parent data works

<img data-src="/assets/parent-data-6.svg" width="100%" />

Note:

- but it can still be manipulated on the way

---

### How parent data works

<img data-src="/assets/parent-data-3.svg" width="100%" />

Note:

- parent loading is useful as this allows us to load data once and have access to it in all children
- caveat: only possible from `layout` files
- `+page.server` files can only get parent data from a `+layout.server.js` file
- universal load (`+page.js`) functions can access data from both `+layout.server.js` & `+layout.js`

---

### 🧑‍💻 Adding layout loading

```md
routes
├── (app)
│ ├── library ✨
│ │ └── songs ✨
│ │ └── +page.svelte ✨
│ └── +layout.server.js ✨
├── (marketing)
│ ├── about
│ │ └── +page.svelte
│ ├── +page.server.js
│ └── +page.svelte
└── +layout.svelte
```

---

🧑‍💻 `src/routes/(app)/+layout.server.js`

```svelte
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	let response = await fetch('/data/songs/index.json');
	let songs = await response.json();
	return { songs };
}
```

🧑‍💻 `src/routes/(app)/library/songs/+page.svelte`

```svelte
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

Note:

- "fetch" from the load function is a built-in wrapper around the standard fetch API so that it can be used with SSR
- here we are mocking an API and returning all songs,
- you can see from the route paths, we are in a descendant of the `+layout.server.js`

---

`src/routes/(app)/+layout.server.js`

```svelte
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ fetch }) {
	let response = await fetch('/data/songs/index.json');
	let songs = await response.json();
	return { songs };
}
```

`src/routes/(app)/library/songs/+page.server.js`

```svelte
/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, parent }) {
	// this will introduce a waterfall
	let songs = await parent();
	let response = await fetch(`anotherfetch/${songs.foo}.json`);
	let another = await response.json();
	return { another };
}
```

Note:

- THIS IS AN EXAMPLE DON'T PUT IT IN YOUR CODE!
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

🧑‍💻 `src/routes/(app)/library/albums/[album]/+page.server.js`

```
/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
	const albumSlug = params.album;

	const response = await fetch(`/data/albums/${albumSlug}/index.json`);
	const albumData = await response.json();

	return { album: albumData };
}
```

🧑‍💻 `src/routes/(app)/library/albums/[album]/+page.svelte`

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

Note:

- "params" will contain the data from the URL, here it follows the naming of the folder - [album]
- // they can add the `+page.svelte` props to make this display in a JSON blob or something

---

## Linking between pages

---

🧑‍💻 `src/lib/global/primary-nav.svelte`

```svelte
<a href="/about">About</a>
<a href="/library">Library</a>
```

Note:

Add the links to the PrimaryNav

- just the same as native HTML
- if client side routing is enabled you'll get a seamless SPA transition

---

## Adding redirects

---

🧑‍💻 `src/routes/(app)/library/+page.server.js`

```svelte
import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/library/songs');
}
```

Note:

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

Note:

- each folder is a route name,
- apart from those with parenthesises - these are route groups and don't affect the URL - (marketing and app)
- each rendered route must have a +page.svelte,
- each route can have a +page.server.js, and a +page.js
- +page.server.js only runs in the server,
- +page.js runs both in the server and on the client,
- you can have environment secrets in the +page.server.js but not in the +page.js
- square brackets denotes a dynamic parameter which is available in the +page.server.js and +page.js params attribute
- components can also live next to the route they are used on, or can live in `$lib/components` (or your own version)
- behind the scenes we will add the `artists` route and some other minor components
