const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

class PageScrapper {
  /**
   * Create new PageScrapper instance.
   *
   * @param {Boolean} options.silent
   * @return {PageScrapper}
   */
  constructor({ silent = true } = {}) {
    this.silent = silent;
    this.browser = null;
  }

  /**
   * Open the given url.
   *
   * @param {String} url
   * @return {Cheerio}
   */
  async open(url) {
    if (null === this.browser) {
      this.log('🚀 Launching browser...');

      this.browser = await puppeteer.launch();
    }

    const page = await this.browser.newPage();

    this.log(`⏳ Opening url: ${url}...`);

    const response = await page.goto(url);

    const content = await page.content();

    await page.close();

    const $ = cheerio.load(content);

    if (!response.ok()) {
      this.log(`⚠️ HTTP ${response.status()}: ${response.statusText()}`);

      const error = new Error(response.statusText());

      error.status = response.status();
      error.$ = $;

      throw error;
    }

    this.log(`✅ HTTP ${response.status()}: ${response.statusText()}`);

    return $;
  }

  /**
   * Realease resources by closing the active browser.
   *
   * @return {Void}
   */
  async releaseResources() {
    if (this.browser) {
      this.log('🌬 Realeasing browser resources...');

      await this.browser.close();

      this.browser = null;
    }

    this.log('👍🏻 Browser resources are freed.');
  }

  /**
   * Log message.
   *
   * @param {String} message
   * @return {Void}
   */
  log(message) {
    if (!this.silent) {
      console.log(message);
    }
  }
}

module.exports = PageScrapper;
