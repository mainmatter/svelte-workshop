# Stores

https://svelte.dev/docs/svelte-store

Svelte's way of handling long-lived state in memory

similar to the `$` reactivity model in a component, `stores` give us the same reactivity model that isn't bound to a single component

stores live outside of our components and can be accessed anywhere - don't need to worry about the component tree

they use pure functions to maintain the state of the store

they're available in template through `$` - this sets up the subscription and removes it when the component is destroyed - don't need to worry about data leaks

3 built-in types:
writable
readable
derived

can also customise them or create your own as long as they follow the store interface - `subscribe`, `unsubscribe` & `set`


---
## Writable stores
```
import { writable } from 'svelte/store';
 
const count = writable(0);

count.subscribe((value) => {
  console.log(value);
}); // logs '0'
 
count.set(1); // logs '1'
 
count.update((n) => n + 1); // logs '2'
```

set them with an initial value

`subscribe` to the value changes

`set` overrides the value

`update` lets you provide a callback to manipulate the current value

---
## Readable stores
```
import { readable } from 'svelte/store';
 
export const time = readable(new Date(), (set) => {
  set(new Date());
 
  const interval = setInterval(() => {
    set(new Date());
  }, 1000);
 
  return () => clearInterval(interval);
});

const ticktock = readable('tick', (_set, update) => {
  const interval = setInterval(() => {
    update((sound) => (sound === 'tick' ? 'tock' : 'tick'));
  }, 1000);
 
  return () => clearInterval(interval);
});
```

Meant to emit values
can be set with an initial value

callback has an internal `set` function that can be used to override the stored value

internal `update` function can be used to manipulate the previously stored value


---
## Derived stores
```
import { derived } from 'svelte/store';
import { time } from 'previous-example'
 
const start = new Date();

export const elapsed = derived(time, ($time) => Math.round(($time - start) / 1000));
```

derived stores receive another store and can emit values based on that stores value without manipulating the original store

---
## Adding stores to our project

readable "time" store for `outline` component
writable "nowPlaying" store for `nowPlaying` component
derived "breadcrumbs" store for `breadcrumbs` component
