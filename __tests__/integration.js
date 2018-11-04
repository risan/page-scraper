const PageScraper = require('../src');

let scraper = null;

beforeEach(() => {
  scraper = new PageScraper();
});

afterEach(async () => {
  await scraper.releaseResources();
});

test('it can scrape a page', async () => {
  const $ = await scraper.open('https://example.com');

  expect($('title').text().toLowerCase()).toContain('example domain');
  expect($('h1').text().toLowerCase()).toContain('example domain');
  expect($('p').length).toBe(2);
  expect($('a').attr('href')).toContain('iana.org');
});

test('it throws an error on http exception', async () => {
  expect.assertions(3);

  try {
    await scraper.open('https://httpbin.org/status/400');
  } catch (error) {
    expect(error.status).toBe(400);
    expect(error.message.toLowerCase()).toContain('bad request');
    expect(error).toHaveProperty('$');
  }
});
