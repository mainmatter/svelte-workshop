# Testing

Vitest and Playwright and baked in and suggested for testing
Vitest + testing-library - Unit testing
Playwright - acceptance testing

Vitest is usable on its own but requires setting up the component environment, whereas testing-library takes care of that issue for us

Testing the song table
- we've provided the component, you need to test it
- add testId to help select elements

Unit testing vs acceptance testing
Unit testing:
- stand alone component - does the interactions work as expected

Vitest currently has no easy way of adding `slot` to unit tests - https://github.com/testing-library/svelte-testing-library/issues/48

Acceptance testing:
- closer to real life testing - does it work correctly when plugged into the page
- start on '/' go to '/library', check the title and check the table has rendered