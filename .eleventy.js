const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/**/assets/*": "assets/" });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' });
  });

  eleventyConfig.addFilter("machineDate", (dateObj) => {
    return dateObj.toISOString();
  });

  eleventyConfig.addFilter("toDate", (dateStr) => {
    if (!dateStr) {
      return undefined;
    } else {
      return new Date(dateStr);
    }
    
  });

  eleventyConfig.addFilter('keys', obj => Object.keys( obj ) );

  eleventyConfig.addFilter("filterTagList", (tags) => {
		return (tags || []).filter(tag => !["all", "post"].includes(tag));
	});

  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "src",
    }
  }
};