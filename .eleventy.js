const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const Image = require("@11ty/eleventy-img");
const path = require("path");


module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ "src/**/*.js": "resources" });
    eleventyConfig.addPassthroughCopy({ "src/**/*.wasm": "resources" });
    eleventyConfig.addPassthroughCopy({ "src/**/*.css": "resources" });

    eleventyConfig.addPlugin(syntaxHighlight);

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return dateObj.toLocaleDateString("en-GB", { year: 'numeric', month: 'long', day: 'numeric' });
    });

    eleventyConfig.addShortcode("image", imageShortcode);
    eleventyConfig.addShortcode("cssImage", cssImageShortcode);


    return {
        dir: {
            input: "src",
        }
    }
};

// SHORTCODES

// src: path to image relative to page in input
async function imageShortcode(src, alt) {
    let imageSrc = path.dirname(this.page.inputPath) + "/" + src;

    let metadata = await Image(imageSrc, {
        widths: [600, 1000, 1920, "auto"],
        formats: ["svg", "jpeg"],
        outputDir: "_site/img",
    });

    let imageAttributes = {
        alt,
        sizes: "100vw",
        loading: "lazy",
        decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
}

// src: path to image relative to page in input
async function cssImageShortcode(src) {
    let imageSrc = path.dirname(this.page.inputPath) + "/" + src;

    let metadata = await Image(imageSrc, {
        widths: ["auto"],
        formats: ["jpeg"],
        outputDir: "_site/img",
    });

    return "background-image: url('" + metadata.jpeg[0].url + "')";
}