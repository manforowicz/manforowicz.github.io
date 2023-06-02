module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("src/style.css");
    eleventyConfig.addPassthroughCopy("src/style.css");
    
    eleventyConfig.addWatchTarget("src/js/");
    eleventyConfig.addPassthroughCopy("src/js/");

    eleventyConfig.addWatchTarget("src/img/");
    eleventyConfig.addPassthroughCopy("src/img/");
    return {
        dir: {
            input: "src",
        }
    }
};

