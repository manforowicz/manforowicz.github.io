// Code syntax highlighting plugin.
// This plugin automatically formats all code during build.
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  // All folders called "assets" will be blindly copied
  // into the _site/assets output folder.
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
  eleventyConfig.addFilter('keys', obj => Object.keys( obj ) );

  // Remove "all" and "post" from this list.
  eleventyConfig.addFilter("filterTagList", (tags) => {
		return (tags || []).filter(tag => !["all", "post"].includes(tag));
	});
  

  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    // Change the input and output directory
    dir: {
      input: "src",
      output: "public"
    }
  }
};