# 2025

## What is this?
This is the repo for my portfolio website. Its pages are generated with [Eleventy](https://11ty.dev) and supported with [SCSS](https://sass-lang.com) and [Alpine.js](https://alpinejs.dev), making for a simple-to-develop site that loads quickly.


## Project structure

I take a cascading approach to this site, like CSS and Eleventy. The project structure reflects this:

* **`assets`** :  images, media, downloadable files
* **`content`** :  documents of text that include references to assets
* **`blocks`** :  reusable components that define how content looks and behaves
* **`layouts`** :  templates that define how those blocks come together on a page


## Technical highlights

To build this site, I made some deliberate choices([!](https://64.media.tumblr.com/765aebed25c13e6c7c2961adebdea298/tumblr_p58y5rttpg1vj3yico1_500.gif)) to support a smooth and quick user experience.

### Smooth transitions and animations

#### Transitions are only applied to properties optimized by the GPU
Different visual states are pulled off by using [CSS tricks](https://css-tricks.com), like layered elements, blend modes, backdrops, SVG, and box shadows. That all stays fixed; only the `opacity` and `transform` are modified. Doing so means the GPU optimally handles the rendering, and the payoff is buttery smooth animation.

The [top bar](https://github.com/johnmatula/2025/blob/main/src/blocks/navigation/_navigation.scss) is one example of this. It uses a mix of `backdrop-filter`s and `backdrop-blend-mode`s to create an effect that smoothly changes color on hover and focus. (If magic numbers are bad, then [this filter declaration](https://github.com/johnmatula/2025/blob/629ac9fd3087acf6882c047f3579bfa78bead7e2/src/blocks/navigation/_navigation.scss#L50) must be evil.)

#### Custom easing functions refine transitions
I used a custom `cubic-bezier` function to control the easing curve of each transition, used in place of one of `ease` function keywords.

This is a simple site, so the smooth behavior of a transition ends up being an important detail. Consider this: the default function, `ease` or `cubic-bezier(0.25, 0.1, 0.25, 1)`, offers a transition with a smooth quick start and a smooth slower end.

Contrast that with the “pushy” button style (`cubic-bezier(0.22, 1.28, 0.62, 1)`), which has a curve that mimics what a big push button would do. There’s a sudden jolt of force from the spring pushing the button back upward, slightly overshooting with a little bounce, before smoothly settling back at rest. This detail has a point, too, as it makes the “[download résumé](https://johnmatu.la/assets/pdf/JohnMatula_resume.pdf)” link as enticing as possible.


### Low network usage

#### Each page uses a single image sprite
An image sprite sheet is a single file that contains multiple, unrelated images. I use this technique to prepare a sheet for each page. The images to be shown on that page are first smooshed together into one file. It’s loaded by the page and re-sliced into separate visuals.

By doing this, multiple network requests that would be needed for separate image files are reduced to a single request. 

#### Assets for each page are optimized
Art and content is represented with plain text and vector art. Raster images are separated from vector art so that they can be optimally served, like on the Smarthome page.

#### Type is set using variable fonts
There are two fonts used on the site. As variable fonts, they offer a wide range of weights at a very low file size. They have been optimized before being `base64`’d into the CSS file itself — the site is simple enough where the fonts can be baked into the main site’s styles to avoid network requests and styling flashes.


## Miscellany

The site is typeset in two variable fonts originally made for the [Taiwan Space Agency](https://www.tasa.org.tw/en-US). They were designed by [Local Remote](https://www.localremote.co/) and have a [specimen site](https://www.localremote.co/tasa-typeface-collection) that shows them off super nicely.

Most of this site was designed in [Sketch](https://www.sketch.com), which is my favorite, fast choice for the [2014 MacBook Pro](https://support.apple.com/en-us/111935) I still use. I’ll only open the [Chromium-based app](https://www.figma.com/design/) when I absolutely must.
