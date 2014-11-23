// Load in dependencies
var assert = require('assert');

/**
  Define a constructor that allows for asking hex questions to an arbitrary interface
  @param params {Object} Container for parameters
  @param params.prompt {Function} Async function that handles prompting user and calling back with result
  // In the future, we can add things like digit length
  // Although, that might be at the `question` phase
 */
// DEV: We don't build in CLI handling so this library can be reused in a web UI
function HexadecimalPractice(params) {
  // Assert against our parameters
  assert(params,
    '`params` was not provided to the `HexadecimalPractice` constructor. Please provide it.');
  assert(params.prompt,
    '`params.prompt` was not provided to the `HexadecimalPractice` constructor. Please provide it.');

  // Save the prompt mechanism for later
  this.prompt = params.prompt;
}
HexadecimalPractice.prototype = {
  // TODO: Add `options` with `subtraction`, `digit` count
  ask: function (done) {
    // Generate numbers to add
    var a = Math.floor(Math.random() * 255).toString(16);
    var b = Math.floor(Math.random() * 255).toString(16);
    console.log(a, b);
    // return [a, b];
  }
};

// Export our function
module.exports = HexadecimalPractice;
