var Voke = require("../dist/voke.min.js");

var mocha = require("mocha");
var expect = require("chai").expect;

var emitter, tmp, tmp2;

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

    it('should create a handler that takes an event', function() {
      emitter.on('evt', function(e) {
        tmp2 = e;
      });
      expect(emitter.events['evt'][1]).to.be.a('function');
    });
  });

  describe('#emit()', function() {
    it('should emit an event', function() {
      emitter.emit('evt');
      expect(tmp).to.equal('Called');
    });

    it('should provide the event type', function() {
      emitter.emit('evt');
      expect(tmp2.type).to.equal('evt');
    });

    it('should be able to pass custom data', function() {
      emitter.emit('evt', {custom: true});
      expect(tmp2.custom).to.equal(true);
    });

    it("should throw error if event doesn't exist", function() {
      var errFn = function() {
        emitter.emit('nonexistent');
      }
      expect(errFn).to.throw(Error);
    });
  });
});
