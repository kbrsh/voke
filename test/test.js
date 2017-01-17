var Voke = require("../dist/voke.min.js");

var mocha = require("mocha");
var expect = require("chai").expect;

var emitter;

describe('Voke', function() {
  describe('instance', function() {
    it('should create an instance', function() {
      emitter = new Voke();
      expect(emitter).to.not.be.null;
    });
  });

  describe('#on()', function() {
    var tmp;
    it('should create a handler', function() {
      emitter.on('evt', function() {
        tmp = "Called";
      });
      expect(emitter.events['evt'][0]).to.be.a('function');
    });
  });
});
