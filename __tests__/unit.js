const PageScraper = require('../src');

test('silent option is true by default', () => {
  const scraper = new PageScraper();

  expect(scraper.silent).toBe(true);
});

test('it can receive silent option', () => {
  const scraper = new PageScraper({ silent: false });

  expect(scraper.silent).toBe(false);
});

test('it can release resources', async () => {
  const scraper = new PageScraper();

  const close = jest.fn();

  scraper.browser = { close };

  await scraper.releaseResources();

  expect(close).toHaveBeenCalledTimes(1);
});
