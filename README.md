# Voke

Event emitter

Created as a learning project.

### Installation

With NPM

```
npm install voke
```

index.js
```js
var Voke = require('voke');
```

In the Browser:

Download `dist/voke.min.js` first.

```html
<script src='voke.min.js'></script>
```

### Usage

Creating an emitter:

```js
var emitter = new Voke();
```

Adding event listeners:

```js
emitter.on('event', function(e) {
  console.log(e);
  // => {type: 'event', myCustomData: true}
});

var handler = function() {};
emitter.on('event2', handler);
```

Removing event listeners:

```js
emitter.off('event2', handler);
```

Global Event Listener:

```js
emitter.on('*', function(e) {
  console.log(e);
});
```

Emitting an event:

```js
emitter.emit('event');
emitter.emit('event', {myCustomData: true});
```
