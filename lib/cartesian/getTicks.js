"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTicks = getTicks;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _DataUtils = require("../util/DataUtils");
var _DOMUtils = require("../util/DOMUtils");
var _Global = require("../util/Global");
var _TickUtils = require("../util/TickUtils");
var _getEquidistantTicks = require("./getEquidistantTicks");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap) {
  var result = (ticks || []).slice();
  var len = result.length;
  var start = boundaries.start;
  var end = boundaries.end;
  for (var i = len - 1; i >= 0; i--) {
    var entry = result[i];
    var size = getTickSize(entry, i);
    if (i === len - 1) {
      var gap = sign * (entry.coordinate + sign * size / 2 - end);
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = (0, _TickUtils.isVisible)(sign, entry.tickCoord, size, start, end);
    if (isShow) {
      end = entry.tickCoord - sign * (size / 2 + minTickGap);
      result[i] = _objectSpread(_objectSpread({}, entry), {}, {
        isShow: true
      });
    }
  }
  return result;
}
function getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, preserveEnd) {
  var result = (ticks || []).slice();
  var len = result.length;
  var start = boundaries.start,
    end = boundaries.end;
  if (preserveEnd) {
    // Try to guarantee the tail to be displayed
    var tail = ticks[len - 1];
    var tailSize = getTickSize(tail, len - 1);
    var tailGap = sign * (tail.coordinate + sign * tailSize / 2 - end);
    result[len - 1] = tail = _objectSpread(_objectSpread({}, tail), {}, {
      tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign : tail.coordinate
    });
    var isTailShow = (0, _TickUtils.isVisible)(sign, tail.tickCoord, tailSize, start, end);
    if (isTailShow) {
      end = tail.tickCoord - sign * (tailSize / 2 + minTickGap);
      result[len - 1] = _objectSpread(_objectSpread({}, tail), {}, {
        isShow: true
      });
    }
  }
  var count = preserveEnd ? len - 1 : len;
  for (var i = 0; i < count; i++) {
    var entry = result[i];
    var size = getTickSize(entry, i);
    if (i === 0) {
      var gap = sign * (entry.coordinate - sign * size / 2 - start);
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign : entry.coordinate
      });
    } else {
      result[i] = entry = _objectSpread(_objectSpread({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = (0, _TickUtils.isVisible)(sign, entry.tickCoord, size, start, end);
    if (isShow) {
      start = entry.tickCoord + sign * (size / 2 + minTickGap);
      result[i] = _objectSpread(_objectSpread({}, entry), {}, {
        isShow: true
      });
    }
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  var tick = props.tick,
    ticks = props.ticks,
    viewBox = props.viewBox,
    minTickGap = props.minTickGap,
    orientation = props.orientation,
    interval = props.interval,
    tickFormatter = props.tickFormatter,
    unit = props.unit,
    angle = props.angle;
  if (!ticks || !ticks.length || !tick) {
    return [];
  }
  if ((0, _DataUtils.isNumber)(interval) || _Global.Global.isSsr) {
    return (0, _TickUtils.getNumberIntervalTicks)(ticks, typeof interval === 'number' && (0, _DataUtils.isNumber)(interval) ? interval : 0);
  }
  var candidates = [];
  var sizeKey = orientation === 'top' || orientation === 'bottom' ? 'width' : 'height';
  var unitSize = unit && sizeKey === 'width' ? (0, _DOMUtils.getStringSize)(unit, {
    fontSize: fontSize,
    letterSpacing: letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var getTickSize = function getTickSize(content, index) {
    var value = (0, _isFunction2["default"])(tickFormatter) ? tickFormatter(content.value, index) : content.value;
    // Recharts only supports angles when sizeKey === 'width'
    return sizeKey === 'width' ? (0, _TickUtils.getAngledTickWidth)((0, _DOMUtils.getStringSize)(value, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    }), unitSize, angle) : (0, _DOMUtils.getStringSize)(value, {
      fontSize: fontSize,
      letterSpacing: letterSpacing
    })[sizeKey];
  };
  var sign = ticks.length >= 2 ? (0, _DataUtils.mathSign)(ticks[1].coordinate - ticks[0].coordinate) : 1;
  var boundaries = (0, _TickUtils.getTickBoundaries)(viewBox, sign, sizeKey);
  if (interval === 'equidistantPreserveStart') {
    return (0, _getEquidistantTicks.getEquidistantTicks)(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  if (interval === 'preserveStart' || interval === 'preserveStartEnd') {
    candidates = getTicksStart(sign, boundaries, getTickSize, ticks, minTickGap, interval === 'preserveStartEnd');
  } else {
    candidates = getTicksEnd(sign, boundaries, getTickSize, ticks, minTickGap);
  }
  return candidates.filter(function (entry) {
    return entry.isShow;
  });
}