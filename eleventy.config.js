const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const pluginNavigation = require("@11ty/eleventy-navigation");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");
const Image = require("@11ty/eleventy-img");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(lazyImagesPlugin);
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");

  const options = {
    html: true,
    breaks: true,
    linkify: true,
  };

  const opts = {
    symbol: "#",
  };

  eleventyConfig.setLibrary(
    "md",
    markdownIt(options).use(markdownItAnchor, opts)
  );


  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync("_site/404.html");
        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  //write image shortcode to generate webp, taking image url and description images using eleventy-img
  eleventyConfig.addNunjucksAsyncShortcode("image", async (src, alt, sizes) => {
    if (!alt) {
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }
    let metadata = await Image(src, {
      widths: ["auto"],
      formats: ["webp"],
      urlPath: "/assets/",
      outputDir: "./_site/assets/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };
    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "pages",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
  };
};
