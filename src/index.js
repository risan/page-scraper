const cheerio = require('cheerio');
const got = require('got');

/**
 * Check if object has the given property.
 *
 * @param {Object} obj
 * @param {String} prop
 * @return {Boolean}
 */
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

/**
 * Get content type.
 *
 * @param {Object} headers
 * @return {String|Null}
 */
const getContentType = headers => (hasProperty(headers, 'content-type')
  ? headers['content-type']
  : null);

/**
 * Check if content type is HTML.
 *
 * @param {Object} headers
 * @return {Boolean}
 */
const isHtml = (headers) => {
  const contentType = getContentType(headers);

  if (contentType === null) {
    return false;
  }

  return /text\/html/i.test(contentType);
};

/**
 * Create an error object.
 *
 * @param {String} message
 * @param {Object} options.res
 * @param {Object|Null} options.$
 * @return {Error}
 */
const createError = (message, { res, $ = null }) => {
  const error = new Error(message);
  error.response = res;

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
  let res = null;
  let httpError = false;

  try {
    res = await got(url);
  } catch (error) {
    if (!hasProperty(error, 'response')) {
      throw error;
    }

    res = error.response;
    httpError = true;
  }

  if (!isHtml(res.headers)) {
    throw createError('The page is not an HTML document.', { res });
  }

  const $ = cheerio.load(res.body);

  if (httpError) {
    throw createError(res.statusMessage, { res, $ });
  }

  return $;
};

module.exports = scrape;
