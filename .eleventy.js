// Code syntax highlighting plugin.
// This plugin automatically formats all code during build.
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Compresses image plugin
const Image = require("@11ty/eleventy-img");

// Node JS path functions
const path = require('path');

module.exports = function (eleventyConfig) {
  // All folders called "assets" will be blindly copied
  // into the assets output folder.
  eleventyConfig.addPassthroughCopy({ "src/**/assets/*": "assets/" });

  // Displays date in a human-readable way.
  // Usage: {{ <your date> | postDate }}
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' });
  });

  // Displays date in a machine-readable way.
  // Usage: {{ <your date> | machineDate }}
  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return dateObj.toISOString();
  });

  // Get all keys of a collection.
  eleventyConfig.addFilter('keys', obj => Object.keys(obj));

  // Remove "all" and "post" from this list.
  eleventyConfig.addFilter("filterTagList", (tags) => {
    return (tags || []).filter(tag => !["all", "post"].includes(tag));
  });


  eleventyConfig.addPlugin(syntaxHighlight);

  // Image shortcode
  eleventyConfig.addShortcode("image", async function (src, alt, width = 90) {
    let metadata = await Image(`${path.dirname(this.page.inputPath)}/${src}`, {
      widths: [400, 800, 1200, "auto"],
      formats: ["jpeg"],
      urlPath: "/img/",
      outputDir: "public/img/"
    });

    let imageAttributes = {
      alt,
      sizes: "(max-width: 50rem) 100vw, 50rem",
      style: `width: ${width}%;`,
      loading: "lazy",
      decoding: "async",
    };

    return `<a href="${src}">${Image.generateHTML(metadata, imageAttributes)}</a>`;
  });

  return {
    // Change the input and output directory
    dir: {
      input: "src",
      output: "public"
    }
  }
};