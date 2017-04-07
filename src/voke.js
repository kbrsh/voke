(function(root, factory) {
  (typeof module === "object" && module.exports) ? module.exports = factory() : root.Voke = factory();
}(this, function() {

    function Voke() {
    	this.events = {};
    }


    Voke.prototype.on = function(event, handler) {
      var handlers = this.events[event];
    	if(handlers !== undefined) {
      	handlers.push(handler);
      } else {
      	this.events[event] = [handler];
      }
    }

    Voke.prototype.off = function(event, handler) {
      if(event === undefined) {
        this.events = {};
      } else if(handler === undefined) {
        this.events[event] = [];
      } else {
        var handlers = this.events[event];
        var index = handlers.indexOf(handler);
        if(index !== -1) {
        	handlers.splice(index, 1);
        }
      }
    }

    Voke.prototype.emit = function(event, customMeta) {
      var meta = customMeta || {};
      meta.type = event;

      var handlers = this.events[event];
      var globalHandlers = this.events["*"];

      for(var i = 0; i < handlers.length; i++) {
      	handlers[i](meta);
      }

      if(this.events["*"]) {
        for(var i = 0; i < globalHandlers.length; i++) {
          globalHandlers[i](meta);
        }
      }

    }

    return Voke;
}));
