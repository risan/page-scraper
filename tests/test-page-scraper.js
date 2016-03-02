var chai = require('chai');
var assert = require('assert');
var PageScraper = require('../index');

describe('PageScraper', function() {
  it('should be able to scrape a web page', function(done) {
    var pageScraper = new PageScraper({
      baseUrl: 'http://www.mocky.io/v2/'
    });

    pageScraper.scrape('56d755d4130000342854393c', function(error, $) {
      var title = $('h1.page-title').text().trim();
      var content = $('p.page-content').text().trim();

      assert.equal(title, 'foo');
      assert.equal(content, 'bar');
      done();
    });
  });
});
