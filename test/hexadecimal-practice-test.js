// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var suppose = require('suppose');
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
  describe('when prompting for a set of numbers', function () {
    describe('when a valid answer is provided', function () {
      testUtils.createSession();
      testUtils.askQuestion(function respondWithGoodAnswer (questionInfo) {
        // Calculate decimal form
        var a = parseInt(questionInfo.aStr, 16);
        var b = parseInt(questionInfo.bStr, 16);

        // Return the total
        return (a + b).toString(16);
      });

      it('calls back', function () {
        expect(this.questions).to.have.length(1);
      });

      it('asks for 2 hexadecimal numbers between 00 and FF', function () {
        expect(this.questions[0].aStr).to.match(/^[0-9a-f]{2}$/);
        expect(this.questions[0].bStr).to.match(/^[0-9a-f]{2}$/);
      });
    });

    describe('when an invalid answer is provided', function () {
      var firstRun = true;
      testUtils.createSession();
      testUtils.askQuestion(function respondWithBadAnswer (questionInfo) {
        // Calculate decimal form
        var a = parseInt(questionInfo.aStr, 16);
        var b = parseInt(questionInfo.bStr, 16);

        // If we are on the first run, respond with the wrong answer
        if (firstRun) {
          firstRun = false;
          return (a + b + 1).toString(16);
        // Otherwise, return the total
        } else {
          return (a + b).toString(16);
        }
      });

      it('prompts again', function () {
        expect(this.questions).to.have.length(2);
      });
    });
  });
});

describe('A CLI practice session', function () {
  before(function runCliSession (done) {
    // Collect the output into a buffer
    var output = '';
    var saveStream = function (buff) {
      output += buff;
      // process.stdout.write(buff + '');
    };

    // Run our command with a fixed seed
    var that = this;
    suppose(__dirname + '/../bin/hexadecimal-practice', ['--seed', 'hello'])
      .debug({write: saveStream})
      .on(/8b \+ 70/).respond('FB\n')
      .error(done)
      .end(function (code) {
        // Verify we exited properly, save the output, and callback
        that.output = output;
        assert.strictEqual(code, 0, 'Expected "hexadecimal-practice" to exit with 0. Left with "' + code + '"');
        done();
      });
  });

  it('prompts the user', function () {
    expect(this.output).to.match(/\nWhat is the answer for: 8b \+ 70\?/);
  });

  it('allows the user to respond', function () {
    expect(this.output).to.match(/8b \+ 70\?FB/);
  });
});
