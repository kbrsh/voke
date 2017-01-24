/*
* Voke 1.0.0
* Copyright 2017, Kabir Shah
* https://github.com/KingPixil/voke/
* Free to use under the MIT license.
* https://kingpixil.github.io/license
*/
(function(root, factory) {
  (typeof module === "object" && module.exports) ? module.exports = factory() : root.Voke = factory();
}(this, function() {

		var error = function(msg) {
    	throw new Error('[Wake] ERR: ' + msg);
    }

    function Voke() {
    	this.events = {};
    }


    Voke.prototype.on = function(event, action) {
    	if(this.events[event]) {
      	this.events[event].push(action);
      } else {
      	this.events[event] = [action];
      }
    }

    Voke.prototype.off = function(event, action) {
      if(!event) {
        for(var handler in this.events) {
          this.events[handler] = [];
        }
        return;
      }
      var index = this.events[event].indexOf(action);
      if(index !== -1) {
      	this.events[event].splice(index, 1);
      }
    }

    Voke.prototype.emit = function(event, meta) {
    	if(!this.events[event]) {
      	error("Event '" + event + "' Not Found");
        return;
      }

      var evtObj = meta || {};
      evtObj.type = event;

      for(var i = 0; i < this.events[event].length; i++) {
      	this.events[event][i](evtObj);
      }

      if(this.events["*"]) {
        for(var i = 0; i < this.events["*"].length; i++) {
          this.events["*"][i](evtObj);
        }
      }

    }

    return Voke;
}));
