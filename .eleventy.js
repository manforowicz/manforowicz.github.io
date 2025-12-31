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

  eleventyConfig.addPlugin(syntaxHighlight);

  // Image shortcode
  eleventyConfig.addShortcode("image", async function (src, alt, width = 90) {
    if (!alt) {
      throw new Error(`Missing alt text for image: ${src}`);
    }

    // Directory containing the page
    const inputDir = path.dirname(this.page.inputPath);
    // Input path of the image
    const inputPath = path.join(inputDir, "assets", src);
    // URL to original image (relies on assets passthrough copy above)
    const originalUrl = `/assets/${src}`;

    let metadata = await Image(inputPath, {
      widths: [400, 800, 1200],
      formats: ["jpg"],
      urlPath: "/img/",
      outputDir: "public/img/",
      filenameFormat: (id, src, width, format) => {
        const imgName = path.parse(src).name;
        `${imgName}-${width}.${format}`
      }
    });

    let imageAttributes = {
      alt,
      sizes: "(max-width: 50rem) 100vw, 50rem",
      style: `width: ${width}%;`,
      loading: "lazy",
      decoding: "async",
    };

    return `
      <a href="${originalUrl}" target="_blank" rel="noopener">
        ${Image.generateHTML(metadata, imageAttributes)}
      </a>
    `;
  });

  return {
    // Change the input and output directory
    dir: {
      input: "src",
      output: "public"
    }
  }
};
