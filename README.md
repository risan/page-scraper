# Page Scraper

A web page scraper with jQuery like syntax, built on top of [Puppeteer](https://pptr.dev).

## Requirement

* [Node](https://nodejs.org/) version `>= 7.6.0`

## Installation

```bash
$ npm install page-scraper

# Or if you use Yarn
$ yarn add page-scraper
```

## Quick Start

```js
const PageScraper = require('page-scraper');

(async () => {
  // Create a new PageScraper instance.
  const scraper = new PageScraper();

  // Open the target URL.
  const $ = await scraper.open('https://example.com');

  // Extract the page with jQuery like syntax.
  console.log({
    title: $('title').text(),
    heading: $('h1').text(),
    paragraphs: $('p').map((index, el) => $(el).text()).get(),
    link: $('p > a').attr('href')
  });

  // Don't forget to release the resources once you're done
  scraper.releaseResources();
})();
```

Check the [Cheerio documentation](https://cheerio.js.org/) for a complete guide on how to scrape the page using jQuery like syntax.

## Recipe

### Handling HTTP Error

```js
const PageScraper = require('page-scraper');

(async () => {
  const scraper = new PageScraper();

  try {
    const $ = await scraper.open('https://httpbin.org/status/400');
  } catch(error) {
    console.error(error.message); // Get the error message.

    console.error(error.status); // Get the HTTP status code.

    console.error(error.$.html()); // Get the HTML document.
  }

  scraper.releaseResources();
})();
```

### Scraping Multiple Pages

```js
const PageScraper = require('page-scraper');

(async () => {
  const scraper = new PageScraper();

  const $ = await Promise.all([
    scraper.open('https://example.com'),
    scraper.open('https://httpbin.org/html')
  ]);

  console.log({
    heading_1: $[0]('h1').text(),
    heading_2: $[1]('h1').text()
  });

  scraper.releaseResources();
})();
```

## API

### `Constructor`

```js
new PageScraper({ silent: Boolean = true })
```

#### Parameter

* `silent` (type: `Boolean`, default: `true`): Print the log message to the terminal when set to `false`.

### `open(url)`

Scrape the given page URL.

```js
PageScraper.open(url: String): Promise
```

#### Parameter

* `url` (`String`): The page URL to scrape.

#### Return

It returns a `Promise`, which when its resolved we'll get the [`Cheerio`](https://cheerio.js.org/) object.

### `releaseResources()`

Realease all resources. This will close the currently active Puppeteer browser. Call this method once you've done with the scraping.

```js
PageScraper.releaseResources()
```

## License

MIT © [Risan Bagja Pradana](https://bagja.net)
