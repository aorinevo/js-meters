var $ = require('jquery');
  
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

function renderInitialMeterState( $el, svg, path1, path2, config){
  svg.setAttribute('id', config.id+'-svg');
  svg.setAttribute('width', 2 * config.radiusOuter);
  svg.setAttribute('height', 2 * config.radiusOuter);

  svg.appendChild( path1 ).setAttribute('id', config.id+'-path1');
  svg.appendChild( path2 ).setAttribute('id', config.id+'-path2');
  path1.style.strokeWidth = config.radiusOuter-config.radiusInner;
  path1.style.stroke = config.strokeWhole;
  path1.style.fillOpacity = 0;
  path1.setAttribute('d',describeArc(config.radiusOuter, config.radiusOuter, config.radiusInner, 0, 359.9999));
  
  path2.style.strokeWidth = path1.style.strokeWidth;
  path2.style.stroke = config.strokePart;
  path2.style.fillOpacity = 0;

  $el.prepend( svg );
}

function animateMeter( path2, config ){
  config.$angle.animate( {           
    'angle': config.part/config.whole * 360
  }, {
    duration: config.duration, 
    easing: "easeInQuad",     
    start: function(){
      config.$el.trigger('meter:animation:start');
    },            
    step: function ( now, fx ) {
      path2.setAttribute('d', describeArc(config.radiusOuter, config.radiusOuter, config.radiusInner, 0, now));
      config.$el.trigger('meter:animation:step',{
        now: now,
        fx: fx
      });
    },
    done: function(){
      this.angle = 0;
      config.$el.trigger('meter:animation:done');
    }
  } );
}

class Meter {
  constructor( options = {} ) {
    this.config = options;
    this.$el = options.$el;
    this.queuedAnimationCounter = 0;
    this.config.$angle = $( {'angle': 0} );
    this.svg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
    this.path1 = document.createElementNS( "http://www.w3.org/2000/svg", 'path' );
    this.path2 = document.createElementNS( "http://www.w3.org/2000/svg", 'path' );
    
  }

  renderInitialMeterState(){    
    renderInitialMeterState(this.$el, this.svg, this.path1, this.path2, this.config);
    return this;
  }
  
  animateMeter(){
    animateMeter( this.path2, this.config );
    return this;
  }
  
  destroy(id = this.config.id){
    $('#'+id).empty();
  }
}

export default Meter;

  