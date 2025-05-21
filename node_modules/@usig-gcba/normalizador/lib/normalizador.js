(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("isomorphic-fetch"));
	else if(typeof define === 'function' && define.amd)
		define("normalizador", ["isomorphic-fetch"], factory);
	else if(typeof exports === 'object')
		exports["normalizador"] = factory(require("isomorphic-fetch"));
	else
		root["normalizador"] = factory(root["isomorphic-fetch"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by federuiz on 7/13/17.
 */
var CALLE = exports.CALLE = 0;
var CALLE_ALTURA = exports.CALLE_ALTURA = 1;
var CALLE_Y_CALLE = exports.CALLE_Y_CALLE = 2;
var INVALIDO = exports.INVALIDO = -1;
var DIRECCION_CALLE_ALTURA = exports.DIRECCION_CALLE_ALTURA = 0;
var DIRECCION_CALLE_Y_CALLE = exports.DIRECCION_CALLE_Y_CALLE = 1;

var EXCEPCION_CALLE_INVALIDA = exports.EXCEPCION_CALLE_INVALIDA = 0;
var EXCEPCION_ALTURA_INVALIDA = exports.EXCEPCION_ALTURA_INVALIDA = 1;
var EXCEPCION_CARGA_CALLEJERO = exports.EXCEPCION_CARGA_CALLEJERO = 2;
var EXCEPCION_CALLE_SIN_ALTURAS = exports.EXCEPCION_CALLE_SIN_ALTURAS = 3;
var EXCEPCION_CRUCE_INEXISTENTE = exports.EXCEPCION_CRUCE_INEXISTENTE = 4;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){ true?module.exports=r():"function"==typeof define&&define.amd?define("usig-core",[],r):"object"==typeof exports?exports["usig-core"]=r():e["usig-core"]=r()}(this,function(){return function(e){function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}var t={};return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=0)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={escape:function(e){return e.replace(/('|\\)/g,"\\$1")},leftPad:function(e,r,t){var n=new String(e);for(t||(t=" ");n.length<r;)n=t+n;return n.toString()},format:function(e){var r=Array.prototype.slice.call(arguments,1);return e.replace(/\{(\d+)\}/g,function(e,t){return r[t]})},toggle:function(e,r,t){return e===r?t:r},trim:function(e){var r=/^\s+|\s+$/g;return e.replace(r,"")},translate:function(e,r,t){if(!r.length||!t.length||r.length!=t.length)return e;for(var n=e,o=0;o<r.length;o++)n="string"==typeof r?n.replace(new RegExp(r.charAt(o),"g"),t.charAt(o)):n.replace(new RegExp(r[o],"g"),t[o]);return n},isDigit:function(e){return/^\d+$/.test(e)},removeWords:function(e,r){for(var t=e.split(" "),n=new Array,o=0;o<t.length;o++){n.push(t[o]);for(var u=0;u<r.length;u++)if(n[o]==r[u]){n.pop();break}}return n.join(" ")},binarySearch:function(e,r,t){for(var n=0,o=e.length-1,u=void 0,i=void 0;n<=o;)if(u=parseInt((n+o)/2,10),(i=t(e[u],r))<0)n=u+1;else{if(!(i>0))return u;o=u-1}return-1},intersect:function(e){if(1===arguments.length)return[];for(var r=e,t=void 0,n=null,o=1;o<arguments.length;){t=[],n=arguments[o];for(var u=r.length,i=n.length,f=0;f<u;f++)for(var c=0;c<i;c++)r[f]===n[c]&&t.push(r[f]);r=t,o++}return this.unique(t)},unique:function(e){for(var r=[],t=e.length,n=0;n<t;n++){for(var o=n+1;o<t;o++)e[n]===e[o]&&(o=++n);r.push(e[n])}return r}};r.default=n,e.exports=r.default}])});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Devuelve un string con la direccion escrita correctamente para mostrar
 * @return {String} Direccion como texto
 */
function toString(direccion) {
  var res = void 0;
  if (direccion.tipoDireccion === _constants.DIRECCION_CALLE_ALTURA || direccion.tipoDireccion === "calle_altura") {
    res = direccion.calle.nombre + ' ' + (direccion.altura > 0 ? direccion.altura : 'S/N');
  } else {
    var nombreCruce = direccion.calleCruce.nombre;
    var separador = nombreCruce.match(/^(I|Hi|HI).*/) ? ' e ' : ' y ';
    res = direccion.calle.nombre + separador + direccion.calleCruce.nombre;
  }
  if (direccion.calle.partido !== undefined) {
    res = res + ', ' + direccion.calle.localidad;
  }
  return res;
}

/**
 * @class Direccion
 * @namespace usig
 * @constructor
 * @param {usig.Calle} calle1 Instancia de la clase usig.Calle
 * @param {usig.Calle-Integer} calle2OAltura Instancia de usig.Calle que se cruza con calle1 o altura correspondiente de calle1
 */

var Direccion = function () {
  function Direccion() {
    _classCallCheck(this, Direccion);
  }

  _createClass(Direccion, null, [{
    key: 'construirDireccion',
    value: function construirDireccion(calle1, calle2OAltura) {
      var calle = null;
      var calleCruce = null;
      var altura = 0;
      var tipo = null;
      var smp = '';
      var coordenadas = null;
      var type = "DIRECCION";

      if (calle1.tipo === "CALLE" || calle1.tipo === "calle_altura" || calle1.tipo === "calle_y_calle") {
        calle = calle1;
      }

      if (calle2OAltura.tipo === "CALLE") {
        calleCruce = calle2OAltura;
        tipo = _constants.DIRECCION_CALLE_Y_CALLE;
      } else {
        if (!isNaN(parseInt(calle2OAltura))) {
          tipo = _constants.DIRECCION_CALLE_ALTURA;
          altura = parseInt(calle2OAltura);
        }
      }
      var direccion = {
        calle: calle,
        calleCruce: calleCruce,
        altura: altura,
        tipoDireccion: tipo,
        smp: smp,
        coordenadas: coordenadas,
        tipo: type
      };
      direccion.nombre = toString(direccion);
      return direccion;
    }

    /**
     * Compara esta direccion con otra y determina si se refieren a la misma
     * posicion geografica, i.e.: 'callao y corrientes' es lo mismo que
     * 'corrientes y callao'
     * @param {usig.Direccion} Direccion a comparar
     * @return {Boolean} Verdadero si hacen referencia al mismo lugar
     */

  }, {
    key: 'isEqual',
    value: function isEqual(dir1, dir) {
      return dir.tipo === "DIRECCION" && dir1.tipo === "DIRECCION" && dir1.tipoDireccion === dir.tipoDireccion && (dir1.tipoDireccion === _constants.DIRECCION_CALLE_ALTURA && dir1.calle.codigo === dir.calle.codigo && dir1.altura === dir.altura || dir1.tipoDireccion === _constants.DIRECCION_CALLE_Y_CALLE && (dir1.calle.codigo === dir.calle.codigo && dir1.calleCruce.codigo === dir.calleCruce.codigo || dir1.calle.codigo === dir.calleCruce.codigo && dir1.calleCruce.codigo === dir.calle.codigo));
    }
  }, {
    key: 'fromObj',
    value: function fromObj(obj) {
      obj.nombre = obj.nombre_calle ? obj.nombre_calle : obj.nombre;
      var dir = null;
      if (obj.tipo !== undefined && obj.calle && obj.calle.codigo) {
        dir = this.construirDireccion(obj.calle, obj.tipo === _constants.DIRECCION_CALLE_ALTURA ? obj.altura : obj.calle_cruce);
      } else {
        var calle = obj;
        calle.codigo = calle.cod_calle;
        calle.nombre = calle.nombre_calle;
        if (obj.cod_calle2 || obj.cod_calle_cruce) {
          // Direccion Calle y Calle
          var calle_cruce = {
            codigo: obj.cod_calle2 || obj.cod_calle_cruce,
            nombre: obj.calle2 || obj.nombre_calle_cruce,
            partido: obj.nombre_partido,
            localidad: obj.nombre_localidad,
            tipo: "CALLE"
          };
          dir = Direccion.construirDireccion(calle, calle_cruce);
        } else {
          // Direccion Calle Altura
          dir = Direccion.construirDireccion(calle, obj.altura);
        }
        if (obj.nombre_partido) {
          dir.descripcion = obj.nombre_localidad + ', ' + obj.nombre_partido;
        }
      }
      if (obj.smp !== undefined && obj.smp !== null) {
        dir.smp(obj.smp);
      }
      if (obj.coordenadas !== undefined && obj.coordenadas !== null) {
        if (typeof obj.coordenadas === 'string') {
          dir.coordenadas = fromWkt(obj.coordenadas);
        } else {
          dir.coordenadas = obj.coordenadas;
        }
      }
      return dir;
    }
  }]);

  return Direccion;
}();

exports.default = Direccion;


var fromWkt = function fromWkt(wkt) {
  /*	wkt = wkt.replace('POINT (', '').replace(')', '');
   var splited = wkt.split(' ');
   return new usig.Punto(splited[0], splited[1]);*/
  var regExpPunto = /^POINT *\((-?[0-9]+\.[0-9]+) (-?[0-9]+\.[0-9]+)\)$/;
  var res = null;
  var resMatch = wkt.match(regExpPunto);
  if (resMatch) {
    res = { x: resMatch[1], y: resMatch[2] };
  }
  return res;
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module), __webpack_require__(14)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.IPv6 = factory(root);
  }
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }

    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.SecondLevelDomains = factory(root);
  }
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch ',
      // https://en.wikipedia.org/wiki/CentralNic#Second-level_domains
      'com': 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
      'net': 'gb jp se uk ',
      'org': 'ae',
      'de': 'com '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NormalizadorAMBA = exports.Normalizador = exports.Direccion = undefined;

var _callejero = __webpack_require__(7);

var _callejero2 = _interopRequireDefault(_callejero);

var _Exceptions = __webpack_require__(9);

var exceptions = _interopRequireWildcard(_Exceptions);

var _StringDireccion = __webpack_require__(10);

var _StringDireccion2 = _interopRequireDefault(_StringDireccion);

var _constants = __webpack_require__(0);

var _Direccion = __webpack_require__(2);

var _Direccion2 = _interopRequireDefault(_Direccion);

var _usigCore = __webpack_require__(1);

var _usigCore2 = _interopRequireDefault(_usigCore);

var _NormalizadorDireccionesAMBA = __webpack_require__(11);

var _NormalizadorDireccionesAMBA2 = _interopRequireDefault(_NormalizadorDireccionesAMBA);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaults = {
    lazyDataLoad: false,
    loadFullDatabase: true,
    aceptarCallesSinAlturas: false,
    callesEnMinusculas: false,
    maxPalabras: 7
};

/**
 * @class NormalizadorDirecciones
 * Esta clase implementa integramente en Javascript un normalizador de direcciones que utiliza
 * el callejero de USIG para transformar un string en una direccion normalizada.
 * Ejemplo de uso:
 * <pre><code>
 * ...
 * &lt;script src="http:&#47;&#47;ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type="text/javascript"&gt;&lt;/script&gt;
 * &lt;script src="http:&#47;&#47;servicios.usig.buenosaires.gob.ar/nd-js/1.4/normalizadorDirecciones.min.js" type="text/javascript"&gt;&lt;/script&gt;
 * ...
 * let n = usig.NormalizadorDirecciones.init();
 * try {
 *      let opts = n.normalizar(input.value, 10);
 * } catch (error) {
 *      // ...
 * }
 *
 * // Show opts
 *
 * </code></pre>
 * @namespace usig
 * @cfg {Boolean} lazyDataLoad Indica al normalizador si debe cargar los datos del callejero inmediatamente al
 * inicializarse la clase o esperar a la primera llamada al metodo normalizar. Por defecto es <code>False</code>.
 * @cfg {Boolean} aceptarCallesSinAlturas Indica al normalizador si debe permitir como altura S/N para las calles
 * sin numero. Por defecto es <code>False</code>. Ej: de los italianos S/N
 * @cfg {Boolean} callesEnMinusculas Indica si se desea que los nombres de las calles normalizados sean en minúsculas (Por defecto: false)
 * @cfg {Function} onReady Callback que es llamada cuando ya se cargaron los datos del callejero y pueden hacerse
 * 	normalizaciones.
 * @singleton
*/
var opts = {},
    initialized = false,
    startedInit = false,
    callejeroPromise = null,
    listeners = {
    'ready': []
},
    c = null,
    re = {
    cruceCalles: /\s+y\s+/gi,
    calleAltura: [],
    calle: []
};

function normalizarCalleAltura(strDir, maxOptions, autoDesambiguarCalleAltura) {
    var calles = c.matcheaCalle(strDir.strCalles);
    var options = void 0;
    try {
        options = validarAlturas(strDir, calles, maxOptions);
    } catch (error) {
        throw error;
    }
    if (options.length === 0 && calles.length > 0) {
        strDir.quitarAvsCalle();
        calles = c.matcheaCalle(strDir.strCalles);
        try {
            options = validarAlturas(strDir, calles, maxOptions);
        } catch (error) {
            throw error;
        }
        options = filtrarCallesQueNoSonAv(options);
        if (options.length === 0) {
            throw new exceptions.ErrorCalleInexistenteAEsaAltura(strDir.strCalles, calles, strDir.strAltura);
        }
    } else if (options.length === 0 && calles.length === 0) {
        strDir.quitarPasajes();
        calles = c.matcheaCalle(strDir.strCalles);
        try {
            options = validarAlturas(strDir, calles, maxOptions);
        } catch (error) {
            throw error;
        }
    }

    if (autoDesambiguarCalleAltura && options.length > 1) {
        options.forEach(function (opt, i) {
            if (esPermutacion(strDir.strCalles, opt.calle.nombre)) {
                options = [opt];
            }
            /*else {
             usig.debug(strDir.strCalles + ' NO es permutacion de ' + opt.calle.nombre);
             }*/
        });
    }

    return options;
}

function esPermutacion(str1, str2) {
    function prepararStr(str) {
        str = _usigCore2.default.translate(str.replace(/"/g, ""), 'áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ', 'aeiouuAEIOUUaeiouAEIOU').toUpperCase().trim();
        str = str.split(" ");
        return str;
    }

    str1 = prepararStr(str1);
    str2 = prepararStr(str2);

    if (str1.length === str2.length) {
        var intersect = _usigCore2.default.intersect(str1, str2);

        if (str1.length === intersect.length) {
            return true;
        }
    }

    return false;
}

/*
 *
 def esPermutacion(strIn1, strIn2):
 def prepararString(strIn):
 if isinstance(strIn, str):
 strIn = unicode(strIn)
 strIn = ''.join((c for c in unicodedata.normalize('NFD', strIn) if unicodedata.category(c) != 'Mn'))
 strIn = re.sub('[^a-zA-Z0-9 ]', '', strIn)
 strIn = strIn.upper().split(' ')
 return strIn

 retval = False
 strIn1 = prepararString(strIn1)
 strIn2 = prepararString(strIn2)

 if (len(strIn1) == len(strIn2)):
 intersec = set(strIn1) & set(strIn2)
 if (len(strIn1) == len(intersec)):
 retval = True

 return retval
 */
function validarAlturas(strDir, calles, maxOptions) {
    var retval = [];
    var hayCalleSN = 0;
    if (calles.length !== 0) {
        for (var _i = 0; _i < calles.length; _i++) {
            try {
                if (c.alturaValida(calles[_i], strDir.strAltura)) {
                    retval.push(_Direccion2.default.construirDireccion(calles[_i], strDir.strAltura));
                }
            } catch (error) {
                if (error.id === _constants.EXCEPCION_CALLE_SIN_ALTURAS && opts.aceptarCallesSinAlturas && strDir.esAlturaSN.test(strDir.strAltura)) {
                    retval.push(_Direccion2.default.construirDireccion(calles[_i], 0));
                }
                hayCalleSN++;
            }
            if (!isNaN(parseInt(maxOptions)) && retval.length >= parseInt(maxOptions)) break;
        }
        if (calles.length === hayCalleSN && retval.length === 0) {
            throw new exceptions.ErrorCalleSinAlturas(calles[0].nombre);
        }
    }
    return retval;
}

function filtrarCallesQueNoSonAv(dirs, getFunc) {
    var opts = [];
    for (var _i2 = 0; _i2 < dirs.length; _i2++) {
        if (c.tieneTramosComoAv(dirs[_i2].calle.codigo)) {
            opts.push(dirs[_i2]);
        }
    }
    return opts;
}

function normalizarCalleYCalle(strDir, maxOptions) {
    var calles1 = c.matcheaCalle(strDir.strCalles[0]);
    var calles2 = c.matcheaCalle(strDir.strCalles[1]);
    // Armo una lista tabu para evitar agregar 2 veces una interseccion
    // de una calle con otra que es calle y avenida a la vez
    // Ej. CIUDAD DE LA PAZ y MONROE y CIUDAD DE LA PAZ y MONROE AV.
    var matches = [];
    function matchCode(calle1, calle2) {
        return Math.min(calle1.codigo, calle2.codigo) + Math.max(calle1.codigo, calle2.codigo);
    }
    var opts = [];
    for (var _i3 = 0; _i3 < calles1.length; _i3++) {

        for (var j = 0; j < calles2.length; j++) {

            if (calles1[_i3].codigo !== calles2[j].codigo && matches.indexOf(matchCode(calles1[_i3], calles2[j])) < 0 && c.seCruzaCon(calles1[_i3], calles2[j]) && c.seCruzaCon(calles2[j], calles1[_i3])) {

                opts.push(_Direccion2.default.construirDireccion(calles1[_i3], calles2[j]));
                matches.push(matchCode(calles1[_i3], calles2[j]));
                if (!isNaN(parseInt(maxOptions)) && opts.length >= parseInt(maxOptions)) break;
            }
        }

        if (!isNaN(parseInt(maxOptions)) && opts.length >= parseInt(maxOptions)) break;
    }
    if (opts.length === 0 && calles1.length > 0 && calles2.length > 0) {
        var palabrasCalle1 = strDir.strCalles[0].split(' ');
        var palabrasCalle2 = strDir.strCalles[1].split(' ');
        if (palabrasCalle1.indexOf('AV') >= 0 || palabrasCalle1.indexOf('AVDA') >= 0 || palabrasCalle1.indexOf('AVENIDA') >= 0) {
            var strDir1 = Object.assign(Object.create(strDir), strDir);
            strDir1.quitarAvsCalle();
            var opts1 = void 0;
            try {
                opts1 = normalizarCalleYCalle(strDir1, maxOptions);
            } catch (error) {
                throw new exceptions.ErrorCruceInexistente(strDir.strCalles[0], calles1, strDir.strCalles[1], calles2);
            }
            filtrarCallesQueNoSonAv(opts1);
            if (opts1 instanceof Array) return opts1;
        }
        if (palabrasCalle2.indexOf('AV') >= 0 || palabrasCalle2.indexOf('AVDA') >= 0 || palabrasCalle2.indexOf('AVENIDA') >= 0) {
            var strDir2 = Object.assign(Object.create(strDir), strDir);
            strDir2.quitarAvsCalleCruce();
            var opts2 = void 0;
            try {
                opts2 = normalizarCalleYCalle(strDir2, maxOptions);
            } catch (error) {
                throw new exceptions.ErrorCruceInexistente(strDir.strCalles[0], calles1, strDir.strCalles[1], calles2);
            }
            filtrarCallesQueNoSonAv(opts2, 'getCalleCruce');
            if (opts2 instanceof Array) return opts2;
        }
    }
    // Esto es para sallet el caso de calles con Y en el nombre pero
    // que aun no estan escritas completas
    // Ej. ORTEGA Y GA
    if (opts.length < maxOptions) {
        var calles = c.matcheaCalle(strDir.strInput);
        var _i4 = 0;
        while (opts.length < maxOptions && _i4 < calles.length) {
            opts.push(calles[_i4]);
            _i4++;
        }
    }
    if (opts.length == 0 && calles1.length > 0 && calles2.length > 0) {
        throw new exceptions.ErrorCruceInexistente(strDir.strCalles[0], calles1, strDir.strCalles[1], calles2);
    }
    return opts;
}

function setHandler(ev, handler) {
    var found = false;
    for (var _i5 = 0; _i5 < listeners[ev].length; _i5++) {
        found = found || listeners[ev][_i5] == handler;
    }
    if (!found) {
        listeners[ev].push(handler);
    }
}

function normalizar(str, maxOptions, autoDesambiguar) {
    if (typeof autoDesambiguar === 'undefined') {
        autoDesambiguar = true;
    }
    var strDir = new _StringDireccion2.default(str, opts.aceptarCallesSinAlturas);
    var res = [];
    switch (strDir.tipo) {
        case _constants.CALLE:
            res = c.matcheaCalle(strDir.strCalles, maxOptions);
            break;
        case _constants.CALLE_ALTURA:
            res = normalizarCalleAltura(strDir, maxOptions, autoDesambiguar);
            break;
        case _constants.CALLE_Y_CALLE:
            res = normalizarCalleYCalle(strDir, maxOptions);
            if (res.length === 0) {
                strDir.setearCalleAltura();
                res = normalizarCalleAltura(strDir, maxOptions, autoDesambiguar);
            }
            break;
        case _constants.INVALIDO:
            res = [];
            break;
    }
    if (res instanceof Array) {
        if (res.length > 0) {
            return res;
        } else {
            throw new exceptions.ErrorCalleInexistente(str);
        }
    } else {
        return res;
    }
}

function buscarCruceCalles(texto, posConector, lenConector) {
    /*
     * Con texto = "Av. Callao y Av. Corrientes" quedaria:
     * textoCruce = "Av. Corrientes"
     * textoCalle = "oallaC .vA"
     */
    textoCalle = texto.substring(0, posConector).reverse();
    textoCruce = texto.substr(posConector + lenConector);
    conector = texto.substr(posConector, lenConector);
    var calle = cruce = "";
    var rCalle = rCruce = [];

    try {
        try {
            for (var _i6 = 1; _i6 < opts.maxPalabras; ++_i6) {
                cruce = textoCruce.match(re.calle[_i6])[0];
                if (textoCruce.search(re.calle[_i6]) != 0) throw "Direccion no valida";
                rCruce = normalizar(cruce, 2, false);
            }
        } catch (err) {
            cruce = textoCruce.match(re.calle[i - 1])[0];
        }
        try {
            for (var _i7 = 1; _i7 < opts.maxPalabras; ++_i7) {
                calle = textoCalle.match(re.calle[_i7])[0].reverse();
                if (textoCalle.search(re.calle[_i7]) != 0) throw "Direccion no valida";
                rCalle = normalizar(calle, 2, false);
            }
        } catch (err) {
            calle = textoCalle.match(re.calle[i - 1])[0].reverse();
        }

        resultados = normalizar(calle + conector + cruce, 2, false);
        if (resultados.length == 1 && verificarBusquedaDireccion(resultados[0], calle + conector + cruce)) return {
            "match": resultados[0],
            "pos": texto.search(calle),
            "len": calle.length + conector.length + cruce.length
        };else {
            return false;
        }
    } catch (e) {
        return false;
    }
    return false;
}

function buscarCalleAltura(texto) {
    textoDireccion = texto.reverse();
    var direccion = "";
    var rDireccion = [];
    try {
        try {
            for (var _i8 = 1; _i8 < opts.maxPalabras; ++_i8) {
                direccion = textoDireccion.match(re.calleAltura[_i8])[0].reverse();
                if (textoDireccion.search(re.calleAltura[_i8]) != 0) throw "Direccion no valida";
                rDireccion = normalizar(direccion, 2, false);
            }
        } catch (err) {
            direccion = textoDireccion.match(re.calleAltura[i - 1])[0].reverse();
            rDireccion = normalizar(direccion, 2, false);
        }
        if (verificarBusquedaDireccion(rDireccion[0], direccion)) {
            return {
                "match": rDireccion[0],
                "pos": texto.search(direccion),
                "len": direccion.length
            };
        }
    } catch (e) {
        return false;
    }
    return false;
}

function _buscarDirecciones(texto, resultadosMaximos) {
    var resultados = [];
    var rePosiblesDirecciones = /((\s+y\s+)|(\s+\d+))/gi;
    while (matcheo = rePosiblesDirecciones.exec(texto)) {
        if (matcheo[0].match(re.cruceCalles)) {
            res = buscarCruceCalles(texto, matcheo.index, matcheo[0].length);
        } else {
            res = buscarCalleAltura(texto.substring(0, matcheo.index + matcheo[0].length));
        }
        if (res) {
            if (resultados.length > 0) {
                if (res.pos == resultados[resultados.length - 1].pos && res.match.toString() == resultados[resultados.length - 1].match.toString()) {
                    if (res.len > resultados[resultados.length - 1].len) {
                        resultados.pop();
                        resultados.push(res);
                    }
                } else {
                    resultados.push(res);
                }
            } else {
                resultados.push(res);
            }
        }
        if (!(!resultadosMaximos || resultados.length < resultadosMaximos)) return resultados;
    }
    return resultados.length > 0 ? resultados : false;
}

function sinAcentos(str) {
    //let rExps=[/[\xC0-\xC2]/g, /[\xC8-\xCA]/g, /[\xCC-\xCE]/g, /[\xD2-\xD4]/g, /[\xD9-\xDB]/g, /[\xD1-\xF1]/g];
    var rExps = ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ü'];
    var repChar = ['A', 'E', 'I', 'O', 'U', 'U'];
    for (var _i9 = 0; _i9 < rExps.length; ++_i9) {
        str = str.replace(rExps[_i9], repChar[_i9]);
    }
    return str;
}

function verificarBusquedaDireccion(posibleDireccion, matcheo) {
    var pMatcheo = sinAcentos(matcheo.toUpperCase()).split(' ');
    var pCalle = posibleDireccion.toString().toUpperCase().replace(/[,.]/g, '').split(' ');
    for (var _i10 = 0; _i10 < pMatcheo.length - 1; _i10++) {
        for (var j = 0; j < pCalle.length - 1; j++) {
            if (pMatcheo[_i10] == pCalle[j] && pMatcheo[_i10].length > 3) {
                return true;
            }
        }
    }
    //ninguna palabra del texto coincide con el nombre de la calle.
    return false;
}

function compararIndices(a, b) {
    return a.pos - b.pos;
}

var Normalizador = {

    /**
     * Intenta interpretar el string que recibe como parametro como una direccion y obtener como
     * resultado una direccion normalizada. En cualquier caso devuelve un Array con los resultados
     * obtenidos del intento. Dicho Array puede constar de calles (instancias de la clase usig.Calle) o
     * direcciones (instancias de la clase direccion).
     * En caso de que no se puedan encontrar direcciones o calles validas se pueden lanzar las siguientes <b>Excepciones</b>:
     * <code>ErrorCalleInexistente</code>, <code>ErrorCalleInexistenteAEsaAltura</code> y <code>ErrorCruceInexistente</code>
     * cuyos nombres son autoexplicativos.
     *
     * Todos las clases de los elementos que se devuelven implementan el metodo toString() que permite
     * mostrar los resultados. Ejemplos de uso:
     * <pre><code>
     let n = new usig.NormalizadorDirecciones();
      try {
     n.normalizar('sarmiento', 10);
     // devuelve un array con 4 opciones (instancias de la clase usig.Calle)
     // correspondientes a las 4 calles cuyo nombre contiene 'sarmiento'
    } catch (error) {
    //...
    }
      try {
     n.normalizar('martinez 1500', 10);
     // devuelve un array con 4 opciones (instancias de la clase direccion)
     // correspondientes a las direcciones MARTINEZ, (CASTRO/ENRIQUE/ROSAS/VICTOR) 1500
    } catch (error) {
     // ...
    }
      try {
     n.normalizar('florida 550', 10);
     // devuelve un array con una instancia de la clase direccion correspondiente
     // a FLORIDA 550
    } catch (error) {
     // ...
    }
      try {
     n.normalizar('callao y corrientes', 10);
     // devuelve un array con una instancia de la clase direccion correspondiente
     // a CALLAO AV. y CORRIENTES AV.
    } catch (error) {
     // ...
    }
      </code></pre>
     * @param {String} str La cadena a ser transformada en direccion
     * @param {Integer} maxOptions Maximo numero de opciones a retornar
     * @param {Boolean} (optional) autoDesambiguar Intentar desambiguar automaticamente
     * @return {Array} Las opciones halladas que se corresponden con str
     */
    normalizar: normalizar,

    /**
     * Busca la primera direccion que encuentra en el texto
     * @param {String} texto Texto donde buscar
     * @return {Object} Retorna un objeto conteniendo la direccion (match), la posicion donde fue encontrada (pos) y la longitud del matching (len)
     */
    buscarDireccion: function buscarDireccion(texto) {
        var res = _buscarDirecciones(texto, 1);
        return res ? res[0] : false;
    },

    /**
     * Busca todas las direcciones que encuentra en el texto
     * @param {String} texto Texto donde buscar
     * @param {Integer} maxResultados Maxima cantidad de resultados a retornar
     * @return {Array} Retorna un array de objetos conteniendo la direccion (match), la posicion donde fue encontrada (pos) y la longitud del matching (len)
     */
    buscarDirecciones: function buscarDirecciones(texto, resultadosMaximos) {
        var res = _buscarDirecciones(texto, resultadosMaximos);
        return res ? res : false;
    },

    /**
     * Indica si ya se cargaron los datos del callejero y pueden empezar a hacerse normalizaciones.
     * @return {Boolean} Retorna True en caso de que ya se hayan cargado los datos del callejero.
     */
    listo: function listo() {
        return c ? c.listo() : false;
    },

    /**
     * Permite sobreescribir opciones del componente
     * @param {Object} options Objeto conteniendo opciones para el componente
     */
    setOptions: function setOptions(options) {
        opts = Object.assign({}, opts, options);
    },

    /**
     * Inicializa el componente previo a su primer uso.
     * @param {Object} options (optional) Objeto conteniendo overrides para las opciones por defecto.
     * @return {Object} Devuelve una referencia al componente.
     */
    init: function init(options) {
        opts = Object.assign({}, defaults, options);
        if (initialized) return new Promise(function (resolve, reject) {
            return resolve(Normalizador);
        });
        if (!callejeroPromise) {
            callejeroPromise = _callejero2.default.init({ lazyDataLoad: opts.lazyDataLoad,
                loadFullDatabase: opts.loadFullDatabase,
                callesEnMinusculas: opts.callesEnMinusculas,
                callejero: opts.callejero
            }).then(function (callejero) {
                c = callejero;
                Normalizador.c = c;
                for (var _i11 = 1; _i11 <= opts.maxPalabras; _i11++) {
                    /* Atencion: Estas regular expressions estan invertidas para poder aplicarlas siempre en el mismo sentido
                     * Originales:
                     * re.calleAltura[i] = new RegExp("(((\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,)+\\s+){"+i+"}\\d+)","gi");
                     * re.cruceCalle[i] = new RegExp("y(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){"+i+"}","gi");
                     */
                    re.calleAltura[_i11] = new RegExp("(\\d+(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){" + _i11 + "})", "gi");
                    //re.calleAltura[i] = NUMERO (ESPACIO PALABRA)*i
                    re.calle[_i11] = new RegExp("(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+(\\s+(\\w|\\d|á|é|í|ó|ú|ü|ñ|'|`|,|\\.)+){" + (_i11 - 1) + "}", "gi");
                    //re.cruceCalle[i] = PALABRA (ESPACIO PALABRA)*(i-1)
                }
                String.prototype.reverse = function () {
                    return this.split('').reverse().join('');
                };
                initialized = true;
                return Normalizador;
            });
        }
        return callejeroPromise;
    },

    /**
     * Indica si el componente ya ha sido inicializado.
     * @return {Boolean} Retorna True si ya se ha llamado al metodo init.
     */
    inicializado: function inicializado() {
        return initialized;
    }
};
exports.Direccion = _Direccion2.default;
exports.Normalizador = Normalizador;
exports.NormalizadorAMBA = _NormalizadorDireccionesAMBA2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,r){ true?module.exports=r(__webpack_require__(1),__webpack_require__(8)):"function"==typeof define&&define.amd?define("Callejero",["@usig-gcba/usig-core","isomorphic-fetch"],r):"object"==typeof exports?exports.Callejero=r(require("@usig-gcba/usig-core"),require("isomorphic-fetch")):e.Callejero=r(e["@usig-gcba/usig-core"],e["isomorphic-fetch"])}(this,function(e,r){return function(e){function r(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}var a={};return r.m=e,r.c=a,r.i=function(e){return e},r.d=function(e,a,t){r.o(e,a)||Object.defineProperty(e,a,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(a,"a",a),a},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s=6)}([function(e,r,a){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}function n(e,r){for(var a=!0,t=0;t<e.length;t++){var n=e[t];if(n.lastIndex=0,!n.test(r[2])){a=!1;break}}return a}function o(e){if(E=!1,e.length!=w.data.Callejero.length)return void alert("Se produjo un error al cargar la información de cruces de calles.");for(var r=0;r<w.data.Callejero.length;r++)w.data.Callejero[r].push(e[r])}function l(e){var r=60*y.expirationTime*1e3,a={calles:JSON.stringify(e),expiration:(new Date).getTime()+r};try{localStorage&&(localStorage.callejero=JSON.stringify(a))}catch(e){console.error(e)}}function u(e){return S=!0,w.data.Callejero=e,E=!1,d("ready"),O}function i(){E=!0,fetch(y.server+"?full=1&cruces=1&encoding="+y.encoding).then(function(e){return e.json()},function(e){return console.log("Error!")}).then(function(e){return o(e)})}function c(){E=!0;var e=y.loadFullDatabase?"?full=1&encoding="+y.encoding+"&minusculas="+(y.callesEnMinusculas?1:0):"?encoding="+y.encoding+"&minusculas="+(y.callesEnMinusculas?1:0);return fetch(y.server+e+"&date="+Date.now()).then(function(e){return e.json()}).catch(function(e){throw e}).then(function(e){return l(e),u(e)}).catch(function(e){throw e})}function s(e){if(!E){if(!f())return e?new Promise(function(r){return r(u(e))}):c();var r;try{return localStorage.callejero&&(r=JSON.parse(localStorage.callejero)),r&&r.calles&&r.calles.length>500?(new Date).getTime()<r.expiration?new Promise(function(e){return e(u(JSON.parse(r.calles)))}):c().catch(function(e){return u(JSON.parse(r.calles))}):e?(l(e),new Promise(function(r){return r(u(e))})):c().catch(function(e){throw e})}catch(r){return console.error(r),e?new Promise(function(r){return r(u(e))}):c()}}}function f(){try{return"localStorage"in window&&null!==window.localStorage}catch(e){return!1}}function d(e){for(var r=0;r<x[e].length;r++)x[e][r]()}function h(e,r){for(var a=!1,t=0;t<x[e].length;t++)a=a||x[e][t]==r;a||x[e].push(r)}Object.defineProperty(r,"__esModule",{value:!0}),a(5);var g=a(1),C=t(g),j=a(3),p=t(j),v=a(2),m=a(4),b=t(m),w=void 0;void 0===w&&(w={}),void 0===w.data&&(w.data={}),void 0===w.defaults&&(w.defaults={}),w.defaults.Callejero={server:"https://servicios.usig.buenosaires.gob.ar/callejero",lazyDataLoad:!1,loadFullDatabase:!0,callesEnMinusculas:!0,encoding:"utf-8",expirationTime:10080};var y={},S=!1,x={ready:[]},E=!1,O={init:function(e){return y=Object.assign({},w.defaults.Callejero,e),"function"==typeof y.onReady&&h("ready",y.onReady),!w.data.Callejero&&!y.lazyDataLoad||w.data.Callejero&&(w.data.Callejero.calles||w.data.Callejero.calles&&w.data.Callejero.calles.length<500)?s(y.callejero).catch(function(e){if(y.callejero)return u(y.callejero);throw e}):(w.data.Callejero&&(d("ready"),x.ready=[]),new Promise(function(e){return e(O)}))},cargarCalles:function(e){return e&&O.listo()?e.override?s():new Promise(function(e){return e(O)}):s()},buscarPorCodigo:function(e){if(!O.listo())throw new p.default;var r=[];if(/^[0-9]+$/.test(e)){var a=b.default.binarySearch(w.data.Callejero,e,function(e,r){return e[0]-r});if(a>-1){var t=w.data.Callejero[a];r.push(C.default.construirCalle(t[0],t[1]));for(var n=a+1;n<w.data.Callejero.length&&w.data.Callejero[n][0]===e;)t=w.data.Callejero[n],r.push(C.default.construirCalle(t[0],t[1])),n++;for(n=a-1;n>=0&&w.data.Callejero[n][0]===e;)t=w.data.Callejero[n],r.unshift(C.default.construirCalle(t[0],t[1])),n--}}return r},getAlturas:function(e,r){if(!O.listo())throw new p.default;var a=[];if(/^[0-9]+$/.test(e)){var t=b.default.binarySearch(w.data.Callejero,e,function(e,r){return e[0]-r});if(t>-1){var n=w.data.Callejero[t];n[1]===r&&n[3].forEach(function(e){return a.push(e)});for(var o=t+1;o<w.data.Callejero.length&&w.data.Callejero[o][0]===e;)w.data.Callejero[o][1]===r&&(n=w.data.Callejero[o],n[3].forEach(function(e){return a.push(e)})),o++;for(o=t-1;o>=0&&w.data.Callejero[o][0]===e;)w.data.Callejero[o][1]===r&&(n=w.data.Callejero[o],n[3].forEach(function(e){return a.push(e)})),o--}}return a},getCruces:function(e,r){if(!O.listo())throw new p.default;var a=[];if(/^[0-9]+$/.test(e)){var t=b.default.binarySearch(w.data.Callejero,e,function(e,r){return e[0]-r});if(t>-1){var n=w.data.Callejero[t];n[1]===r&&n[4].forEach(function(e){return a.push(e)});for(var o=t+1;o<w.data.Callejero.length&&w.data.Callejero[o][0]===e;)w.data.Callejero[o][1]===r&&(n=w.data.Callejero[o],n[4].forEach(function(e){return a.push(e)})),o++;for(o=t-1;o>=0&&w.data.Callejero[o][0]===e;)w.data.Callejero[o][1]===r&&(n=w.data.Callejero[o],n[4].forEach(function(e){return a.push(e)})),o--}}return a},seCruzaCon:function(e,r){var a=O.getCruces(e.codigo,e.nombre);if(a)return a.indexOf(r.codigo)>=0},matcheaCalle:function(e,r){if(!O.listo())throw new p.default;var a=[],t=[],o=b.default.translate(e.replace(/"/g,""),"áéíóúüÁÉÍÓÚÜàèìòùÀÈÌÒÙ","aeiouuAEIOUUaeiouAEIOU").toUpperCase().trim(),l=o.split(" "),u=l.map(function(e){return new RegExp("^"+e+"| "+e,"gi")}),c=new RegExp("SNO|SIN NOMBRE OFICIAL|NO OFICIAL|PASAJE|PJE","i");if(!O.listo())throw s(),new p.default;for(var f=0;f<w.data.Callejero.length&&!(n(u,w.data.Callejero[f])&&(c.test(w.data.Callejero[f][1])||0===w.data.Callejero[f][3].length?t.push(C.default.construirCalle(w.data.Callejero[f][0],w.data.Callejero[f][1])):a.push(C.default.construirCalle(w.data.Callejero[f][0],w.data.Callejero[f][1])),!isNaN(parseInt(r))&&a.length>=parseInt(r)));f++);return a=a.concat(t),!isNaN(parseInt(r))&&a.length>=parseInt(r)&&(a=a.splice(0,r)),w.data.Callejero[0].length<5&&!E&&i(),a},tieneTramosComoAv:function(e){if(!O.listo())throw new p.default;var r=b.default.binarySearch(w.data.Callejero,e,function(e,r){return e[0]-r});return r>0&&0!==e&&(w.data.Callejero[r-1][0]===e||w.data.Callejero[r+1][0]===e)},getNombreCalle:function(e,r){for(var a=O.buscarPorCodigo(e),t=0;t<a.length;t++)if(O.alturaValida(a[t],r))return a[t].nombre;return""},listo:function(){return w.data.Callejero&&w.data.Callejero instanceof Array&&0!==w.data.Callejero.length},inicializado:function(){return S},alturaValida:function(e,r){if(e.alturas=O.getAlturas(e.codigo,e.nombre),e.alturas instanceof Array){if(0===e.alturas.length)throw new v.ErrorCalleSinAlturas(e.nombre);var a=!1;for(var t in e.alturas)a=a||parseInt(e.alturas[t][0])<=parseInt(r)&&parseInt(e.alturas[t][1])>=parseInt(r);return a}},calleToString:function(e){return e.nombre}};r.default=O,e.exports=r.default},function(e,r,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});r.default={construirCalle:function(e,r){return{codigo:e,nombre:r,tipo:"CALLE",toString:r}}},e.exports=r.default},function(e,r,a){"use strict";function t(e){this.id=3,this.message="La calle {calle} no posee alturas oficiales. Utilice intersecciones para hallar direcciones v&aacute;lidas sobre esta calle o escriba S/N en lugar de la altura.",this.toString=function(){return this.message.replace("{calle}",e)},this.getNombreCalle=function(){return e},this.getErrorMessage=function(){return usig.ErrorCalleSinAlturas.defaults.texts.message.replace("{calle}",e)}}Object.defineProperty(r,"__esModule",{value:!0}),r.ErrorCalleSinAlturas=t},function(e,r,a){"use strict";function t(){this.message="El callejero no se encuentra cargado aún o se produjo un error al intentar cargarlo",this.toString=function(){return"Callejero no disponible."},this.getErrorMessage=function(){return this.message}}Object.defineProperty(r,"__esModule",{value:!0}),r.default=t,e.exports=r.default},function(r,a){r.exports=e},function(e,a){e.exports=r},function(e,r,a){e.exports=a(0)}])});

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorCalleInexistente = ErrorCalleInexistente;
exports.ErrorEnCargaDelCallejero = ErrorEnCargaDelCallejero;
exports.ErrorCalleInexistenteAEsaAltura = ErrorCalleInexistenteAEsaAltura;
exports.ErrorCalleSinAlturas = ErrorCalleSinAlturas;
exports.ErrorCruceInexistente = ErrorCruceInexistente;

var _constants = __webpack_require__(0);

/**
 * @class ErrorCalleInexistente
 * @namespace usig
 * @constructor
 * @param {String} str Nombre oficial de la calle
 */
function ErrorCalleInexistente(str) {
  this.id = _constants.EXCEPCION_CALLE_INVALIDA;
  /**
   * Devuelve un mensaje de error con el nombre de la calle
   * @return {String} Mensaje de error
   */
  this.toString = function () {
    return "Calle inexistente: " + str;
  };

  /**
   * Devuelve el nombre de la calle
   * @return {String} Nombre de la calle
   */
  this.getNombreCalle = function () {
    return str;
  };

  /**
   * Devuelve un mensaje de error más descriptivo y amigable
   * @return {Object} Mensaje de error
   */
  this.getError = function () {
    return {
      type: "CALLE_INEXISTENTE",
      message: 'No pudo hallarse ninguna calle existente que coincidiera con su b&uacute;squeda. Por favor, revise el nombre ingresado y vuelva a intentarlo.'
    };
  };
}

/**
 * @class ErrorEnCargaDelCallejero
 * @namespace usig
 * @constructor
 */
function ErrorEnCargaDelCallejero() {

  this.id = _constants.EXCEPCION_CARGA_CALLEJERO;
  /**
   * Devuelve un mensaje de error
   * @return {String} Mensaje de error
   */
  this.toString = function () {
    return "Callejero no disponible.";
  };

  /**
   * Devuelve un mensaje de error más descriptivo y amigable
   * @return {String} Mensaje de error
   */
  this.getError = function () {
    return {
      type: "CALLES_SIN_CARGAR",
      message: "El callejero no se encuentra cargado aún o se produjo un error al intentar cargarlo"
    };
  };
}

/**
 * @class ErrorCalleInexistenteAEsaAltura
 * @namespace usig
 * @constructor
 * @param {String} calle Nombre oficial de la calle
 * @param {Array} matchings Array de instancias de usig.Calle que matchean el string 'calle'
 * @param {Integer} altura Altura invalida de la calle
 */
function ErrorCalleInexistenteAEsaAltura(calle, matchings, altura) {
  this.id = _constants.EXCEPCION_ALTURA_INVALIDA;
  this.message = 'La altura indicada no es válida para la calle ingresada.';

  /**
   * Devuelve el nombre de la calle
   * @return {String} Nombre de la calle
   */
  this.getCalle = function () {
    return calle;
  };

  /**
   * Devuelve el array de matchings para la calle
   * @return {Array} Instancias de usig.Calle que matchean 'calle'
   */
  this.getMatchings = function () {
    return matchings;
  };

  /**
   * Devuelve la altura invalida de la calle
   * @return {Integer} Altura
   */
  this.getAltura = function () {
    return altura;
  };

  /**
   * Devuelve un mensaje de error con el nombre de la calle y la altura invalida
   * @return {String} Mensaje de error
   */
  this.toString = function () {
    return "La calle " + calle + " no existe a la altura " + altura;
  };

  /**
   * Devuelve un mensaje de error más descriptivo y amigable
   * @return {Object} Mensaje de error
   */
  this.getError = function () {
    var errorMatchings = [];
    matchings.forEach(function (calle, i) {
      var tramos = calle.alturas;
      tramos.forEach(function (tramo, i) {
        errorMatchings.push({ calle: calle.nombre, inicio: tramo[0], fin: tramo[1] });
      });
    });

    return {
      type: "ALTURA_INVALIDA",
      message: this.message,
      matchings: errorMatchings
    };
  };
}

/**
 * @class ErrorCalleSinAlturas
 * @namespace usig
 * @constructor
 * @param {String} str Nombre oficial de la calle
 */
function ErrorCalleSinAlturas(str) {
  this.id = _constants.EXCEPCION_CALLE_SIN_ALTURAS;
  this.message = 'La calle {calle} no posee alturas oficiales. Utilice intersecciones para hallar direcciones válidas sobre esta calle o escriba S/N en lugar de la altura.';

  /**
   * Devuelve un mensaje de error con el nombre de la calle
   * @return {String} Mensaje de error
   */
  this.toString = function () {
    return this.message.replace('{calle}', str);
  };

  /**
   * Devuelve el nombre de la calle
   * @return {String} Nombre de la calle
   */
  this.getNombreCalle = function () {
    return str;
  };

  /**
   * Devuelve un mensaje de error más descriptivo y amigable
   * @return {Object} Mensaje de error
   */
  this.getError = function () {
    return {
      type: "CALLE_SIN_ALTURAS",
      streetName: str,
      message: this.message.replace('{calle}', str)
    };
  };
}

/**
 * @class ErrorCruceInexistente
 * @namespace usig
 * @constructor
 * @param {String} calle1 Nombre oficial de la primera calle
 * @param {Array} matchingsCalle1 Array de instancias de usig.Calle que matchean el string 'calle1'
 * @param {String} calle2 Nombre oficial de la segunda calle
 * @param {Array} matchingsCalle2 Array de instancias de usig.Calle que matchean el string 'calle2'
 */
function ErrorCruceInexistente(calle1, matchingsCalle1, calle2, matchingsCalle2) {

  this.id = _constants.EXCEPCION_CRUCE_INEXISTENTE;
  this.message = 'El cruce de calles indicado no existe';

  /**
   * Devuelve el nombre de la primera calle
   * @return {String} Nombre de la primera calle
   */
  this.getCalle1 = function () {
    return calle1;
  };

  /**
   * Devuelve el nombre de la segunda calle
   * @return {String} Nombre de la segunda calle
   */
  this.getCalle2 = function () {
    return calle2;
  };

  /**
   * Devuelve el array de matchings para la primera calle
   * @return {Array} Instancias de usig.Calle que matchean 'calle1'
   */
  this.getMatchingsCalle1 = function () {
    return matchingsCalle1;
  };

  /**
   * Devuelve el array de matchings para la segunda calle
   * @return {Array} Instancias de usig.Calle que matchean 'calle2'
   */
  this.getMatchingsCalle2 = function () {
    return matchingsCalle2;
  };

  /**
   * Devuelve un mensaje de error con el nombre de la calles
   * @return {String} Mensaje de error
   */
  this.toString = function () {
    return "Cruce inexistente: " + calle1 + " y " + calle2;
  };

  /**
   * Devuelve un mensaje de error más descriptivo y amigable
   * @return {Object} Mensaje de error
   */
  this.getError = function () {
    return {
      matchings1: matchingsCalle1,
      matchings2: matchingsCalle2,
      type: "CRUCE_INEXISTENTE",
      message: this.message
    };
  };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = __webpack_require__(0);

var _usigCore = __webpack_require__(1);

var _usigCore2 = _interopRequireDefault(_usigCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class StringDireccion
 * Parsea un string que presuntamente representa una direccion; lo tipifica y lo separa en tokens.
 * Luego de instanciada la propiedad publica "tipo" puede asumir los siguientes valores:
 * <pre><code>
 * usig.StringDireccion.CALLE
 * usig.StringDireccion.CALLE_ALTURA
 * usig.StringDireccion.CALLE_Y_CALLE
 * usig.StringDireccion.INVALIDO
 * </code></pre>
 * @namespace usig
 * @constructor
 * @param {String} strInput String a parsear
*/

var StringDireccion = function () {
  function StringDireccion(strInput, aceptarCallesSinAlturas) {
    _classCallCheck(this, StringDireccion);

    /**
     * @property
     * @type Integer Constante que indica la tipificacion asignada al string de entrada
     */
    this.tipo = _constants.INVALIDO;
    /**
     * @property
     * @type String [Array] String que representa el presunto nombre de la calle o array de strings que representan las
     * presuntas calles que se intersectan
     */
    this.strCalles = '';
    /**
     * @property
     * @type Integer Presunta altura de la calle
     */
    this.strAltura = '';
    //	this.strInput = strInput.replace(/"/g, "").replace(/\./g, " ").replace(/,/g, " ").replace(/\)/g, " ").replace(/\(/g, " ").toUpperCase().trim();
    this.strInput = strInput.replace(/"/g, "").replace(/[\.,\(\)']/g, " ").toUpperCase().trim();
    this.esAlturaSN = /[sS][/\\][nN]/;
    this.aceptarCallesSinAlturas = aceptarCallesSinAlturas;

    if (this.strInput.length > 0) {
      var palabras = this.strInput.split(" Y ");
      if (palabras.length >= 2) {
        var str = this.fixCallesConY(this.strInput);
        palabras = str.split(" Y ");
        if (palabras.length >= 2) {
          this.tipo = _constants.CALLE_Y_CALLE;
          this.strCalles = [palabras[0].replace(" & ", " Y "), palabras[1].replace(" & ", " Y ")];
        }
      }
      palabras = this.strInput.split(" E ");
      if (palabras.length >= 2) {
        // Si la ultima palabra no es un entero...
        if (parseInt(palabras[palabras.length - 1]) != palabras[palabras.length - 1]) {
          this.tipo = _constants.CALLE_Y_CALLE;
          this.strCalles = palabras;
        }
      }
      if (this.tipo === _constants.INVALIDO) {
        this.setearCalleAltura();
      }
    } else {
      this.tipo = _constants.INVALIDO;
    }
  }

  _createClass(StringDireccion, [{
    key: 'esTipoAltura',
    value: function esTipoAltura(str, aceptarCallesSinAlturas) {
      return _usigCore2.default.isDigit(str) || aceptarCallesSinAlturas && this.esAlturaSN.test(str);
    }
  }, {
    key: 'setearCalleAltura',
    value: function setearCalleAltura() {
      function inject(array, acc, it) {
        for (var i = 0; i < array.length; i++) {
          acc = it(acc, array[i], i);
        }return acc;
      }
      var palabras = this.strInput.split(" ");
      this.maxWordLen = inject(palabras, 0, function (acc, w, i) {
        return Math.max(w.trim().length, acc);
      });
      var cantPalabras = palabras.length;
      if (cantPalabras > 1 && this.esTipoAltura(palabras[cantPalabras - 1], this.aceptarCallesSinAlturas)) {
        this.tipo = _constants.CALLE_ALTURA;
        this.strCalles = inject(palabras, "", function (acc, w, i) {
          return i < cantPalabras - 1 ? acc !== "" ? acc + " " + w : w : acc;
        });
        this.strAltura = palabras[cantPalabras - 1];
      } else {
        this.tipo = _constants.CALLE;
        this.strCalles = this.strInput;
      }
    }
  }, {
    key: 'fixCallesConY',
    value: function fixCallesConY(str) {
      return _usigCore2.default.translate(str, ["GELLY Y OBES", "MENENDEZ Y PELAYO", "OLAGUER Y FELIU", "ORTEGA Y GASSET", "PAULA Y RODRIGUEZ", "PAZ Y FIGUEROA", "PI Y MARGALL", "RAMON Y CAJAL", "TORRES Y TENORIO", "TREINTA Y TRES"], ["GELLY & OBES", "MENENDEZ & PELAYO", "OLAGUER & FELIU", "ORTEGA & GASSET", "PAULA & RODRIGUEZ", "PAZ & FIGUEROA", "PI & MARGALL", "RAMON & CAJAL", "TORRES & TENORIO", "TREINTA & TRES"]);
    }
  }, {
    key: 'quitarAvsCalle',
    value: function quitarAvsCalle() {
      var avs = ['AV', 'AVDA', 'AVENIDA'];
      if (this.tipo === _constants.CALLE_ALTURA) {
        this.strCalles = _usigCore2.default.removeWords(this.strCalles, avs);
      } else if (this.tipo === _constants.CALLE_Y_CALLE) {
        this.strCalles[0] = _usigCore2.default.removeWords(this.strCalles[0], avs);
      }
    }
  }, {
    key: 'quitarAvsCalleCruce',
    value: function quitarAvsCalleCruce() {
      var avs = ['AV', 'AVDA', 'AVENIDA'];
      if (this.tipo === _constants.CALLE_Y_CALLE) {
        this.strCalles[1] = _usigCore2.default.removeWords(this.strCalles[1], avs);
      }
    }
  }, {
    key: 'quitarPasajes',
    value: function quitarPasajes() {
      var avs = ['PJE', 'PSJE', 'PASAJE'];
      if (this.tipo === _constants.CALLE_ALTURA) {
        this.strCalles = _usigCore2.default.removeWords(this.strCalles, avs);
      } else if (this.tipo === _constants.CALLE_Y_CALLE) {
        this.strCalles[0] = _usigCore2.default.removeWords(this.strCalles[0], avs);
        this.strCalles[1] = _usigCore2.default.removeWords(this.strCalles[1], avs);
      }
    }
  }, {
    key: 'esAlturaSN',
    value: function (_esAlturaSN) {
      function esAlturaSN(_x) {
        return _esAlturaSN.apply(this, arguments);
      }

      esAlturaSN.toString = function () {
        return _esAlturaSN.toString();
      };

      return esAlturaSN;
    }(function (alt) {
      return esAlturaSN.test(alt);
    })
  }]);

  return StringDireccion;
}();

exports.default = StringDireccion;
;
module.exports = exports['default'];

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Direccion = __webpack_require__(2);

var _Direccion2 = _interopRequireDefault(_Direccion);

var _urijs = __webpack_require__(12);

var _urijs2 = _interopRequireDefault(_urijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class NormalizadorAMBA
 * Esta clase implementa una interfaz Javascript con el servicio de Normalizacion de Direcciones de USIG<br/>
 * Requiere: jQuery-1.3.2+, jquery.class, json, jquery.jsonp-1.1.0.1+, usig.core, usig.AjaxComponent<br/>
 * @namespace usig
 * @cfg {String} server Url del servicio del Normalizador de Direcciones de USIG. Por defecto: '//servicios.usig.buenosaires.gob.ar/normalizar'.
 * @cfg {Boolean} debug Mostrar informacion de debugging en la consola. Requiere soporte para window.console.log.
 * @cfg {Integer} maxSuggestions Maximo numero de sugerencias a devolver
 * @cfg {Integer} serverTimeout Tiempo maximo de espera (en ms) antes de abortar una busqueda en el servidor
 * @cfg {Integer} maxRetries Maximo numero de reintentos a realizar en caso de timeout
 * @cfg {Function} afterAbort Callback que es llamada cada vez que se aborta un pedido al servidor.
 * @cfg {Function} afterRetry Callback que es llamada cada vez que se reintenta un pedido al servidor.
 * @cfg {Function} afterServerRequest Callback que es llamada cada vez que se hace un pedido al servidor.
 * @cfg {Function} afterServerResponse Callback que es llamada cada vez que se recibe una respuesta del servidor.<br/>
 * @constructor
 * @param {Object} options (optional) Un objeto conteniendo overrides para las opciones disponibles
*/

var NormalizadorAMBA = {
  init: function init(options) {
    this.opts = Object.assign({}, defaults, options);
    return NormalizadorAMBA;
  },
  /**
   * Permite tratar de normalizar en forma asincronica un texto cualquiera
   * @param {String} text Texto a buscar
   * @param {Function} success Funcion que es llamada con el resultado de la busqueda
   * @param {Function} error Funcion que es llamada en caso de error
   * @param {Integer} maxSug Maximo numero de sugerencias a devolver
   */
  buscar: function buscar(text, success, error, maxSug) {
    var maxSuggestions = maxSug ? maxSug : this.opts.maxSuggestions;
    var options = Object.assign({}, this.opts.options);
    options.maxOptions = maxSuggestions;
    options.direccion = text;
    this.lastRequest = mkRequest(options, this.opts.server).then(function (results) {
      var newResults = [];
      if (results.direccionesNormalizadas) {
        var _maxSug = Math.min(results.direccionesNormalizadas.length, maxSuggestions);

        for (var i = 0; i < _maxSug; i++) {
          var res = results.direccionesNormalizadas[i];
          var sug = void 0;
          if (res.tipo === 'calle') {
            sug = { codigo: res.cod_calle, nombre: res.nombre_calle, tipo: "CALLE" };
            sug.partido = res.nombre_partido;
            sug.descripcion = res.nombre_localidad + ', ' + res.nombre_partido;
          } else {
            sug = _Direccion2.default.fromObj(res);
          }
          newResults.push(sug);
        }
      }
      if (typeof success === "function") {
        success(newResults);
      }
    }).catch(function (err) {
      return error(err);
    });
  }
};

function mkRequest(data, address, serverDefaults) {
  var url = (0, _urijs2.default)(address).search(data);
  return fetch(url.toString(), serverDefaults).then(function (resp) {
    return resp.json();
  }).catch(function (err) {
    console.log(err);return err;
  });
}
var defaults = {
  debug: false,
  options: {
    'exclude': 'caba'
  },
  server: 'https://servicios.usig.buenosaires.gob.ar/normalizar',
  maxSuggestions: 10,
  serverTimeout: 5000,
  maxRetries: 3
};

exports.default = NormalizadorAMBA;
module.exports = exports['default'];

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.1
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(3), __webpack_require__(4), __webpack_require__(5));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  function isInteger(value) {
    return /^[0-9]+$/.test(value);
  }

  URI.version = '1.19.1';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      preventInvalidHostname: URI.preventInvalidHostname,
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: throw on invalid hostname
  // see https://github.com/medialize/URI.js/pull/345
  // and https://github.com/medialize/URI.js/issues/354
  URI.preventInvalidHostname = false;
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\._-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // list of protocols which always require a hostname
  URI.hostProtocols = [
    'http',
    'https'
  ];

  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . - _
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {
        preventInvalidHostname: URI.preventInvalidHostname
      };
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    if (!string) {
      string = '';
    }

    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    if (parts.preventInvalidHostname) {
      URI.ensureValidHostname(parts.hostname, parts.protocol);
    }

    if (parts.port) {
      URI.ensureValidPort(parts.port);
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };

  URI.setQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.setQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      data[name] = value === undefined ? null : value;
    } else {
      throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');
    }
  };

  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v, protocol) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    var hasHostname = !!v; // not null and not an empty string
    var hasProtocol = !!protocol;
    var rejectEmptyHostname = false;

    if (hasProtocol) {
      rejectEmptyHostname = arrayContains(URI.hostProtocols, protocol);
    }

    if (rejectEmptyHostname && !hasHostname) {
      throw new TypeError('Hostname cannot be empty, if protocol is ' + protocol);
    } else if (v && v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');
      }
      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-:_]');
      }
    }
  };

  URI.ensureValidPort = function (v) {
    if (!v) {
      return;
    }

    var port = Number(v);
    if (isInteger(port) && (port > 0) && (port < 65536)) {
      return;
    }

    throw new TypeError('Port "' + v + '" is not a valid port');
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (key === 'query') { continue; }
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
      if (src.query) {
        this.query(src.query, false);
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v) {
      // accept trailing ://
      v = v.replace(/:(\/\/)?$/, '');

      if (!v.match(URI.protocol_expression)) {
        throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
      }
    }

    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        URI.ensureValidPort(v);
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = { preventInvalidHostname: this._parts.preventInvalidHostname };
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
      if (this._parts.preventInvalidHostname) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }
    }

    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      if (v) {
        URI.ensureValidHostname(v, this._parts.protocol);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      if (v.indexOf(':') !== -1) {
        throw new TypeError('Domains cannot contain colons');
      }

      URI.ensureValidHostname(v, this._parts.protocol);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (resolved._parts.protocol) {
      // Directly returns even if this._parts.hostname is empty.
      return resolved;
    } else {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.preventInvalidHostname = function(v) {
    this._parts.preventInvalidHostname = !!v;
    return this;
  };

  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});
//# sourceMappingURL=normalizador.js.map