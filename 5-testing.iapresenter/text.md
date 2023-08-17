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
Playwright - acceptance testing

Acceptance testing:
- closer to real life testing - does it work correctly when plugged into the page
- start on '/' go to '/library', check the title and check the table has rendered

Testing the song table
- we've provided the component, you need to test it
- add testId to help select elements
