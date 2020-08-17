
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginNavigation = require("@11ty/eleventy-navigation");
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = (eleventyConfig)=>{
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(lazyImagesPlugin);
    eleventyConfig.addPassthroughCopy("albums");
    eleventyConfig.addPassthroughCopy("img");
    eleventyConfig.addPassthroughCopy("css");
    eleventyConfig.addPassthroughCopy("js");

    /* Markdown Overrides */
    let markdownIt = require("markdown-it");
    let markdownItAnchor = require("markdown-it-anchor");

    let options = {
        html: true,
        breaks: true,
        linkify: true
    };

    let opts = {
        permalink: true,
        permalinkClass: "direct-link",
        permalinkSymbol: "#"
    };

    eleventyConfig.setLibrary("md", markdownIt(options)
        .use(markdownItAnchor, opts)
    );

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
          }
        }
    });
    eleventyConfig.addCollection('albums', collection => {
        return [
          ...collection.getFilteredByGlob('./albums/**/*.md')
        ].reverse();
    });

    return {
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid"
        ],
        pathPrefix: "/",

        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        passthroughFileCopy: true,
        
        dir: {
            input: ".",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
};