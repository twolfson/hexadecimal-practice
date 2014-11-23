// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var HexadecimalPractice = require('../');

// Define test utilities
var testUtils = {
  createSession: function () {
    before(function createSessionFn () {
      // Generate a practice session
      var that = this;
      this.questions = [];
      this.practice = new HexadecimalPractice({
        prompt: function (question, done) {
          // When a question is asked, save it
          that.questions.push(questions);

          // Generate an answer
          assert(that.responder, 'Expected `that.responder` to exist for `prompt`. Please define it to answer questions');
          var answer = that.responder(question);

          // Respond with the answer
          process.nextTick(function sendAnswer () {
            done(null, answer);
          });
        }
      });
    });
  }
};

// Start our tests
describe('A hexadecimal practice session', function () {
  describe('when prompting for a set of numbers', function () {
    describe('when a valid answer is provided', function () {
      it('calls back', function () {

      });
    });

    describe.skip('when an invalid answer is provided', function () {
      it('prompts again', function () {

      });
    });
  });
});

describe.skip('A CLI practice session', function () {
  it('prompts the user', function () {

  });

  it('allows the user to respond', function () {

  });

  it('can be terminated', function () {
    // Ctrl+C
  });
});
