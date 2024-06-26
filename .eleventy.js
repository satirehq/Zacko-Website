const { DateTime } = require("luxon");
module.exports = function(eleventyConfig) {
  
    //Getting css, js, img, etc.
    eleventyConfig.addPassthroughCopy("src/art");
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/media");
    eleventyConfig.addPassthroughCopy("src/posts");

  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/blog/posts/**/*.md');
  })
    

  eleventyConfig.addFilter("justYear", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });
  
    return {
      markdownTemplateEngine: "njk",
      htmlTemplateEngine: "njk",
      dir: {
        input: "src",
        output: "published",
        includes: "_includes",
      }
    }
    
  };
  
