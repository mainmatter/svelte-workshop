# Getting started with Svelte & SvelteKit

---

<!-- .slide: data-background-color="#6200ee" data-background-image="/assets/Mainmatter-team.png" data-background-opacity="0.4" -->

<img data-src="/assets/Mainmatter-logo.svg" width="80%" />

https://mainmatter.com  
@mainmatter\@fosstodon.org

---

<!-- .slide: data-background-color="#6200ee" -->

## Your Presenters

---

# Getting started with SvelteKit

## in 2 days

---

<img data-src="/assets/Sveltekit-logo.png" data-align-center>

---

# What we will cover

---

1. SvelteKit basics
2. Svelte components
3. Routing
4. Testing
5. Svelte stores
6. SvelteKit as a server

---

## How we will do it

---

<img data-src="/assets/finished-app.png" data-shadow />

Note:

- building a music player app using SvelteKit and the Soundcloud API.
- mix theoretical knowledge with hands on experience
- (we will use tailwind CSS but ultimately styles are up to you)

---

If you have any questions at any point, please feel free to shout them out.

---

The materials from this workshop will be available for you to revisit at any point in the future.

---

## Let's get to it!

## 🧑‍💻 = Coding Exercise

Note:

- whenever you see this emoji, it denotes a coding exercise

---

## Prerequisites

- Git
- NPM

---

# Introduction to Svelte

---

## Not just another JS framework

- created by Rich Harris
- most JS frameworks have an abstraction layer that needs to be shipped with the production bundle, making it larger
- svelte manipulates the code in the compiler,
- compiled to (performant) vanilla JS
- same great DX
- smaller bundle sizes

---

## RactiveJS

Note:

- predecessor to Svelte
- it was an unopinionated library
- focused on creating highly interactive and reactive data views
- (Rich was working as a journalist for the Guardian (UK newspaper) at the time so needed enticing content)
- but he still felt it was shipping too much JS

---

## The dawn of Svelte

Note:

- 2016 - Svelte version 1, was essentially RactiveJS with a compiler (Rollup + Snowpack, then moved to Vite in 2021)
- it's not backed by a big company (unlike Angular & React)
- completely community run
- the core team has been expanding along with the community of users
- 2019, Svelte made it onto the State of JavaScript leaderboard with 88% retention
- it has remained around 90% since then

---

## Svelte in production

1. IBM
2. 1Password
3. Rakuten
4. The New York Times
5. Philips
6. Avast
7. Apple

Note:

It is already been put into production for some global companies

---

## Introducing Sapper

Note:

- In 2017, the Svelte team began building Sapper,
- it was a meta framework to help build full apps with Svelte.
- Until this point, Svelte could only be used to create components which could then be compiled and dropped into existing apps.

- Sapper had plenty of cutting-edge ideas including:
- Server-side rendering by default,
- code-splitting,
- an opinionated project structure.
- Sapper never reached version 1.0: the codebase had become too difficult to work with, but the team had learned a lot and so they took all of those learnings with them, introducing...

---

## SvelteKit

The new kid in town (since 2020)

Note:

- 2020, replacing Sapper with SvelteKit and giving it the final push towards its v1.0 release.
- late 2022, SvelteKit 1.0 was released (already used before 1.0, was just a cut off for "no more breaking changes").
