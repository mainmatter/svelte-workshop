import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import Notes from 'reveal.js/plugin/notes/notes.esm.js';

import 'reveal.js/dist/reveal.css';
import './mainmatter.css';

const deck = new Reveal();

deck.initialize({
	hash: true,
	width: 1280,
	height: 960,
	margin: 0.1,
	highlight: {},
	plugins: [Markdown, Highlight, Notes],
});
