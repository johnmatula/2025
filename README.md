# 2025

## What is this?
This is the repo for the most recent revision of my [portfolio website](https://johnmatu.la). Its pages are generated with [Eleventy](https://11ty.dev) and supported with [SCSS](https://sass-lang.com) and [Alpine.js](https://alpinejs.dev), making for a simple-to-develop site that loads quickly.


## Project structure

I take a cascading approach to this site, like CSS and Eleventy. The project structure reflects this:

* **`assets`** :  images, media, downloadable files
* **`content`** :  documents of text that include references to assets
* **`blocks`** :  reusable components that define how content looks and behaves
* **`layouts`** :  templates that define how those blocks come together on a page


## Technical highlights

To build this site, I made some deliberate choices([!](https://64.media.tumblr.com/765aebed25c13e6c7c2961adebdea298/tumblr_p58y5rttpg1vj3yico1_500.gif)) to support a smooth and quick user experience.

### Smooth transitions and animations

**Transitions are only applied to properties optimized by the GPU.** Different visual states are pulled off by using [CSS tricks](https://css-tricks.com), like layered elements, blend modes, backdrops, SVG, and box shadows. That all stays fixed; only the `opacity` and `transform` are modified. Doing so means the GPU optimally handles the rendering, and the payoff is buttery smooth animation.

> The [top bar](https://github.com/johnmatula/2025/blob/main/src/blocks/navigation/_navigation.scss) is one example of this. It uses a mix of `backdrop-filter`s and `backdrop-blend-mode`s to create an effect that smoothly changes color on hover and focus. (If magic numbers are bad, then this [magic filter declaration](https://github.com/johnmatula/2025/blob/629ac9fd3087acf6882c047f3579bfa78bead7e2/src/blocks/navigation/_navigation.scss#L50) must be evil.)

**Custom easing functions refine transitions.** I used a custom `cubic-bezier` function to control the easing curve of each transition, used in place of one of the `ease` function keywords. This is a simple site, so the way transitions ease in and out are noticed!

> The “pushy” button style mimics how a plastic arcade button works (`cubic-bezier(0.22, 1.28, 0.62, 1)`), pressing into the page (the arcade cabinet?) and jolting back out to rest (as if by a spring). This detail makes for as enticing of a primary button as possible, which is why it’s used for important actions like to  [download my résumé](https://johnmatu.la/assets/pdf/JohnMatula_resume.pdf).


### Low network usage

**Each page uses a single image sprite.**
An image sprite sheet is a single file that contains multiple, unrelated images. I use this technique to prepare a sheet for each page. The images to be shown on that page are first smooshed together into one file. It’s loaded by the page and re-sliced into separate visuals. This reduces the amount of network requests for graphics down to one. 

**Assets for each page are optimized.**
Art and content is represented with plain text and vector art. Raster images are separated from vector art so that they can be optimally served, like on the [Smarthome](https://johnmatu.la/smarthome/) page.

**Type is set with variable fonts.** There are two fonts used on the site. As variable fonts, they offer a gradation of weights at a very low file size. They have been optimized before being `base64`’d into the CSS file itself — included like that because of how important they are to the site. At a cost of a heavier stylesheet, this avoids two additional network requests and initial styling flashes.


## Miscellany

The site is typeset using two variable fonts originally made for the [Taiwan Space Agency](https://www.tasa.org.tw/en-US). They were designed by [Local Remote](https://www.localremote.co/) and have a [specimen site](https://www.localremote.co/tasa-typeface-collection) that shows them off super nicely. Thank you for making them freely available!

This site was designed in [Sketch](https://www.sketch.com), my favorite, fast choice for  the [2014 MacBook Pro](https://support.apple.com/en-us/111935) I still use. I’ll only open the [Chromium-based app](https://www.figma.com/design/) when I absolutely must — usually to keep my variant and auto-layout chops sharp.
