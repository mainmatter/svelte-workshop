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
- `<script>` tag contains the logic for the component,
- import from other files,
- carry out logic,
- store component state.
- it's very similar to a standard `<script>` tag, with 4 major differences:


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
		array.push('new thing') // this alone won't work
		array = array; // this will make it work
	}
</script>
```

- svelte will update the DOM if an assignment is changed
- strings, booleans and object attributes can all be reassigned to update the DOM
- array manipulation (e.g. splice or push) will not cause the DOM to update because svelte needs a `=` or `++` or `--` to work (it statically analyse the code)


---
### $: marks a statement as reactive
```
<script>
	export let title;
	
	let blogTitle;
	$: blogTitle = `Blog: ${title}` 
</script>
```
- "$" means that svelte will observe the values for any changes
- simple tasks like extending the name of this blog,

---
### $: marks a statement as reactive
```
<script>
	export let title;

	$: blogTitle = `Blog: ${title}` 
</script>
```
- svelte will automatically add the let variable if it sees that the only thing in the reactive statement is an assignment

---
### $: marks a statement as reactive
```
<script>
	export let person;

	let reversed = ''

	$: {
		// this is not optimal code, but works for this demonstration
		if(person.isReversed){
		const characters = name.split('')
		const reversedCharacters = characters.reverse()
		const reversedName = reversedCharacters.join('')
		reversed = reversedName
	}

</script>
```
- with curly braces you can add multiple statements or use it like a regular code block

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

- regular HTML with a few additions
- `on:*` attributes for native HTML element interactions
- `if` and `each` blocks
- JS expressions - great for debugging

---
## Component styles

- all CSS styles are scoped to the component
- no bleeding into child components
- `:global()` can be used to circumvent this if needed

---
## Slots
```html
<!-- ImageWrapper.svelte -->
<figure>
	<slot>No slot was provided</slot>
</figure>
```
```html
<!-- App.svelte -->
<ImageWrapper>
	<img src="./foo.png" alt="foo thing"/>
</ImageWrapper>
```

 - anything inside the wrapping <slot> element will be the fallback in case no slot is provided
 - this is the insertion point for the children of the component
---
## Named slots
```html
<!-- Blog.svelte -->
<div>
  <slot name="title">No title was provided</slot>
  <slot name="content" />
  <slot name="actions" />
</div>
```
```html
<!-- App.svelte -->
<Blog>
	<h1 slot="title">The title goes here</h1>
	<p slot="content">My amazing blog post.</p>
	<svelte:fragment slot="actions">
		<!--These will be inserted without a wrapping element-->
		<a href="#">A</a> <a href="#">B</a>
	</svelte:fragment>
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