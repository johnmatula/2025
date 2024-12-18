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

  eleventyConfig.addPassthroughCopy({ "tmp/css": "css" });
  eleventyConfig.addPassthroughCopy({ "tmp/js": "js" });
  //eleventyConfig.addPassthroughCopy({ "src/internals/fonts": "fonts" }); fonts are base64'd at the moment
  eleventyConfig.addPassthroughCopy({ "src/internals/favicon": "/" });
  eleventyConfig.addPassthroughCopy({ "src/internals/vendor-min-js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" }); // unnecessary???

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

  //eleventyConfig.addLayoutAlias("case-study", "../templates/case-study/case-study.njk");

  return {
    dir: {
      input: "src/content",
      output: outputDir,
      includes: "../blocks",
      layouts: "../layouts"
    }
  }
});
