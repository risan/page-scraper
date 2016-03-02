# Page Scraper

Web page scraper for Node.js based on [Request](https://github.com/request/request) and [Cheerio](https://github.com/cheeriojs/cheerio).

## Dependencies

This module relies on the following packages to work:

* [Request](https://github.com/request/request)
* [Cheerio](https://github.com/cheeriojs/cheerio)
* [Node Extend](https://github.com/justmoon/node-extend)

## Installation

To install this package using [NPM](https://www.npmjs.com), simply run the following command inside your project directory:

```bash
npm install page-scraper --save
```

The other way is to add the `page-scraper` package into your `package.json` dependencies list:

```json
"dependencies": {
    "page-scraper": "^1.0.0"
}
```

Once you've updated your `package.json` file, run the following command to install it:

```bash
npm install
```

## Basic Usage

Here's some simple usage of this page scraper module.

```js
// Import the Page Scraper module.
var PageScraper = require('page-scraper');

// Create an instance of Page Scraper.
var pageScraper = new PageScraper({
    baseUrl: 'http://example.com'
});

// Scrape the page http://example.com/foo
pageScraper.scrape('/foo', function(error, $) {
    // An error occured.
    if (error) {
        console.error(error);
        return;
    }

    // Use the `$` to extract the page data.
    var title = $('h1.page-title').text();
    var content = $('p.page-content').text();

    console.log(title);
    console.log(content);
});
```
