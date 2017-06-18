import $ from 'jquery';
  
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

function renderInitialMeterState( svg, path1, path2, config){
  svg.setAttribute('id', config.id+'-svg');
  svg.setAttribute('width', 2 * config.radiusOuter);
  svg.setAttribute('height', 2 * config.radiusOuter);

  svg.appendChild( path1 ).setAttribute('id', config.id+'-path1');
  svg.appendChild( path2 ).setAttribute('id', config.id+'-path2');
  path1.style.strokeWidth = config.strokeWidth;
  path1.style.stroke = config.strokeWhole;
  path1.style.fillOpacity = 0;
  path1.setAttribute('d',describeArc(config.radiusOuter, config.radiusOuter, config.radiusInner, 0, 359.9999));
  
  path2.style.strokeWidth = config.strokeWidth;
  path2.style.stroke = config.strokePart;
  path2.style.fillOpacity = 0;

  document.getElementById( config.id ).appendChild( svg );
}

function animateMeter( path2, config ){
  $( {
    'pointsAccumulated': 0,            
    'angle': 0
  } ).animate( {
    'pointsAccumulated': config.part,            
    'angle': config.part/config.whole * 360
  }, {
    duration: 2000, 
    easing: "easeInQuad",                  
    step: function ( now, fx ) {
        switch ( fx.prop ) {
        case 'angle':
            path2.setAttribute('d', describeArc(config.radiusOuter, config.radiusOuter, config.radiusInner, 0, now));
            break;
        default:
            //this.pointsCounter = Math.ceil( now );
        }
    }.bind(this)
  } );
}

class Meter {
  constructor( options ) {
    this.config = options;
    this.svg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
    this.path1 = document.createElementNS( "http://www.w3.org/2000/svg", 'path' );
    this.path2 = document.createElementNS( "http://www.w3.org/2000/svg", 'path' );
  }

  renderInitialMeterState(){    
    renderInitialMeterState(this.svg, this.path1, this.path2, this.config);
    return this;
  }
  
  animateMeter(){
    animateMeter( this.path2, this.config );
    return this;
  }
}

export default Meter;

  