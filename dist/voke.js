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
    	console.error('[Wake] ERR: ' + msg);
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

    Voke.prototype.emit = function(event, meta) {
    	if(!this.events[event]) {
      	error("Event '" + event + "' Not Found");
        return;
      }

      for(var i = 0; i < this.events[event].length; i++) {
      	var evtObj = meta || {};
        evtObj.type = event;
      	this.events[event][i](evtObj);
      }

    }

    return Voke;
}));
