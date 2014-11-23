// Load in dependencies
var assert = require('assert');
var expect = require('chai').expect;
var suppose = require('suppose');

// Define test utilties
var testUtils = {
  run: function (params) {
    assert(params.cmd, '`params.cmd` was not provided');
    assert(params.args, '`params.args` was not provided');
    assert(params.responses, '`params.responses` was not provided');
    before(function runCliSession (done) {
      // Collect the output into a buffer
      var output = '';
      var saveStream = function (buff) {
        output += buff;
        // process.stdout.write(buff + '');
      };

      // Run the command with its responses
      var that = this;
      var _suppose = suppose(params.cmd, params.args)
        .debug({write: saveStream});
      params.responses.forEach(function addResponse (response) {
        _suppose.on(response[0]).respond(response[1]);
      });
      _suppose
        .error(done)
        .end(function (code) {
          // Verify we exited properly, save the output, and callback
          that.output = output;
          assert.strictEqual(code, 0, 'Expected "hexadecimal-practice" to exit with 0. Left with "' + code + '"');
          done();
        });
    });
    after(function cleanup () {
      delete this.output;
    });
  }
};

// Start our tests
describe('A CLI practice session', function () {
  // Run our command with a fixed seed
  testUtils.run({
    cmd: __dirname + '/../bin/hexadecimal-practice',
    args: ['--seed', 'hello'],
    responses: [
      [/8b \+ 70/, 'FB\n']
    ]
  });

  it('prompts the user', function () {
    expect(this.output).to.match(/\nWhat is the answer for: 8b \+ 70\?/);
  });

  it('allows the user to respond', function () {
    expect(this.output).to.match(/8b \+ 70\? FB/);
  });
});

describe('A CLI practice session with high digits', function () {
  testUtils.run({
    cmd: __dirname + '/../bin/hexadecimal-practice',
    args: ['--seed', 'hello', '--maximum-digits', '3'],
    responses: [
      [/8bd \+ 709/, 'FC6\n']
    ]
  });

  it('prompts the user with high digits', function () {
    expect(this.output).to.match(/\nWhat is the answer for: 8bd \+ 709\?/);
  });
});
