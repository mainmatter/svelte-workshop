# Form actions
 very similar native HTML forms

for this example, we will stick with `default` action in server file

---
	sign-in.svelte
```
<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	$: form = $page.form;
</script>

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

we can access the form using `page.form`

---
	sign-in.server.js
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

named action - you can have multiple actions on a single server file

---
## Hooks
```
export async function handle({ event, resolve }) {
	const user = event.cookies.get('user');
	if (user) {
		event.locals.user = user;
	}
	const response = await resolve(event);
	return response;
}
```

hooks runs on every request - a lot like a middleware (express) that can mutate the object that is passed to it

here we are setting the `user` if there is one

`event` is a RequestEvent that also has properties that are available throughout the app in the `load` function. `locals` is the preferred place to store data to be passed to the FE with each request.

handle can also be broken down into `handleFetch` and `handleError` which will mutate the `fetch` and `error` response

you can manipulate data before and after the `load` function is executed

---

## Adding form actions to our project

// `$lib/server` is a reserved folder that acts as an API layer. It can only be accessed from `server` files. It contains the code that is only executed on the server

// ADDON SLIDE
// you can have named form actions by exporting named actions instead of using the `default` action