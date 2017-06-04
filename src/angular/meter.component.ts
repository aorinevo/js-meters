import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as $ from 'jquery';

$.extend($.easing, {
  easeInQuad: (x, t, b, c, d) => {
    return c*(t/=d)*t + b;
  }
});

function polarToCartesian( centerX, centerY, radius, angleInDegrees ) {
  var angleInRadians = ( angleInDegrees - 90 ) * Math.PI / 180.0;

  return {
      x: centerX + ( radius * Math.cos( angleInRadians ) ),
      y: centerY + ( radius * Math.sin( angleInRadians ) )
  };
}

interface Meter {  
  radiusOuter: number,
  radiusInner: number,
  part: number,
  whole: number,
  strokeWhole: string,
  strokePart: string,
  strokeWidth: number,
  pathIdPrefix: string,
};

@Component({
  selector: 'ancb-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class ngMeterComponent implements OnInit, OnChanges {

//Add interface
  @Input() meter: Meter;
  @Input() reanimate?: boolean;
  angle: number;
  path2: string;
  public pointsCounter: number;  

  describeArc( x, y, radius, startAngle, endAngle ) {

    var start = polarToCartesian( x, y, radius, endAngle );
    var end = polarToCartesian( x, y, radius, startAngle );

    var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ].join( " " );

    return d;
  }
  
  animateMeter( ){
    $( {
        'pointsAccumulated': 0,            
        'angle': 0
    } ).animate( {
        'pointsAccumulated': this.meter.part,            
        'angle': this.angle
    }, {
        duration: 2000, 
        easing: "easeInQuad",                  
        step: function ( now, fx ) {
            switch ( fx.prop ) {
            case 'angle':
                this.path2 = this.describeArc(this.meter.radiusOuter, this.meter.radiusOuter, this.meter.radiusInner, 0, now);
                break;
            default:
                this.pointsCounter = Math.ceil( now );
                console.log(this.pointsCounter);
            }
        }.bind(this)
    } );  
  }

  ngOnInit() {
    if( !this.meter.pathIdPrefix){ this.meter.pathIdPrefix = "meter-arc-"};
    this.angle = this.meter.part/this.meter.whole * 360;
    this.animateMeter();
  }
  
  ngOnChanges( changes: SimpleChanges ){
    if( changes['reanimate'] && changes['reanimate']['currentValue'] ){
      this.animateMeter();
    }
  }
}
