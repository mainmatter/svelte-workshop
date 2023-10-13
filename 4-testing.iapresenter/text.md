# Testing

Vitest and Playwright and baked in and suggested for testing

---
### Vitest & Testing library
/assets/Clipboard.png
size: contain
/assets/Clipboard_1.png
size: contain
Vitest + testing-library - Unit testing

Vitest is usable on its own but requires setting up the component environment, whereas testing-library takes care of that issue for us

Unit testing:
- stand alone component - does the interactions work as expected

- // Vitest currently has no easy way of adding `slot` to unit tests - https://github.com/testing-library/svelte-testing-library/issues/48
---
### Playwright
/assets/Clipboard_2.png
size: contain

```
npx playwright codegen localhost:5173
```
Playwright - acceptance testing

Acceptance testing:
- closer to real life testing - does it work correctly when plugged into the page
- run codegen `npx playwright codegen localhost:5173` 

---
## 🧑‍💻 Adding tests to our app

PRESENTER HELP:
Playwright
- show how codegen works then get them to write a test: "start on '/' go to '/library', check the title and check the table has rendered"
- mention `page().toHaveUrl()`
Vitest:
Testing the song table
- add `data-testid` to play button to help select elements
- go through first example then get them to do second test on their own

