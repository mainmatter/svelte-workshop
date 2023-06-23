# Sveltekit Routing

---
## Folder structure
```bash
├── (app)
│   ├── +layout.svelte
│   ├── library
│   │   ├── +page.server.js
│   │   ├── albums
│   │   │   ├── +page.server.js
│   │   │   ├── +page.svelte
│   │   │   └── [album]
│   │   │       ├── +page.server.js
│   │   │       └── +page.svelte
├── (marketing)
│   ├── +layout.svelte
│   ├── +page.server.js
│   ├── +page.svelte
│   ├── about
│   │   └── +page.svelte
└── +layout.svelte
```

- each folder is a route name,
- apart from those with parenthesises - these are route groups and don't affect the URL - (marketing and app)
- each route must have a +page.svelte,
- each route can have a +page.server.js, and a +page.js
- +page.server.js only runs in the server,
- +page.js runs both in the server and on the client,
- you can have environment secrets in the +page.server.js but not in the +page.js
- square brackets denotes a dynamic parameter which is available in the +page.server.js and +page.js files
- components can also live next to the route they are used on, or can live in `$lib/components` (or your own version)

// get stuck in and create this folder structure then play around with the URL to see that each page is working

---
!!! this needs changing, we know give an example of how you can still access the parent data here by loading the songs in (app)/+layout.server.js

## Loading data
	src/routes/(app)/library/songs/+page.server.js
```
export async function load({ fetch }) {
	let response = await fetch('/data/songs.json');
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
```

- load is a built-in function from Sveltekit
- "fetch" from the load function is a built-in wrapper around the standard fetch API so that it can be used with SSR
- here we are mocking an API and returning all songs,
- the return value must always be an object
- we can import the type here to help with autocompletion, this is dynamically created by Svelte based on the return value from our +page.server.js or +page.js file


---
## Route params
	src/routes/(app)/library/albums/[album]/+page.server.js
```
import { kebabCase } from 'lodash-es';

export async function load({ params, fetch }) {
	let response = await fetch('/data/songs.json');
	let allSongs = await response.json();

	const albumSlug = params.album;
	const songs = allSongs.filter(
		(song) => kebabCase(song.album) === albumSlug
	);

	const album = {
		songs,
		artist: songs[0].artist,
		title: songs[0].album,
		coverUrl: songs[0].coverUrl,
		slug: albumSlug
	};
	return { album };
}
```
- we are already repeating code here to get the songs - we will return to this later and show a more optimal way of retrieving and storing the data
- "params" will contain the data from the URL, here it follows the naming of the folder - [album]

// they can add the `+page.svelte` props to make this display in a JSON blob or something

---
## Linking between pages
```
<a href="/about">About</a>
<a href="/library">Library</a>
```

Add the links to the PrimaryNav

---
## Adding redirects
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