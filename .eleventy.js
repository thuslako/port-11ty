
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginNavigation = require("@11ty/eleventy-navigation");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = (eleventyConfig)=>{
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.setTemplateFormats([
        "njk",
        "md",
        "css",
        "jpg",
        "png",
        "gif"
    ]);
    
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");

     /* Markdown Overrides */
    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor, {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "#"
    });
    eleventyConfig.setLibrary("md", markdownLibrary);

    // Browsersync Overrides
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, browserSync) {
                const content_404 = fs.readFileSync('_site/404.html');

                browserSync.addMiddleware("*", (req, res) => {
                // Provides the 404 content without redirect.
                res.write(content_404);
                res.end();
                });
            },
        },
        ui: false,
        ghostMode: false
    });

    eleventyConfig.addPlugin(lazyImagesPlugin);
    eleventyConfig.addCollection('albums', collection => {
        return [
          ...collection.getFilteredByGlob('./albums/**/*.njk')
        ].reverse();
    });

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid"
        ],
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",

        // These are all optional, defaults are shown:
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};