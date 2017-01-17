var Voke = require("../dist/voke.min.js");

var mocha = require("mocha");
var expect = require("chai").expect;

var emitter, tmp;

describe('Voke', function() {
  describe('instance', function() {
    it('should create an instance', function() {
      emitter = new Voke();
      expect(emitter).to.not.be.null;
    });
  });

  describe('#on()', function() {
    it('should create a handler', function() {
      emitter.on('evt', function() {
        tmp = "Called";
      });
      expect(emitter.events['evt'][0]).to.be.a('function');
    });
  });

  describe('#emit()', function() {
    it('should emit an event', function() {
      emitter.emit('evt');
      expect(tmp).to.equal('Called');
    });
  });
});
