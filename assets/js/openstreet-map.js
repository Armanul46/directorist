/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/js/global/map-scripts/add-listing/openstreet-map.js":
/*!************************************************************************!*\
  !*** ./assets/src/js/global/map-scripts/add-listing/openstreet-map.js ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../../lib/helper */ "./assets/src/js/lib/helper.js");
/* Add listing OSMap */


;
(function ($) {
  $(document).ready(function () {
    if ($('#gmap').length) {
      var mapData = Object(_lib_helper__WEBPACK_IMPORTED_MODULE_0__["get_dom_data"])('map_data');
      // Localized Data
      var loc_default_latitude = parseFloat(mapData.default_latitude);
      var loc_default_longitude = parseFloat(mapData.default_longitude);
      var loc_manual_lat = parseFloat(mapData.manual_lat);
      var loc_manual_lng = parseFloat(mapData.manual_lng);
      var loc_map_zoom_level = parseInt(mapData.map_zoom_level);
      var loc_map_icon = mapData.map_icon;
      loc_manual_lat = isNaN(loc_manual_lat) ? loc_default_latitude : loc_manual_lat;
      loc_manual_lng = isNaN(loc_manual_lng) ? loc_default_longitude : loc_manual_lng;
      var map = L.map('gmap').setView([loc_manual_lat, loc_manual_lng], loc_map_zoom_level);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
      var customIcon = L.icon({
        iconUrl: loc_map_icon,
        // Adjust the path to your icon file
        iconSize: [20, 25] // Adjust the size of your icon
      });

      var marker = L.marker([loc_manual_lat, loc_manual_lng], {
        icon: customIcon,
        draggable: true
      }).addTo(map);

      // Autocomplete for the address input field
      $('#address').autocomplete({
        source: function source(request, response) {
          $.ajax({
            url: 'https://nominatim.openstreetmap.org/',
            method: 'GET',
            dataType: 'json',
            data: {
              q: request.term,
              format: 'json',
              limit: 5
            },
            success: function success(data) {
              // Extract and format suggestions from the geocoding service response
              var suggestions = $.map(data, function (item) {
                return {
                  label: item.display_name,
                  latitude: item.lat,
                  longitude: item.lon
                };
              });

              // Call the response callback with the suggestions
              response(suggestions);
            },
            error: function error(xhr, status, _error) {
              console.error('Error fetching address suggestions:', status, _error);
              response([]); // Return an empty array in case of an error
            }
          });
        },

        select: function select(event, ui) {
          // Update the map when the user selects an address
          map.setView([ui.item.latitude, ui.item.longitude], 15);
          marker.setLatLng([ui.item.latitude, ui.item.longitude]);
          $('#manual_lat').val(ui.item.latitude);
          $('#manual_lng').val(ui.item.longitude);
        }
      });

      // Handle marker dragend event
      marker.on('dragend', function (event) {
        var markerLatLng = marker.getLatLng();
        $('#manual_lat').val(markerLatLng.lat);
        $('#manual_lng').val(markerLatLng.lng);

        // Reverse geocode to get the address based on the marker's new position
        reverseGeocode(markerLatLng.lat, markerLatLng.lng, function (address) {
          $('#address').val(address);
        });
      });

      // Function to reverse geocode and get the address based on latitude and longitude
      function reverseGeocode(latitude, longitude, callback) {
        $.ajax({
          url: 'https://nominatim.openstreetmap.org/reverse',
          method: 'GET',
          dataType: 'json',
          data: {
            lat: latitude,
            lon: longitude,
            format: 'json'
          },
          success: function success(data) {
            if (data.display_name) {
              callback(data.display_name);
            } else {
              console.error('Reverse geocoding failed');
            }
          },
          error: function error(xhr, status, _error2) {
            console.error('Error fetching reverse geocoding data:', status, _error2);
          }
        });
      }
    }
  });
})(jQuery);

/***/ }),

/***/ "./assets/src/js/global/map-scripts/openstreet-map.js":
/*!************************************************************!*\
  !*** ./assets/src/js/global/map-scripts/openstreet-map.js ***!
  \************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _add_listing_openstreet_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./add-listing/openstreet-map */ "./assets/src/js/global/map-scripts/add-listing/openstreet-map.js");
/* harmony import */ var _single_listing_openstreet_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./single-listing/openstreet-map */ "./assets/src/js/global/map-scripts/single-listing/openstreet-map.js");
/* harmony import */ var _single_listing_openstreet_map__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_single_listing_openstreet_map__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _single_listing_openstreet_map_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./single-listing/openstreet-map-widget */ "./assets/src/js/global/map-scripts/single-listing/openstreet-map-widget.js");
/* harmony import */ var _single_listing_openstreet_map_widget__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_single_listing_openstreet_map_widget__WEBPACK_IMPORTED_MODULE_2__);
;
/* Add listing OSMap */


/* Single listing OSMap */


/* Widget OSMap */


/***/ }),

/***/ "./assets/src/js/global/map-scripts/single-listing/openstreet-map-widget.js":
/*!**********************************************************************************!*\
  !*** ./assets/src/js/global/map-scripts/single-listing/openstreet-map-widget.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Widget OSMap */

;
(function ($) {
  jQuery(document).ready(function () {
    // Localized Data
    if ($('#gmap-widget').length) {
      var map_container = localized_data_widget.map_container_id ? localized_data_widget.map_container_id : 'gmap';
      var loc_default_latitude = parseFloat(localized_data_widget.default_latitude);
      var loc_default_longitude = parseFloat(localized_data_widget.default_longitude);
      var loc_manual_lat = parseFloat(localized_data_widget.manual_lat);
      var loc_manual_lng = parseFloat(localized_data_widget.manual_lng);
      var loc_map_zoom_level = parseInt(localized_data_widget.map_zoom_level);
      var _localized_data_widge = localized_data_widget,
        display_map_info = _localized_data_widge.display_map_info;
      var _localized_data_widge2 = localized_data_widget,
        cat_icon = _localized_data_widge2.cat_icon;
      var _localized_data_widge3 = localized_data_widget,
        info_content = _localized_data_widge3.info_content;
      loc_manual_lat = isNaN(loc_manual_lat) ? loc_default_latitude : loc_manual_lat;
      loc_manual_lng = isNaN(loc_manual_lng) ? loc_default_longitude : loc_manual_lng;
      $manual_lat = $('#manual_lat');
      $manual_lng = $('#manual_lng');
      saved_lat_lng = {
        lat: loc_manual_lat,
        lng: loc_manual_lng
      };
      function mapLeaflet(lat, lon) {
        var fontAwesomeIcon = L.divIcon({
          html: "<div class=\"atbd_map_shape\"><span class=\"\">".concat(cat_icon, "</span></div>"),
          iconSize: [20, 20],
          className: 'myDivIcon'
        });
        var mymap = L.map(map_container).setView([lat, lon], loc_map_zoom_level);
        if (display_map_info) {
          L.marker([lat, lon], {
            icon: fontAwesomeIcon
          }).addTo(mymap).bindPopup(info_content);
        } else {
          L.marker([lat, lon], {
            icon: fontAwesomeIcon
          }).addTo(mymap);
        }
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
      }
      mapLeaflet(loc_manual_lat, loc_manual_lng);
    }
  });
})(jQuery);

/***/ }),

/***/ "./assets/src/js/global/map-scripts/single-listing/openstreet-map.js":
/*!***************************************************************************!*\
  !*** ./assets/src/js/global/map-scripts/single-listing/openstreet-map.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* Single listing OSMap */

(function ($) {
  jQuery(document).ready(function () {
    // Localized Data
    if ($('.directorist-single-map').length) {
      document.querySelectorAll('.directorist-single-map').forEach(function (mapElm) {
        var mapData = JSON.parse(mapElm.getAttribute('data-map'));
        var loc_default_latitude = parseFloat(mapData.default_latitude);
        var loc_default_longitude = parseFloat(mapData.default_longitude);
        var loc_manual_lat = parseFloat(mapData.manual_lat);
        var loc_manual_lng = parseFloat(mapData.manual_lng);
        var loc_map_zoom_level = parseInt(mapData.map_zoom_level);
        var display_map_info = mapData.display_map_info;
        var cat_icon = mapData.cat_icon;
        var info_content = mapData.info_content;
        loc_manual_lat = isNaN(loc_manual_lat) ? loc_default_latitude : loc_manual_lat;
        loc_manual_lng = isNaN(loc_manual_lng) ? loc_default_longitude : loc_manual_lng;
        $manual_lat = $('#manual_lat');
        $manual_lng = $('#manual_lng');
        saved_lat_lng = {
          lat: loc_manual_lat,
          lng: loc_manual_lng
        };
        function mapLeaflet(lat, lon) {
          var fontAwesomeIcon = L.divIcon({
            html: "<div class=\"atbd_map_shape\"><span class=\"\">".concat(cat_icon, "</span></div>"),
            iconSize: [20, 20],
            className: 'myDivIcon'
          });
          var mymap = L.map(mapElm, {
            scrollWheelZoom: false
          }).setView([lat, lon], loc_map_zoom_level);
          if (display_map_info) {
            L.marker([lat, lon], {
              icon: fontAwesomeIcon
            }).addTo(mymap).bindPopup(info_content);
          } else {
            L.marker([lat, lon], {
              icon: fontAwesomeIcon
            }).addTo(mymap);
          }
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(mymap);
        }
        mapLeaflet(loc_manual_lat, loc_manual_lng);
      });
    }
  });
})(jQuery);

/***/ }),

/***/ "./assets/src/js/lib/helper.js":
/*!*************************************!*\
  !*** ./assets/src/js/lib/helper.js ***!
  \*************************************/
/*! exports provided: get_dom_data, convertToSelect2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_dom_data", function() { return get_dom_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToSelect2", function() { return convertToSelect2; });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__);


var $ = jQuery;
function get_dom_data(key, parent) {
  // var elmKey = 'directorist-dom-data-' + key;
  var elmKey = 'directorist-dom-data-' + key;
  var dataElm = parent ? parent.getElementsByClassName(elmKey) : document.getElementsByClassName(elmKey);
  if (!dataElm) {
    return '';
  }
  var is_script_debugging = directorist && directorist.script_debugging && directorist.script_debugging == '1' ? true : false;
  try {
    var dataValue = atob(dataElm[0].dataset.value);
    dataValue = JSON.parse(dataValue);
    return dataValue;
  } catch (error) {
    if (is_script_debugging) {
      console.warn({
        key: key,
        dataElm: dataElm,
        error: error
      });
    }
    return '';
  }
}
function convertToSelect2(field) {
  if (!field) {
    return;
  }
  if (!field.elm) {
    return;
  }
  if (!field.elm.length) {
    return;
  }
  _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1___default()(field.elm).forEach(function (item) {
    var default_args = {
      allowClear: true,
      width: '100%',
      templateResult: function templateResult(data) {
        // We only really care if there is an field to pull classes from
        if (!data.field) {
          return data.text;
        }
        var $field = $(data.field);
        var $wrapper = $('<span></span>');
        $wrapper.addClass($field[0].className);
        $wrapper.text(data.text);
        return $wrapper;
      }
    };
    var args = field.args && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0___default()(field.args) === 'object' ? Object.assign(default_args, field.args) : default_args;
    var options = $(item).find('option');
    var placeholder = options.length ? options[0].innerHTML : '';
    if (placeholder.length) {
      args.placeholder = placeholder;
    }
    $(item).select2(args);
  });
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/iterableToArray.js");
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/nonIterableSpread.js");
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/arrayLikeToArray.js");
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 24:
/*!******************************************************************!*\
  !*** multi ./assets/src/js/global/map-scripts/openstreet-map.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/src/js/global/map-scripts/openstreet-map.js */"./assets/src/js/global/map-scripts/openstreet-map.js");


/***/ })

/******/ });
//# sourceMappingURL=openstreet-map.js.map