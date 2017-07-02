# js-meters

Create a javascript meter and animate it.

# Installation

npm install --save js-meters

# Usage

## HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>js meters</title>
    <script type="text/javascript" src="./dist/js-meters.js"></script>
  </head>
  <body>
    <h1>jQuery Meter</h1>
    <div id="jquery-meter"></div>
    <script type="text/javascript">
      var meter = new jsMeters.jqueryMeter({
        id: 'jquery-meter',  //id of DOM element to which to attach the meter
        radiusOuter: 100,
        radiusInner: 80,
        part: 3,
        whole: 5,
        strokeWhole: '#ddd',
        strokePart: 'red',
        strokeWidth: 20
      });
      meter.renderInitialMeterState().animateMeter();
    </script>
  </body>
</html>
```

## jQuery Meter

```javascript
import {jqueryMeter} from "js-meters/src/jquery/jquery-meter"

const meter = new jqueryMeter({
  id: 'jquery-meter',  //id of DOM element to which to attach the meter
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

## Events
- `meter:animation:start`: Triggered when meter animation starts. Bound to the meter $el.
- `meter:animation:done`: Triggered when meter animation is done. Bound to the meter $el.

## Angular Meter Component
(Not bundled)
```javascript
//app.module.ts
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppComponent } from './app.component'
import { ngMetercomponent } from "js-meters/src/angular/meter.component"

@NgModule({
  declarations: [
    AppComponent, 
    ngMeterComponent
  ],
  imports: [
    BrowserModule   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```javascript
//app.component.ts

@Component({
  selector: "ng-meter-container",
  template: `
    <ancb-meter [meter]="meter"></ancb-meter> 
  `
}) 
export class AppComponent {
  meter: Object = {
      radiusOuter: 100,
      radiusInner: 80,
      part: 3000,
      whole: 5000,
      strokeWhole: '#ddd',
      strokePart: 'red',
      strokeWidth: 20
    }
}
```
