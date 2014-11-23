// Load in dependencies
var assert = require('assert');
var seedrandom = require('seedrandom');

/**
  Define a constructor that allows for asking hex questions to an arbitrary interface
  @param params {Object} Container for parameters
  @param params.prompt {Function} Async function that handles prompting user and calling back with result
    // TODO: Document signature
  @param [params.seed] {Mixed} Optional seed to use for random number generation. Useful for testing
    If not provided, we will use vanilla `Math.random()`
  @param [params.maximumDigits] {String} Maximum amount of digits to ask with (hexadecimal based)
    If not provided, we default to '2' (i.e. maximum is `FF`)
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

  // Determine how many digits to show
  var maxDigitsHex = params.maximumDigits || '2';
  this.maxDigits = parseInt(maxDigitsHex, 16);
  assert(!isNaN(this.maxDigits),
    '`params.maximumDigits`, "' + params.maximumDigits + '", was parsed to `NaN` upon processing. ' +
    'Please provide valid hexadecimal');

  // Determine how to generate random numbers
  this.randomNumberGenerator = Math.random;
  // If we were given a seed, use `seedrandom`
  if (params.seed !== undefined) {
    var rng = seedrandom(params.seed);
    this.randomNumberGenerator = rng;
  }
}
HexadecimalPractice.prototype = {
  // TODO: Add `options` with `subtraction`, `digit` count
  ask: function (done) {
    // Generate numbers to add
    var a = Math.floor(this.randomNumberGenerator() * 255);
    var aStr = a.toString(16);
    var b = Math.floor(this.randomNumberGenerator() * 255);
    var bStr = b.toString(16);

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
