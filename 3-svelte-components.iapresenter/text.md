# Svelte components

---
## Creating a new component

- simply right-click and add a new file with the `.svelte` extension
// this is useful as it can give people an area to experiment

---

## The structure of Svelte a component

---

```
<script>
	// logic goes here
</script>

<!-- markup (zero or more items) goes here -->

<style>
	/* styles go here */
</style>
```

- similar to standard HTML page,
- a svelte component consists of 3 parts, all are optional

---
## The `<script>` tag
- <script> tag contains the logic for the component,
- import from other files,
- carry out logic,
- store component state.
- it's very similar to a standard <script> tag, with 4 major differences:


---
### The "export" keyword
```svelte
<script>
	export let foo;
	
	export let bar = 'optional default initial value';
	
	export const thisIs = 'readonly';
	
	export function greet(name) {
		alert(`hello ${name}!`);
	}
	
	let className;
	
	// creates a `class` property, even
	// though it is a reserved word
	export { className as class };

</script>
```

- "export" keyword marks a variable declaration as a property of that component

- you can set a default value
- make it readonly by using `const`
- you can pass in functions
- or use reserved words as props

---
### Assignments are 'reactive'
```html
<script>
	let count = 0;
	let array = []
	let object = {
		a: null,
		b: null
	}

	function updateCount() {
		count = count + 1;
	}

	function updateObject() {
		object.a = 'something new'
	}

	function updateArray() {
		array.push('new thing') // won't work
		array = [...array, 'new thing') // will work
	}
</script>
```

- svelte will update the DOM if an assignment is changed
- strings, booleans and object attributes can all be reassigned to update the DOM
- array manipulation (e.g. splice or push) will not cause the DOM to update


---
### $: marks a statement as reactive
```
<script>
	export let title;
	export let person;

	$: blogTitle = `Blog: ${title}` 

	$: {
		console.log(`multiple statements can be combined`);
		console.log(`the current title is ${title}`);
	}

	let reversed = ''

	$: {
		// this is not optimal code, but works for this demonstration
		if(person.isReversed){
		const characters = name.split('')
		const reversedCharacters = characters.reverse()
		const reversedName = reversedCharacters.join('')
		reversed = reversedName
	}

	$: ({ name } = person);
</script>
```
- "$" means that svelte will observe the values for any changes
- simple tasks like extending the name of this blog,
- with curly braces you can add multiple statements or use it like a regular code block
- you can destructure a prop with parenthesises


---
### Prefix stores with $ to access their values

We have a whole section about stores later on so we will explore this topic in depth later on

---
## Template markup
```html
<button on:click={() => {JS code to change something can go here}}>
	Click me!
</button>

{#if trueThing}
	<div>
		Show when trueThing is truthy
	</div>
{/if}

<ul>
	{#each array as item, index}
		<li>
			{index} - {item}
		</li>
	{/each}
</ul>

<!-- My favourite debugging tool -->
{JSON.stringify(thing, null, 2)}
```

- very similar to regular HTML with a few differences
- `on` method for native HTML element interactions
- `if` and `each` elements
- pure JS in the template - great for debugging

---
## Component styles

- all CSS styles are scoped to the component
- no bleeding into child components
- `:global()` can be used to circumvent this if needed

---
## Slots
```html
<!-- ImageWrapper.svelte -->
<div>
	<slot>No slot was provided</slot>
</div>
```
```html
<!-- App.svelte -->
<ImageWrapper>
	<img src="./foo.png" alt="foo thing"/>
</ImageWrapper>
```

 - same as the +layout.svelte page, we can add <slot> to a component
 - anything inside the wrapping <slot> element will be the fallback in case no slot is provided
---
## Named slots
```html
<!-- Blog.svelte -->
<div>
  <slot name="title">No title was provided</slot>
  <slot name="content" />
</div>
```
```html
<!-- App.svelte -->
<Blog>
	<h1 slot="title">The title goes here</h1>
	<p slot="content">My amazing blog post.</p>
</Blog>
```
- if you need multiple slots on the page, you can use named slots
- "slot" can go onto an HTML element
- same as normal slot, fallback is provided by anything inside the <slot> tags
---
## Putting it into practice


---
### Our aims
	- [ ] Create a new "Boxes.svelte" component
		- [ ] it can receive an array of colours (but also has a default)
		- [ ] it can receive 3 slots called "box1", "box2" & "box3"
		- [ ] clicking the box will change its colour to a random colour in our "colours" array
	- [ ] Create a "PrimaryNav.svelte" component
		- [ ] it simply has a link to the index page
		- [ ] it is shown on all pages (+layout.svelte)

// from here go into the code editor to start working through it - be sure to put PrimaryNav into `lib` folder and `Boxes` next to where its being consumed
https://svelte.dev/docs/svelte-components