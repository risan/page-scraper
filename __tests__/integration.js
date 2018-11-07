const scrape = require('../src');

test('it can scrape a page', async () => {
  const $ = await scrape('https://example.com');

  expect($('title').text().toLowerCase()).toContain('example domain');
  expect($('h1').text().toLowerCase()).toContain('example domain');
  expect($('p').length).toBe(2);
  expect($('a').attr('href')).toContain('iana.org');
});

test('it throws an error on http exception', async () => {
  expect.assertions(3);

  try {
    await scrape('https://httpbin.org/status/400');
  } catch (error) {
    expect(error.response.statusCode).toBe(400);
    expect(error.message.toLowerCase()).toContain('bad request');
    expect(error).toHaveProperty('$');
  }
});

test('it throws an error if the page is not an HTML', async () => {
  expect.assertions(3);

  try {
    await scrape('https://httpbin.org/json');
  } catch (error) {
    expect(error.response.statusCode).toBe(200);
    expect(error.message.toLowerCase()).toContain('page is not an html');
    expect(error.$).toBeUndefined();
  }
});
