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

## API

### `PageScraper()`

Create a new instance of `PageScraper`.

```js
new PageScraper({ silent: Boolean = true })
```

* `silent` (default: `true`): Do not print the log message to the terminal.

### `PageScraper.open`

Scrape the given page URL.

```js
PageScraper.open(url: String): Promise
```

* `url`: The page URL that we want to scrape.
* It returns a `Promise`, which when its resolved we'll get the [`Cheerio`](https://cheerio.js.org/) object.

### `PageScraper.releaseResources`

Realease all resources. This will close the currently active Puppeteer browser.

```js
PageScraper.releaseResources(): Promise
```

## License

MIT © [Risan Bagja Pradana](https://bagja.net)
