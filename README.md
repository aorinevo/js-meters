# js-meters

Create a javascript meter and animate it.

## Installation

npm install --save js-meters

## Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div id="jquery-meter"></div>
  </body>
  <script type="text/javascript" src="./index.js"></script>
</html>
```

```javascript
//index.js
import Meter from js-meters

const meter = new Meter({
  id: 'jquery-meter',
  radiusOuter: 100,
  radiusInner: 80,
  part: 3,
  whole: 5,
  strokeWhole: '#ddd',
  strokePart: 'red',
  strokeWidth: 20
});

meter.renderInitialMeterState().animateMeter();
```
