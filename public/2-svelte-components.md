# Svelte components

---

## The structure of Svelte a component

---

```svelte
<script>
	// logic goes here
</script>

<!-- markup (zero or more items) goes here -->

<style>
	/* styles go here */
</style>
```

Note:

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

Note:

- "export" keyword marks a variable declaration as a property of that component
- it is the exact opposite of "export" in ESM - here it means the property have been passed in from outside

- you can set a default value
- make it readonly by using `const`
- you can pass in functions
- or use reserved words as props

---

### Assignments are 'reactive'

---

### But first: What is reactivity?

<img data-src="/assets/Reactivity.png" />

Note:

- screenshot taken from Rich Harris' talk on reactivity
- we want a way to be able to mix tracked variables that will update when a value they depend on changes
- in this example, if we update "quantity" or "price" then the "total"s will update

---

```svelte
<script>
	let count = 0;
	let array = [];
	let object = {
		a: null,
		b: null,
	};

	function updateCount() {
		count = count + 1;
	}

	function updateObject() {
		object.a = 'something new';
	}

	function updateArray() {
		array.push('new thing'); // this alone won't work
		array = array; // this will make it work
	}
</script>
```

Note:

- svelte will update the DOM if an assignment is changed
- strings, booleans and object attributes can all be reassigned to update the DOM
- array manipulation (e.g. splice or push) will not cause the DOM to update because svelte needs a `=` or `++` or `--` to work (it statically analyse the code)

---

### $: marks a statement as reactive

```svelte
<script>
	export let title;

	let blogTitle;
	$: blogTitle = `Blog: ${title}`
</script>
```

Note:

- "$" means that svelte will observe the values for any changes
- simple tasks like extending the name of this blog,

---

### $: marks a statement as reactive

```svelte
<script>
	export let title;

	$: blogTitle = `Blog: ${title}`
</script>
```

Note:

- svelte will automatically add the let variable if it sees that the only thing in the reactive statement is an assignment

---

### $: marks a statement as reactive

```svelte
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
	}

</script>
```

Note:

- with curly braces you can add multiple statements or use it like a regular code block
- // in case it comes up - reassigning a variable will work, but it would get overwritten if the watched variable changes

---

## Template markup

```svelte
<button on:click="{()" ="">
	{JS code to change something can go here}}> Click me!
</button>

{#if trueThing}
	<div>Show when trueThing is truthy</div>
{/if}

<ul>
	{#each array as item, index}
	<li>{index} - {item}</li>
	{/each}
</ul>

<!-- Dan's favourite debugging tool -->
{JSON.stringify(thing, null, 2)}
```

Note:

- regular HTML with a few additions
- `on:*` attributes for native HTML element interactions
- `if` and `each` blocks (`each` loops can also be keyed as with most modern frameworks)
- JS expressions - great for debugging

---

## Component styles

- all CSS styles are scoped to the component
- no bleeding into child components
- `:global()` can be used to circumvent this if needed

---

## Slots

```svelte
<!-- ImageWrapper.svelte -->
<figure>
	<slot>No slot was provided</slot>
</figure>
```

```svelte
<!-- App.svelte -->
<ImageWrapper>
	<img src="./foo.png" alt="foo thing" />
</ImageWrapper>
```

Note:

- anything inside the wrapping <slot> element will be the fallback in case no slot is provided
- this is the insertion point for the children of the component

---

## Named slots

```svelte
<!-- Blog.svelte -->
<div>
	<slot name="title">No title was provided</slot>
	<slot name="content" />
	<slot name="actions" />
</div>
```

```svelte
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

Note:

- if you need multiple slots on the page, you can use named slots
- "slot" can go onto an HTML element
- same as normal slot, fallback is provided by anything inside the <slot> tags

---

### Passing data between components

```svelte
<!-- Child.svelte -->

<script>
	export let greeting;
	let result = 'Hi mum'
</script>

<slot {result}/>
```

```svelte
<!-- Parent.svelte -->
<script>
	import Child from 'child.svelte'
</script>

<Child greeting="Hi Bobby" let:result>
	{result}
</Child>
```

Note:

- data can be passed down to the child (greeting)
- data can be exposed by a child component to be used within its block
- `result` is a shorthand that means `result={result}`

---

## Putting it into practice

---

## Creating a new component

- // we don't need to for this section
- simply right-click and add a new file with the `.svelte` extension

---

### 🧑‍💻 Boxes component

- Create a new `Boxes.svelte` component
  - it can receive an array of colors (but also has a default)
  - it can receive 3 slots called "box1", "box2" & "box3"
  - clicking the box will change its color to a random color in our "colors" array
- put `Boxes` next to where it's being consumed

---

### 🧑‍💻 PrimaryNav component

- Create a "PrimaryNav.svelte" component
  - it has a link to the index page
- put PrimaryNav into `lib` folder

https://svelte.dev/docs/svelte-components
