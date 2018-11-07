const cheerio = require('cheerio');
const got = require('got');

/**
 * Get content type.
 *
 * @param {Object} headers
 * @return {String|Null}
 */
const getContentType = headers => headers.hasOwnProperty('content-type')
  ? headers['content-type']
  : null;

/**
 * Check if content type is HTML.
 *
 * @param {Object} headers
 * @return {Boolean}
 */
const isHtml = headers => {
  const contentType = getContentType(headers);

  if (null === contentType) {
    return false;
  }

  return /text\/html/i.test(contentType);
};

/**
 * Create an error object.
 *
 * @param {String} message
 * @param {Object} options.response
 * @param {Object|Null} options.$
 * @return {Error}
 */
const createError = (message, { response, $ = null }) => {
  const error = new Error(message);
  error.response = response;

  if ($) {
    error.$ = $;
  }

  return error;
};

/**
 * Scrape the given url.
 *
 * @param {String} url
 * @return {Cheerio}
 */
const scrape = async (url) => {
  let response = null;
  let httpError = false;

  try {
    response = await got(url);
  } catch (error) {
    if (!error.hasOwnProperty('response')) {
      throw error;
    }

    response = error.response;
    httpError = true;
  }

  if (!isHtml(response.headers)) {
    throw createError('The page is not an HTML document.', { response });
  }

  const $ = cheerio.load(response.body);

  if (httpError) {
    throw createError(response.statusMessage, { response, $ });
  }

  return $;
};

module.exports = scrape;
