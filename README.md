# Page Scraper

Web page scraper with a jQuery-like syntax for Node. Powered by [got](https://github.com/sindresorhus/got) and [cheerio](https://cheerio.js.org/).

## Requirement

* [Node](https://nodejs.org/) version `>= 8.0.0`

## Installation

```bash
$ npm install page-scraper

# Or if you use Yarn
$ yarn add page-scraper
```

## Quick Start

```js
const scrape = require('page-scraper');

(async () => {
  const $ = await scrape('https://example.com');

  // Extract the page with jQuery like syntax.
  console.log({
    title: $('title').text(),
    heading: $('h1').text(),
    paragraphs: $('p').map((index, el) => $(el).text()).get(),
    link: $('p > a').attr('href')
  });
})();
```

Check the [cheerio documentation](https://cheerio.js.org/) for a complete guide on how to scrape the page using jQuery like syntax.

## Recipe

### Handling Error

```js
const scrape = require('page-scraper');

(async () => {
  try {
    const $ = await scrape('https://httpbin.org/status/400');
  } catch(error) {
    // The error message.
    console.error(error.message);

    if (error.hasOwnProperty('response')) {
      // The HTTP status code.
      console.error(error.response.statusCode);
    }

    if (error.hasOwnProperty('$')) {
      // The HTML document.
      console.error(error.$.html());
    }
  }
})();
```

Note that if the page is not an HTML document, it will throw an error too.

```js
const scrape = require('./src');

(async () => {
  try {
    const $ = await scrape('https://httpbin.org/json');
  } catch(error) {
    console.error(error.message);

    if (error.hasOwnProperty('response')) {
      // The response body.
      console.error(error.response.body);
    }
  }
})();
```

### Scraping Multiple Pages

```js
const scrape = require('./src');

(async () => {
  const $ = await Promise.all([
    scrape('https://example.com'),
    scrape('https://httpbin.org/html')
  ]);

  console.log({
    heading_1: $[0]('h1').text(),
    heading_2: $[1]('h1').text()
  });
})();
```

## License

MIT © [Risan Bagja Pradana](https://bagja.net)
