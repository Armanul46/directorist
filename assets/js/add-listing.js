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
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/src/js/add-listing.js":
/*!**************************************!*\
  !*** ./assets/src/js/add-listing.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_component_add_listing_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/component/add-listing.scss */ \"./assets/src/scss/component/add-listing.scss\");\n/* harmony import */ var _scss_component_add_listing_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_component_add_listing_scss__WEBPACK_IMPORTED_MODULE_0__);\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\n\n/* eslint-disable */\n\nvar $ = jQuery;\nvar localized_data = atbdp_public_data.add_listing_data;\n/* Show and hide manual coordinate input field */\n\nif (!$('input#manual_coordinate').is(':checked')) {\n  $('.directorist-map-coordinates').hide();\n  $('#hide_if_no_manual_cor').hide();\n}\n\n$('#manual_coordinate').on('click', function (e) {\n  if ($('input#manual_coordinate').is(':checked')) {\n    $('.directorist-map-coordinates').show();\n    $('#hide_if_no_manual_cor').show();\n  } else {\n    $('.directorist-map-coordinates').hide();\n    $('#hide_if_no_manual_cor').hide();\n  }\n}); // enable sorting if only the container has any social or skill field\n\nvar $s_wrap = $('#social_info_sortable_container'); // cache it\n\n/* if (window.outerWidth > 1700) {\r\n        if ($s_wrap.length) {\r\n                $s_wrap.sortable({\r\n                        axis: 'y',\r\n                        opacity: '0.7',\r\n                });\r\n        }\r\n} */\n// SOCIAL SECTION\n// Rearrange the IDS and Add new social field\n\n$('body').on('click', '#addNewSocial', function (e) {\n  var social_wrap = $('#social_info_sortable_container'); // cache it\n\n  var currentItems = $('.directorist-form-social-fields').length;\n  var ID = \"id=\".concat(currentItems); // eg. 'id=3'\n\n  var iconBindingElement = jQuery('#addNewSocial'); // arrange names ID in order before adding new elements\n\n  $('.directorist-form-social-fields').each(function (index, element) {\n    var e = $(element);\n    e.attr('id', \"socialID-\".concat(index));\n    e.find('select').attr('name', \"social[\".concat(index, \"][id]\"));\n    e.find('.atbdp_social_input').attr('name', \"social[\".concat(index, \"][url]\"));\n    e.find('.directorist-form-social-fields__remove').attr('data-id', index);\n  }); // now add the new elements. we could do it here without using ajax but it would require more markup here.\n\n  atbdp_do_ajax(iconBindingElement, 'atbdp_social_info_handler', ID, function (data) {\n    social_wrap.append(data);\n  });\n}); // remove the social field and then reset the ids while maintaining position\n\n$('body').on('click', '.directorist-form-social-fields__remove', function (e) {\n  var id = $(this).data('id');\n  var elementToRemove = $(\"div#socialID-\".concat(id));\n  /* Act on the event */\n\n  swal({\n    title: localized_data.i18n_text.confirmation_text,\n    text: localized_data.i18n_text.ask_conf_sl_lnk_del_txt,\n    type: 'warning',\n    showCancelButton: true,\n    confirmButtonColor: '#DD6B55',\n    confirmButtonText: localized_data.i18n_text.confirm_delete,\n    closeOnConfirm: false\n  }, function (isConfirm) {\n    if (isConfirm) {\n      // user has confirmed, no remove the item and reset the ids\n      elementToRemove.slideUp('fast', function () {\n        elementToRemove.remove(); // reorder the index\n\n        $('.directorist-form-social-fields').each(function (index, element) {\n          var e = $(element);\n          e.attr('id', \"socialID-\".concat(index));\n          e.find('select').attr('name', \"social[\".concat(index, \"][id]\"));\n          e.find('.atbdp_social_input').attr('name', \"social[\".concat(index, \"][url]\"));\n          e.find('.directorist-form-social-fields__remove').attr('data-id', index);\n        });\n      }); // show success message\n\n      swal({\n        title: localized_data.i18n_text.deleted,\n        // text: \"Item has been deleted.\",\n        type: 'success',\n        timer: 200,\n        showConfirmButton: false\n      });\n    }\n  });\n});\n/* This function handles all ajax request */\n\nfunction atbdp_do_ajax(ElementToShowLoadingIconAfter, ActionName, arg, CallBackHandler) {\n  var data;\n  if (ActionName) data = \"action=\".concat(ActionName);\n  if (arg) data = \"\".concat(arg, \"&action=\").concat(ActionName);\n  if (arg && !ActionName) data = arg; // data = data ;\n\n  var n = data.search(localized_data.nonceName);\n\n  if (n < 0) {\n    data = \"\".concat(data, \"&\").concat(localized_data.nonceName, \"=\").concat(localized_data.nonce);\n  }\n\n  jQuery.ajax({\n    type: 'post',\n    url: localized_data.ajaxurl,\n    data: data,\n    beforeSend: function beforeSend() {\n      jQuery(\"<span class='atbdp_ajax_loading'></span>\").insertAfter(ElementToShowLoadingIconAfter);\n    },\n    success: function success(data) {\n      jQuery('.atbdp_ajax_loading').remove();\n      CallBackHandler(data);\n    }\n  });\n} // Select2 js code\n\n\nif (!localized_data.is_admin) {\n  // Location\n  var createLoc = localized_data.create_new_loc;\n\n  if (createLoc) {\n    $(\"#at_biz_dir-location\").select2({\n      placeholder: localized_data.i18n_text.location_selection,\n      tags: true,\n      maximumSelectionLength: localized_data.i18n_text.max_location_creation,\n      language: {\n        maximumSelected: function maximumSelected() {\n          return localized_data.i18n_text.max_location_msg;\n        }\n      },\n      tokenSeparators: [\",\"]\n    });\n  } else {\n    $(\"#at_biz_dir-location\").select2({\n      placeholder: localized_data.i18n_text.location_selection,\n      allowClear: true,\n      tags: false,\n      maximumSelectionLength: localized_data.i18n_text.max_location_creation,\n      tokenSeparators: [\",\"]\n    });\n  } // Tags\n\n\n  var createTag = localized_data.create_new_tag;\n\n  if (createTag) {\n    $('#at_biz_dir-tags').select2({\n      placeholder: localized_data.i18n_text.tag_selection,\n      tags: true,\n      tokenSeparators: [',']\n    });\n  } else {\n    $('#at_biz_dir-tags').select2({\n      placeholder: localized_data.i18n_text.tag_selection,\n      allowClear: true,\n      tokenSeparators: [',']\n    });\n  } //Category\n\n\n  var createCat = localized_data.create_new_cat;\n\n  if (createCat) {\n    $('#at_biz_dir-categories').select2({\n      placeholder: localized_data.i18n_text.cat_placeholder,\n      allowClear: true,\n      tags: true,\n      tokenSeparators: [',']\n    });\n  } else {\n    $('#at_biz_dir-categories').select2({\n      placeholder: localized_data.i18n_text.cat_placeholder,\n      allowClear: true\n    });\n  }\n} // Custom Image uploader for listing image (multiple)\n// price range\n\n\n$('#price_range').hide();\nvar is_checked = $('#atbd_listing_pricing').val();\n\nif (is_checked === 'range') {\n  $('#price').hide();\n  $('#price_range').show();\n}\n\n$('.directorist-form-pricing-field__options .directorist-checkbox__label').on('click', function () {\n  var $this = $(this);\n\n  if ($this.parent('.directorist-checkbox').children('input[type=checkbox]').prop('checked') === true) {\n    $(\"#\".concat($this.data('option'))).hide();\n  } else {\n    $(\"#\".concat($this.data('option'))).show();\n  }\n\n  var $sibling = $this.parent().siblings('.directorist-checkbox');\n  $sibling.children('input[type=checkbox]').prop('checked', false);\n  $(\"#\".concat($sibling.children('.directorist-checkbox__label').data('option'))).hide();\n});\nvar has_tagline = $('#has_tagline').val();\nvar has_excerpt = $('#has_excerpt').val();\n\nif (has_excerpt && has_tagline) {\n  $('.atbd_tagline_moto_field').fadeIn();\n} else {\n  $('.atbd_tagline_moto_field').fadeOut();\n}\n\n$('#atbd_optional_field_check').on('change', function () {\n  $(this).is(':checked') ? $('.atbd_tagline_moto_field').fadeIn() : $('.atbd_tagline_moto_field').fadeOut();\n}); // it shows the hidden term and conditions\n\n$('#listing_t_c').on('click', function (e) {\n  e.preventDefault();\n  $('#tc_container').toggleClass('active');\n});\n$(function () {\n  $('#color_code2').wpColorPicker().empty();\n}); // Load custom fields of the selected category in the custom post type \"atbdp_listings\"\n\n$('#at_biz_dir-categories').on('change', function () {\n  var directory_type = qs.listing_type ? qs.listing_type : $('input[name=\"directory_type\"]').val();\n  var length = $('#at_biz_dir-categories option:selected');\n  var id = [];\n  length.each(function (el, index) {\n    id.push($(index).val());\n  });\n  var data = {\n    action: 'atbdp_custom_fields_listings',\n    post_id: $('input[name=\"listing_id\"]').val(),\n    term_id: id,\n    directory_type: directory_type\n  };\n  $.post(localized_data.ajaxurl, data, function (response) {\n    if (response) {\n      $('.atbdp_category_custom_fields').empty().append(response);\n\n      function atbdp_tooltip() {\n        var atbd_tooltip = document.querySelectorAll('.atbd_tooltip');\n        atbd_tooltip.forEach(function (el) {\n          if (el.getAttribute('aria-label') !== \" \") {\n            document.body.addEventListener('mouseover', function (e) {\n              for (var target = e.target; target && target != this; target = target.parentNode) {\n                if (target.matches('.atbd_tooltip')) {\n                  el.classList.add('atbd_tooltip_active');\n                }\n              }\n            }, false);\n          }\n        });\n      }\n\n      atbdp_tooltip();\n    } else {\n      $('.atbdp_category_custom_fields').empty();\n    }\n  });\n});\nvar test_data = null; // Load custom fields of the selected category in the custom post type \"atbdp_listings\"\n\n$(document).ready(function () {\n  var directory_type = qs.listing_type ? qs.listing_type : $('input[name=\"directory_type\"]').val();\n  var length = $('#at_biz_dir-categories option:selected');\n  var id = [];\n  length.each(function (el, index) {\n    id.push($(index).val());\n  });\n  var data = {\n    action: 'atbdp_custom_fields_listings',\n    post_id: $('input[name=\"listing_id\"]').val(),\n    term_id: id,\n    directory_type: directory_type\n  };\n  $.post(localized_data.ajaxurl, data, function (response) {\n    if (response) {\n      $('.atbdp_category_custom_fields').empty().append(response);\n\n      function atbdp_tooltip() {\n        var atbd_tooltip = document.querySelectorAll('.atbd_tooltip');\n        atbd_tooltip.forEach(function (el) {\n          if (el.getAttribute('aria-label') !== \" \") {\n            document.body.addEventListener('mouseover', function (e) {\n              for (var target = e.target; target && target != this; target = target.parentNode) {\n                if (target.matches('.atbd_tooltip')) {\n                  el.classList.add('atbd_tooltip_active');\n                }\n              }\n            }, false);\n          }\n        });\n      }\n\n      atbdp_tooltip();\n    }\n  });\n});\n\nfunction atbdp_is_checked(name) {\n  var is_checked = $(\"input[name=\\\"\".concat(name, \"\\\"]\")).is(':checked');\n\n  if (is_checked) {\n    return '1';\n  }\n\n  return '';\n}\n\nfunction setup_form_data(form_data, type, field) {\n  //normal input\n  if (type === 'hidden' || type === 'text' || type === 'number' || type === 'tel' || type === 'email' || type === 'date' || type === 'time' || type === 'url') {\n    form_data.append(field.name, field.value);\n  } //textarea\n\n\n  if ('textarea' === type) {\n    var value = $('#' + field.name + '_ifr').length ? tinymce.get(field.name).getContent() : atbdp_element_value('textarea[name=\"' + field.name + '\"]');\n    form_data.append(field.name, value);\n  } //radio\n\n\n  if ('radio' === type) {\n    form_data.append(field.name, atbdp_element_value('input[name=\"' + field.name + '\"]:checked'));\n  } // checkbox\n\n\n  if ('checkbox' === type) {\n    var values = [];\n    var new_field = $('input[name^=\"' + field.name + '\"]:checked');\n\n    if (new_field.length > 1) {\n      new_field.each(function () {\n        var value = $(this).val();\n        values.push(value);\n      });\n      form_data.append(field.name, values);\n    } else {\n      form_data.append(field.name, atbdp_element_value('input[name=\"' + field.name + '\"]:checked'));\n    }\n  } //select\n\n\n  if ('select-one' === type) {\n    form_data.append(field.name, atbdp_element_value('select[name=\"' + field.name + '\"]'));\n  }\n}\n\nfunction atbdp_element_value(element) {\n  var field = $(element);\n\n  if (field.length) {\n    return field.val();\n  }\n\n  return '';\n}\n\nvar qs = function (a) {\n  if (a == '') return {};\n  var b = {};\n\n  for (var i = 0; i < a.length; ++i) {\n    var p = a[i].split('=', 2);\n    if (p.length == 1) b[p[0]] = '';else b[p[0]] = decodeURIComponent(p[1].replace(/\\+/g, ' '));\n  }\n\n  return b;\n}(window.location.search.substr(1).split('&'));\n\nvar uploaders = localized_data.media_uploader;\nvar mediaUploaders = [];\n\nif (uploaders) {\n  var i = 0;\n\n  var _iterator = _createForOfIteratorHelper(uploaders),\n      _step;\n\n  try {\n    for (_iterator.s(); !(_step = _iterator.n()).done;) {\n      var uploader = _step.value;\n\n      if ($('#' + uploader['element_id']).length) {\n        var media_uploader = new EzMediaUploader({\n          containerID: uploader['element_id']\n        });\n        mediaUploaders.push({\n          media_uploader: media_uploader,\n          uploaders_data: uploader\n        });\n        mediaUploaders[i].media_uploader.init();\n        i++;\n      }\n    }\n  } catch (err) {\n    _iterator.e(err);\n  } finally {\n    _iterator.f();\n  }\n}\n\nvar formID = $('#directorist-add-listing-form');\nvar on_processing = false;\nvar has_media = true;\n$('body').on('submit', formID, function (e) {\n  if (localized_data.is_admin) return;\n  e.preventDefault();\n  var error_count = 0;\n  var err_log = {}; // if ($('#atbdp_front_media_wrap:visible').length == 0) {\n  //         has_media = false;\n  // }\n\n  if (on_processing) {\n    $('.directorist-form-submit__btn').attr('disabled', true);\n    return;\n  }\n\n  var form_data = new FormData();\n  var field_list = [];\n  var field_list2 = [];\n  $('.directorist-form-submit__btn').addClass('atbd_loading');\n  form_data.append('action', 'add_listing_action');\n  var fieldValuePairs = $('#directorist-add-listing-form').serializeArray();\n  $.each(fieldValuePairs, function (index, fieldValuePair) {\n    var field = document.getElementsByName(fieldValuePair.name)[0];\n    var type = field.type;\n    field_list.push({\n      name: field.name\n    }); //array fields\n\n    if (field.name.indexOf('[') > -1) {\n      var field_name = field.name.substr(0, field.name.indexOf(\"[\"));\n      var ele = $(\"[name^='\" + field_name + \"']\"); // process tax input\n\n      if ('tax_input' !== field_name) {\n        if (ele.length && ele.length > 1) {\n          ele.each(function (index, value) {\n            var field_type = $(this).attr('type');\n            var name = $(this).attr('name');\n\n            if (field_type === 'radio') {\n              if ($(this).is(':checked')) {\n                form_data.append(name, $(this).val());\n              }\n            } else if (field_type === 'checkbox') {\n              var new_field = $('input[name^=\"' + name + '\"]:checked');\n\n              if (new_field.length > 1) {\n                new_field.each(function () {\n                  var name = $(this).attr('name');\n                  var value = $(this).val();\n                  form_data.append(name, value);\n                });\n              } else {\n                var name = new_field.attr('name');\n                var value = new_field.val();\n                form_data.append(name, value);\n              }\n            } else {\n              var name = $(this).attr('name');\n              var value = $(this).val();\n\n              if (!value) {\n                value = $(this).attr('data-time');\n              }\n\n              form_data.append(name, value);\n            }\n          });\n        } else {\n          var name = ele.attr('name');\n\n          var _value = ele.val();\n\n          form_data.append(name, _value);\n        }\n      }\n    } else {\n      //  field_list2.push({ nam: name, val: value, field: field, type: type})\n      setup_form_data(form_data, type, field);\n    }\n  }); // console.log( field_list2 );\n  // return;\n  // images\n\n  if (mediaUploaders.length) {\n    var _iterator2 = _createForOfIteratorHelper(mediaUploaders),\n        _step2;\n\n    try {\n      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n        var uploader = _step2.value;\n\n        if (uploader.media_uploader && has_media) {\n          var hasValidFiles = uploader.media_uploader.hasValidFiles();\n\n          if (hasValidFiles) {\n            // files\n            var files = uploader.media_uploader.getTheFiles();\n\n            if (files) {\n              for (var i = 0; i < files.length; i++) {\n                form_data.append(uploader.uploaders_data['meta_name'] + '[]', files[i]);\n              }\n            }\n\n            var files_meta = uploader.media_uploader.getFilesMeta();\n\n            if (files_meta) {\n              for (var i = 0; i < files_meta.length; i++) {\n                var elm = files_meta[i];\n\n                for (var key in elm) {\n                  form_data.append(\"\".concat(uploader.uploaders_data['files_meta_name'], \"[\").concat(i, \"][\").concat(key, \"]\"), elm[key]);\n                }\n              }\n            }\n          } else {\n            $('.directorist-form-submit__btn').removeClass('atbd_loading');\n            err_log.listing_gallery = {\n              msg: uploader.uploaders_data['error_msg']\n            };\n            error_count++;\n            scrollToEl('#' + uploader.uploaders_data['element_id']);\n          }\n        }\n      }\n    } catch (err) {\n      _iterator2.e(err);\n    } finally {\n      _iterator2.f();\n    }\n  } // locations\n\n\n  var locaitons = $('#at_biz_dir-location').val();\n\n  if (Array.isArray(locaitons) && locaitons.length) {\n    for (var key in locaitons) {\n      var value = locaitons[key];\n      form_data.append('tax_input[at_biz_dir-location][]', value);\n    }\n  }\n\n  if (typeof locaitons === 'string') {\n    form_data.append('tax_input[at_biz_dir-location][]', locaitons);\n  } // tags\n\n\n  var tags = $('#at_biz_dir-tags').val();\n\n  if (tags) {\n    for (var key in tags) {\n      var value = tags[key];\n      form_data.append('tax_input[at_biz_dir-tags][]', value);\n    }\n  } // categories\n\n\n  var categories = $('#at_biz_dir-categories').val();\n\n  if (Array.isArray(categories) && categories.length) {\n    for (var key in categories) {\n      var value = categories[key];\n      form_data.append('tax_input[at_biz_dir-category][]', value);\n    }\n  }\n\n  if (typeof categories === 'string') {\n    form_data.append('tax_input[at_biz_dir-category][]', categories);\n  }\n\n  var directory_type = qs.directory_type ? qs.directory_type : $('input[name=\"directory_type\"]').val();\n  form_data.append('directory_type', directory_type);\n  form_data.append('plan_id', qs.plan);\n\n  if (error_count) {\n    on_processing = false;\n    $('.directorist-form-submit__btn').attr('disabled', false);\n    console.log('Form has invalid data');\n    console.log(error_count, err_log);\n    return;\n  } // on_processing = true;\n  // $('.directorist-form-submit__btn').attr('disabled', true);\n\n\n  $.ajax({\n    method: 'POST',\n    processData: false,\n    contentType: false,\n    url: localized_data.ajaxurl,\n    data: form_data,\n    success: function success(response) {\n      // console.log( response );\n      // return;\n      // show the error notice\n      $('.directorist-form-submit__btn').attr('disabled', false);\n      var is_pending = response.pending ? '&' : '?';\n\n      if (response.error === true) {\n        $('#listing_notifier').show().html(\"<span>\".concat(response.error_msg, \"</span>\"));\n        $('.directorist-form-submit__btn').removeClass('atbd_loading');\n        on_processing = false;\n\n        if (response.quick_login_required) {\n          var email = response.email;\n          console.log('Show login form');\n          var modal = $('#directorist-quick-login');\n          modal.addClass('show');\n          modal.find('.directorist-email-label').html(email); // Show Alert\n\n          var alert = '<div class=\"directorist-alert directorist-mb-10\">' + response.error_msg + '</div>';\n          modal.find('.directorist-modal-alerts-area').html(alert);\n        }\n      } else {\n        // preview on and no need to redirect to payment\n        if (response.preview_mode === true && response.need_payment !== true) {\n          if (response.edited_listing !== true) {\n            $('#listing_notifier').show().html(\"<span class=\\\"atbdp_success\\\">\".concat(response.success_msg, \"</span>\"));\n            window.location.href = \"\".concat(response.preview_url, \"?preview=1&redirect=\").concat(response.redirect_url);\n          } else {\n            $('#listing_notifier').show().html(\"<span class=\\\"atbdp_success\\\">\".concat(response.success_msg, \"</span>\"));\n\n            if (qs.redirect) {\n              var is_pending = '?';\n              window.location.href = \"\".concat(response.preview_url + is_pending, \"post_id=\").concat(response.id, \"&preview=1&payment=1&edited=1&redirect=\").concat(qs.redirect);\n            } else {\n              window.location.href = \"\".concat(response.preview_url, \"?preview=1&edited=1&redirect=\").concat(response.redirect_url);\n            }\n          } // preview mode active and need payment\n\n        } else if (response.preview_mode === true && response.need_payment === true) {\n          window.location.href = \"\".concat(response.preview_url, \"?preview=1&payment=1&redirect=\").concat(response.redirect_url);\n        } else {\n          var is_edited = response.edited_listing ? \"\".concat(is_pending, \"listing_id=\").concat(response.id, \"&edited=1\") : '';\n\n          if (response.need_payment === true) {\n            $('#listing_notifier').show().html(\"<span class=\\\"atbdp_success\\\">\".concat(response.success_msg, \"</span>\"));\n            window.location.href = response.redirect_url;\n          } else {\n            $('#listing_notifier').show().html(\"<span class=\\\"atbdp_success\\\">\".concat(response.success_msg, \"</span>\"));\n            window.location.href = response.redirect_url + is_edited;\n          }\n        }\n      }\n    },\n    error: function error(_error) {\n      on_processing = false;\n      $('.directorist-form-submit__btn').attr('disabled', false);\n      $('.directorist-form-submit__btn').removeClass('atbd_loading');\n      console.log(_error);\n    }\n  });\n});\n$('#directorist-quick-login .directorist-toggle-modal').on(\"click\", function (e) {\n  e.preventDefault();\n  $(\"#directorist-quick-login\").removeClass(\"show\");\n}); // scrollToEl\n\nfunction scrollToEl(el) {// const element = typeof el === 'string' ? el : '';\n  // let scroll_top = $(element).offset().top - 50;\n  // scroll_top = scroll_top < 0 ? 0 : scroll_top;\n  // $('html, body').animate(\n  //         {\n  //                 scrollTop: scroll_top,\n  //         },\n  //         800\n  // );\n}\n\n//# sourceURL=webpack:///./assets/src/js/add-listing.js?");

/***/ }),

/***/ "./assets/src/scss/component/add-listing.scss":
/*!****************************************************!*\
  !*** ./assets/src/scss/component/add-listing.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./assets/src/scss/component/add-listing.scss?");

/***/ }),

/***/ 18:
/*!********************************************!*\
  !*** multi ./assets/src/js/add-listing.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./assets/src/js/add-listing.js */\"./assets/src/js/add-listing.js\");\n\n\n//# sourceURL=webpack:///multi_./assets/src/js/add-listing.js?");

/***/ })

/******/ });