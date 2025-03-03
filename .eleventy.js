const CacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
const Image = require("@11ty/eleventy-img");

module.exports = (function(eleventyConfig) {
  const env = process.env.NODE_ENV;
  const outputDir = env === "prod" ? "dist" : "dist-dev"

  const cacheBusterOptions = {
    createResourceHash(outputDirectory, url, target) {
      return Date.now();
    }
  };
  eleventyConfig.addPlugin(CacheBuster(cacheBusterOptions));

  eleventyConfig.setUseGitIgnore(false);

  if(env === "prod") {
    eleventyConfig.addPassthroughCopy({ "tmp/postcss": "css" });
    eleventyConfig.addPassthroughCopy({ ".htaccess-prod": ".htaccess" });
  } else {
    eleventyConfig.addPassthroughCopy({ "tmp/scss/**/*.css": "css" });
    eleventyConfig.addPassthroughCopy({ "tmp/scss/**/*.css.map": "css" });
    eleventyConfig.addPassthroughCopy({ ".htaccess-dev": ".htaccess" });
  }
  eleventyConfig.addPassthroughCopy({ "tmp/babeljs": "js" });
  eleventyConfig.addPassthroughCopy({ "src/internals/favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "src/internals/vendor-min-js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addNunjucksFilter("is_string", function(obj) {
    return typeof obj === "string";
  });

  eleventyConfig.addShortcode("environmentData", function(prod, dev) {
    return env === "prod" ? prod : dev;
  });

  eleventyConfig.addNunjucksAsyncShortcode("responsiveImage", async function(src, alt, classList="responsive--thirdwide", container = "figure", outputFormat = "jpeg") {
    if(alt === undefined) {
      throw new Error(`No alt text provided on responsiveImage with source ${src}`);
    }

    let stats = await Image(src, {
      widths: [250, 500, 1000, null],
      formats: [outputFormat],
      urlPath: "/img/",
      outputDir: `./${outputDir}/img/`,
    });
    let lowestSrc = stats[outputFormat][0];
    let highestSrc = stats[outputFormat][stats[outputFormat].length - 1];
    let sizes = "250w 500w 1000w 100vw"; // TODO: Make sure you customize this!

    let containerStart = "", containerEnd = "", linkStart = "", linkEnd = "";

    if(container !== null && container !== "basic") {
      containerStart = `<${container} class="responsive ${classList}">`;
      containerEnd = `</${container}>`;
    }

    if(container !== "basic") {
      linkStart = `<a href="${highestSrc.url}" class="responsive__link" itemprop="contentUrl" data-size="${highestSrc.width}x${highestSrc.height}">`;
      linkEnd = `</a>`;
    }

    return `${containerStart}${linkStart}
    <picture class="responsive__picture">
      ${Object.values(stats).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => `${entry.url} ${entry.width}w`).join(", ")}" sizes="${sizes}">`;
      }).join("\n")}
        <img
          src="${lowestSrc.url}"
          width="${lowestSrc.width}"
          height="${lowestSrc.height}"
          alt="${alt}"
          class="responsive__img">
      </picture>${linkEnd}${containerEnd}`;
  });
  
  eleventyConfig.addNunjucksAsyncShortcode('italics', async(text) => {
    var t = text.split(/\s+/)
    var o = `<span aria-label="[in italics] ${text}" class="a11y--italics">`
    
    t.forEach((item) => {
      o += `<em>${item}</em> `
    })
    
    return o.trim() + "</span>";
  })
  
  eleventyConfig.addNunjucksAsyncShortcode('svg', async (src, label, className, height/*, alt, sizes*/) => {
    let metadata = await Image(src, {
      formats: ['svg'],
      dryRun: true,
    })
    
    var css = className ? `class="${className}" ` : ``;
    var height = height ? ` style="height:${height}"` : ``;
    var attrs = ''; //` aria-label="${label}" ${css}`;

    var tag = metadata.svg[0].buffer.toString()
    return tag.slice(0, 4) + attrs + height + tag.slice(4);
  })
  
  /* To Title Case © 2018 David Gouch | https://github.com/gouch/to-title-case */
  
  // eslint-disable-next-line no-extend-native
  String.prototype.toTitleCase = function () {
    'use strict'
    var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i
    var alphanumericPattern = /([A-Za-z0-9\u00C0-\u00FF])/
    var wordSeparators = /([ :–—-])/
    
    return this.split(wordSeparators)
    .map(function (current, index, array) {
      if (
        /* Check for small words */
        current.search(smallWords) > -1 &&
        /* Skip first and last word */
        index !== 0 &&
        index !== array.length - 1 &&
        /* Ignore title end and subtitle start */
        array[index - 3] !== ':' &&
        array[index + 1] !== ':' &&
        /* Ignore small words that start a hyphenated phrase */
        (array[index + 1] !== '-' ||
          (array[index - 1] === '-' && array[index + 1] === '-'))
      ) {
        return current.toLowerCase()
      }
      
      /* Ignore intentional capitalization */
      if (current.substr(1).search(/[A-Z]|\../) > -1) {
        return current
      }
      
      /* Ignore URLs */
      if (array[index + 1] === ':' && array[index + 2] !== '') {
        return current
      }
      
      /* Capitalize the first letter */
      return current.replace(alphanumericPattern, function (match) {
        return match.toUpperCase()
      })
    })
    .join('')
  }
  
  eleventyConfig.setServerOptions({
    module: "@11ty/eleventy-server-browsersync",
    
    // Default Browsersync options shown:
    files: ["tmp"],
    port: 8080,
    open: false,
    notify: false,
    ui: false,
    ghostMode: false
  });

  return {
    dir: {
      input: "src/content",
      output: outputDir,
      includes: "../blocks",
      layouts: "../layouts"
    }
  }
});
