// import Meter from './jquery/jquery-meter';
// 
// const meter = new Meter({
//   id: 'jquery-meter',
//   radiusOuter: 100,
//   radiusInner: 80,
//   part: 3,
//   whole: 5,
//   strokeWhole: '#ddd',
//   strokePart: 'red',
//   strokeWidth: 20
// });
// 
// meter.renderInitialMeterState().animateMeter();
// 
// export default Meter;

// (function( root, factory ) {
// 	if( typeof define === 'function' && define.amd ) {
// 		// AMD. Register as an anonymous module.
// 		define( function() {
// 			root.Reveal = factory();
// 			return root.Reveal;
// 		} );
// 	} else if( typeof exports === 'object' ) {
// 		// Node. Does not work with strict CommonJS.
// 		module.exports = factory();
// 	} else {
// 		// Browser globals.
// 		root.Reveal = factory();
// 	}
// }( this,

//import ngMeterComponent from './angular/meter.component.ts';
import jqueryMeter from './jquery/jquery-meter.js';

export {
//  ngMeterComponent,
  jqueryMeter
};

