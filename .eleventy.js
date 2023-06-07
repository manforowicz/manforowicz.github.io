const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("src/style.css");
    eleventyConfig.addPassthroughCopy("src/style.css");
    
    eleventyConfig.addWatchTarget("src/js/");
    eleventyConfig.addPassthroughCopy("src/js/");

    eleventyConfig.addWatchTarget("src/img/");
    eleventyConfig.addPassthroughCopy("src/img/");

    eleventyConfig.addWatchTarget("src/resources/");
    eleventyConfig.addPassthroughCopy("src/resources/");

    eleventyConfig.addPlugin(syntaxHighlight);

    return {
        dir: {
            input: "src",
        }
    }
};