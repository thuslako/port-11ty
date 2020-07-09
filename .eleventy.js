
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginNavigation = require("@11ty/eleventy-navigation");

module.exports = (eleventyConfig)=>{
    eleventyConfig.setLiquidOptions({
        dynamicPartials: true,
        strict_filters: true,
        root: ["_includes"]
    });
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.setTemplateFormats([
        "md",
        "css",
        "jpg",
        "png",
        "gif"
    ]);
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
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

    eleventyConfig.addCollection('albums', collection => {
        return [
          ...collection.getFilteredByGlob('./albums/**/*.md')
        ].reverse();
    });

    return {
        templateFormats: [
            "md",
            "ejs",
            "css",
            "svg",
            "png",
        ],
        passthroughFileCopy: true
      };
    
};