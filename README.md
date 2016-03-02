# Page Scraper

## Installation

```bash
npm install page-scraper --save
```

## Basic Usage

```js
// Import the Page Scraper module.
var PageScraper = require('page-scraper');

// Create an instance of Page Scraper.
var pageScraper = new PageScraper({
    baseUrl: 'http://example.com'
});

// Scrape the page http://example.com/foo
pageScraper.scrape('/foo', function(error, $) {
    var title = $('h1.page-title').text();
    var content = $('p.page-content').text();

    console.log(title);
    console.log(content);
});
```
