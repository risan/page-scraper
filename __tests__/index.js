/* global jest:false, test:false, expect:false */
const got = require("got");
const scrape = require("../src");

jest.mock("got");

const body = `
  <html>
    <title>foo</title>
    <body>
      <h1>foo bar</h1>
      <a href="http://example.com">foo</a>
    </body>
  </html>
`;

test("it can scrape a page", async () => {
  got.mockResolvedValue({
    headers: {
      "content-type": "text/html"
    },
    body
  });

  const $ = await scrape("http://example.com");

  expect($("title").text()).toBe("foo");

  expect($("h1").text()).toBe("foo bar");

  expect($("a").attr("href")).toBe("http://example.com");
});

test("it throws an error on http exception", async () => {
  const errorValue = new Error();

  errorValue.response = {
    statusCode: 400,
    statusMessage: "bad request",
    headers: {
      "content-type": "text/html"
    },
    body
  };

  got.mockRejectedValue(errorValue);

  expect.assertions(4);

  try {
    await scrape("http://example.com");
  } catch (error) {
    expect(error.response.statusCode).toBe(400);

    expect(error.message).toBe("bad request");

    expect(error).toHaveProperty("$");

    expect(error.$("h1").text()).toBe("foo bar");
  }
});

test("it throws an error if the page is not an HTML", async () => {
  got.mockResolvedValue({
    statusCode: 200,
    headers: {
      "content-type": "application/json"
    }
  });

  expect.assertions(3);

  try {
    await scrape("http://example.com");
  } catch (error) {
    expect(error.response.statusCode).toBe(200);

    expect(error.message.toLowerCase()).toContain("page is not an html");

    expect(error.$).toBeUndefined();
  }
});
