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

**The website only performs animations on CSS properties that are assigned to the GPU.** Different visual states are pulled off by using [CSS tricks](https://css-tricks.com), like layered elements, blend modes, backdrops, SVG, and box shadows. That all stays fixed; only the `opacity` and `transform` are modified. Doing so means the GPU optimally handles the rendering, and the payoff is buttery smooth animation. The [top bar](https://github.com/johnmatula/2025/blob/main/src/blocks/navigation/_navigation.scss) and [buttons](https://github.com/johnmatula/2025/blob/main/src/blocks/button/_button.scss) are two good examples in action. (If magic numbers are bad, then [this filter declaration](https://github.com/johnmatula/2025/blob/629ac9fd3087acf6882c047f3579bfa78bead7e2/src/blocks/navigation/_navigation.scss#L50) must be evil.)

**Custom easing functions refine transitions.** I think I ended up using a custom `cubic-bezier()` easing function for each transition between states. For a simple site like this, these interactions carry a lot of weight and deserve consideration. For instance, I added a custom curve for how the “pushy” button style as it springs back from its pressed state: there’s a brief sticky start, then a sudden jolt of force upward, slightly overshooting with a little bounce, before settling back at rest. All this fuss was for the extremely important “[download my résumé](https://johnmatu.la/assets/pdf/JohnMatula_resume.pdf)” button.


### Low network usage

**Each page uses image sprites.** An image sprite sheet is a single file that contains multiple, unrelated images. I use this technique to prepare a sheet for each page. The images for that page are smooshed together into one file, it’s loaded onto the page, and it gets re-sliced up as separate images.

**Assets for each page are optimized.** Whenever possible, art and content is represented with plain text. When that’s not possible, I use vector art. Raster images are separated from vector art so that they can be optimally served, like on the Smarthome page.

**Type is set using two variable fonts.** These fonts offer a wide range of weights, enabling fine control at a low file size. They’ve been optimized before being `base64`’d into the CSS file itself — decently small enough and definitely important enough to do so.

## Miscellany

The site is typeset in two variable fonts originally made for the [Taiwan Space Agency](https://www.tasa.org.tw/en-US). They were designed by [Local Remote](https://www.localremote.co/) and have a [specimen site](https://www.localremote.co/tasa-typeface-collection) that shows them off super nicely.

Most of this site was designed in [Sketch](https://www.sketch.com), which is my favorite, fast choice for the [2014 MacBook Pro](https://support.apple.com/en-us/111935) I still use. I’ll only open the [Chromium-based app](https://www.figma.com/design/) when I absolutely must.
