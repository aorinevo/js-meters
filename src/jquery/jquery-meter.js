import $ from 'jquery';
  
$.extend($.easing, {
  easeInQuad: (x, t, b, c, d) => {
    return c*(t/=d)*t + b;
  }
});
  
var meter = {
  radiusOuter: 100,
  radiusInner: 80,
  part: 3,
  whole: 5,
  strokeWhole: '#ddd',
  strokePart: 'red',
  strokeWidth: 20
};
  
function polarToCartesian( centerX, centerY, radius, angleInDegrees ) {
  var angleInRadians = ( angleInDegrees - 90 ) * Math.PI / 180.0;

  return {
      x: centerX + ( radius * Math.cos( angleInRadians ) ),
      y: centerY + ( radius * Math.sin( angleInRadians ) )
  };
}

function describeArc( x, y, radius, startAngle, endAngle ) {

  var start = polarToCartesian( x, y, radius, endAngle ),
      end = polarToCartesian( x, y, radius, startAngle ),
      arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

  var d = [
      "M", start.x, start.y,
      "A", radius, radius, 0, arcSweep, 0, end.x, end.y
  ].join( " " );

  return d;
}

var svg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" ),
    path2 = document.createElementNS( "http://www.w3.org/2000/svg", 'path' ),
    path1 = document.createElementNS( "http://www.w3.org/2000/svg", 'path' );
    
    svg.setAttribute('width', 2 * meter.radiusOuter);
    svg.setAttribute('height', 2 * meter.radiusOuter);

    svg.appendChild( path1 ).setAttribute('id', 'path1');
    svg.appendChild( path2 ).setAttribute('id', 'path2');
    path1.style.strokeWidth = meter.strokeWidth;
    path1.style.stroke = meter.strokeWhole;
    path1.style.fill = "white";
    path1.setAttribute('d',describeArc(meter.radiusOuter, meter.radiusOuter, meter.radiusInner, 0, 359.9999));
    
    path2.style.strokeWidth = meter.strokeWidth;
    path2.style.stroke = meter.strokePart;
    path2.style.fill = "white";

    document.getElementById('jquery-meter').appendChild( svg );

$( {
  'pointsAccumulated': 0,            
  'angle': 0
} ).animate( {
  'pointsAccumulated': meter.part,            
  'angle': 90
}, {
  duration: 2000, 
  easing: "easeInQuad",                  
  step: function ( now, fx ) {
      switch ( fx.prop ) {
      case 'angle':
          path2.setAttribute('d', describeArc(meter.radiusOuter, meter.radiusOuter, meter.radiusInner, 0, now));
          break;
      default:
          //this.pointsCounter = Math.ceil( now );
      }
  }.bind(this)
} );

  