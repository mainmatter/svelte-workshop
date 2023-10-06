# SvelteKit as a server
SvelteKit is just a machine that takes a Request and answer with a response
---
## Form actions

---
	src/routes/(app)/sign-in/+page.svelte
```
<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<!-- this is an actual HTML form -->
<form method="POST" use:enhance>
	<label>
		Username
		<input type="text" name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button type="submit">Submit</button>
</form>
{#if form?.detail}
	<div>
		{form.detail}
	</div>
{/if}
```

originally/without JS this would reload the page, and rerun the `load` function in the `server.js` file

`use:enhance` enables us to use JS when its available to update the form without reloading the page

In a component you can get the content of the form with `$page.form` just like with `$page.data`

---
	src/routes/(app)/sign-in/+page.server.js
```
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username');
		const password = data.get('password');
		if (password !== 'password') {
			return fail(401, { detail: 'incorrect password' });
		}
		event.cookies.set('user', username);
		throw redirect(303, '/library');
	}
};
```
this function receives the special sveltekit request event (native request + sveltekit additions) - more info in the docs

we can do server side logic here without having to go to our API

sveltekit provides us with useful helper functions for common responses like redirect, fail, error and json - available for any point in which sveltekit can return a server response

anything returned from the action will populate the `page.form` property

- // ADDON SLIDE
- // you can have named form actions by exporting named actions instead of using the `default` action

---
## Hooks

---
	src/hooks.server.js
```
import { redirect } from "@sveltejs/kit";
export async function handle({ event, resolve }) {
	const user = event.cookies.get('user');
	if (user) {
		event.locals.user = user;
	}
	// good place to check auth
	if(event.route.id.startsWith("/library") && ! user){
		throw redirect(301, "/library");
	}
	//you ca return whatever Response object you want
	const response = await resolve(event);
	return response;
}
```

hooks runs on every request - a lot like a middleware (express) that can mutate the object that is passed to it

server hooks:
handle - runs every time sveltekit receives a request and allows you to manipulate the data before and after the `load` function is executed
handleFetch - allows you to modify (or replace) a fetch request that happens inside a load or action function that runs on the server

Shared hooks (both client and server):
handleError - If an unexpected error is thrown during loading or rendering

here we are setting the `user` if there is one

`event` is a RequestEvent that also has properties that are available throughout the app in the `load` function. `locals` is the preferred place to store data to be passed to the rest of the SvelteKit application with each request.

---

## Adding form actions to our project

`$lib/server` is a reserved folder that acts as an API layer and every file with the extension of `.server.js`, you cannot import them inside anything that will be shipped to the client. It can only be accessed from `server` files. It contains the code that is only executed on the server so you can safely access secrets there
