// Load in dependencies
var assert = require('assert');
var zpad = require('zpad');

/**
  Define a constructor that allows for asking hex questions to an arbitrary interface
  @param params {Object} Container for parameters
  @param params.prompt {Function} Async function that handles prompting user and calling back with result
    // TODO: Document signature
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
  this._prompt = params.prompt;
}
HexadecimalPractice.prototype = {
  // TODO: Add `options` with `subtraction`, `digit` count
  ask: function (done) {
    // Generate numbers to add
    var a = Math.floor(Math.random() * 255);
    var aStr = a.toString(16);
    var b = Math.floor(Math.random() * 255);
    var bStr = b.toString(16);

    // Pad our numbers (e.g. 3 -> 03)
    aStr = zpad(aStr, 2);
    bStr = zpad(bStr, 2);

    // Ask the question
    var wrongGuesses = 0;
    var that = this;
    function askQuestion() {
      that._prompt({
        a: a,
        b: b,
        aStr: aStr,
        bStr: bStr,
        wrongGuesses: wrongGuesses
      }, function handleResponse (err, answer) {
        // If there was an error, callback with it
        if (err) {
          return done(err);
        }

        // Otherwise, check the answer
        assert.strictEqual(typeof answer, 'string', 'Answers must be written as strings');
        var actualResult = parseInt(answer, 16);
        var expectedResult = a + b;

        // If they are not valid, reprompt
        if (actualResult !== expectedResult) {
          wrongGuesses += 1;
          askQuestion();
        // Otherwise, callback with success
        } else {
          done();
        }
      });
    }
    askQuestion();
  }
};

// Export our function
module.exports = HexadecimalPractice;
