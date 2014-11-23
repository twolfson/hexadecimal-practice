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
          that.questions.push(question);

          // Generate an answer
          assert(that.responder,
            'Expected `that.responder` to exist for `prompt`. Please define it to answer questions');
          var answer = that.responder(question);

          // Respond with the answer
          process.nextTick(function sendAnswer () {
            done(null, answer);
          });
        }
      });
    });
    after(function cleanup () {
      // Clean up our questions and session
      delete this.questions;
      delete this.practice;
    });
  },
  askQuestion: function (responder) {
    before(function askQuestionFn (done) {
      // Save our responder and ask the quesiton
      this.responder = responder;
      this.practice.ask(done);
    });
    after(function cleanup () {
      // Clean up our responder
      delete this.responder;
    });
  }
};

// Start our tests
describe('A hexadecimal practice session', function () {
  testUtils.createSession();

  describe('when prompting for a set of numbers', function () {
    describe('when a valid answer is provided', function () {
      testUtils.askQuestion(function respondWithGoodAnswer (question) {
        console.log(question);
      });

      it('calls back', function () {
        expect(this.questions).to.equal(1);
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
