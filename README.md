# js-meters

Create a javascript meter and animate it.

# Installation

npm install --save js-meters

# Usage

## jQuery Meter

```javascript
import {jqueryMeter} from "js-meters/src/jquery/jquery-meters"

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
