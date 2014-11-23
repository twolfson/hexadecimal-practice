// Load in dependencies
var assert = require('assert');
var hexadecimalPractice = require('../');

// Start our tests
describe('hexadecimal-practice', function () {
  it('returns awesome', function () {
    assert.strictEqual(hexadecimalPractice(), 'awesome');
  });
});
