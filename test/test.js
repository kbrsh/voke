var Voke = require("../dist/voke.min.js");

var mocha = require("mocha");
var expect = require("chai").expect;

var emitter, tmp, tmp2, tmp3;

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

    describe("global event", function() {
      it('should create a handler', function() {
        emitter.on('*', function(e) {
          tmp3 = e;
        });
        expect(emitter.events['*'][0]).to.be.a('function');
      });
    });
  });

  describe("#off()", function() {
    it('should remove an event listener', function() {
      var handler = function() {
        console.log("Handling");
      }
      emitter.on("off", handler);
      emitter.off("off", handler);
      expect(emitter.events["off"]).to.have.lengthOf(0);
    });
    it('should remove all event listeners without parameters', function() {
      var emitter = new Voke();
      emitter.on("offWithoutParams1", function() {});
      emitter.on("offWithoutParams2", function() {});
      emitter.off();
      expect(emitter.events["offWithoutParams1"]).to.have.lengthOf(0);
      expect(emitter.events["offWithoutParams2"]).to.have.lengthOf(0);
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

    describe('global event emit', function() {
      it('should emit a global event', function() {
        emitter.emit('evt');
        expect(tmp3.type).to.equal("evt");
      });
    });
  });
});
