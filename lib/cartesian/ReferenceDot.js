"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReferenceDot = ReferenceDot;
var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Layer = require("../container/Layer");
var _Dot = require("../shape/Dot");
var _Label = require("../component/Label");
var _DataUtils = require("../util/DataUtils");
var _IfOverflowMatches = require("../util/IfOverflowMatches");
var _CartesianUtils = require("../util/CartesianUtils");
var _LogUtils = require("../util/LogUtils");
var _ReactUtils = require("../util/ReactUtils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /**
                                                                                                                                                                                                                                                                                                                                                                                               * @fileOverview Reference Dot
                                                                                                                                                                                                                                                                                                                                                                                               */
var getCoordinate = function getCoordinate(props) {
  var x = props.x,
    y = props.y,
    xAxis = props.xAxis,
    yAxis = props.yAxis;
  var scales = (0, _CartesianUtils.createLabeledScales)({
    x: xAxis.scale,
    y: yAxis.scale
  });
  var result = scales.apply({
    x: x,
    y: y
  }, {
    bandAware: true
  });
  if ((0, _IfOverflowMatches.ifOverflowMatches)(props, 'discard') && !scales.isInRange(result)) {
    return null;
  }
  return result;
};
function ReferenceDot(props) {
  var x = props.x,
    y = props.y,
    r = props.r,
    alwaysShow = props.alwaysShow,
    clipPathId = props.clipPathId;
  var isX = (0, _DataUtils.isNumOrStr)(x);
  var isY = (0, _DataUtils.isNumOrStr)(y);
  (0, _LogUtils.warn)(alwaysShow === undefined, 'The alwaysShow prop is deprecated. Please use ifOverflow="extendDomain" instead.');
  if (!isX || !isY) {
    return null;
  }
  var coordinate = getCoordinate(props);
  if (!coordinate) {
    return null;
  }
  var cx = coordinate.x,
    cy = coordinate.y;
  var shape = props.shape,
    className = props.className;
  var clipPath = (0, _IfOverflowMatches.ifOverflowMatches)(props, 'hidden') ? "url(#".concat(clipPathId, ")") : undefined;
  var dotProps = _objectSpread(_objectSpread({
    clipPath: clipPath
  }, (0, _ReactUtils.filterProps)(props, true)), {}, {
    cx: cx,
    cy: cy
  });
  return /*#__PURE__*/_react["default"].createElement(_Layer.Layer, {
    className: (0, _classnames["default"])('recharts-reference-dot', className)
  }, ReferenceDot.renderDot(shape, dotProps), _Label.Label.renderCallByParent(props, {
    x: cx - r,
    y: cy - r,
    width: 2 * r,
    height: 2 * r
  }));
}
ReferenceDot.displayName = 'ReferenceDot';
ReferenceDot.defaultProps = {
  isFront: false,
  ifOverflow: 'discard',
  xAxisId: 0,
  yAxisId: 0,
  r: 10,
  fill: '#fff',
  stroke: '#ccc',
  fillOpacity: 1,
  strokeWidth: 1
};
ReferenceDot.renderDot = function (option, props) {
  var dot;
  if ( /*#__PURE__*/_react["default"].isValidElement(option)) {
    dot = /*#__PURE__*/_react["default"].cloneElement(option, props);
  } else if ((0, _isFunction2["default"])(option)) {
    dot = option(props);
  } else {
    dot = /*#__PURE__*/_react["default"].createElement(_Dot.Dot, _extends({}, props, {
      cx: props.cx,
      cy: props.cy,
      className: "recharts-reference-dot-dot"
    }));
  }
  return dot;
};