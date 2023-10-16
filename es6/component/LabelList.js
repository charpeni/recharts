function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
import _isObject from "lodash/isObject";
import _isFunction from "lodash/isFunction";
import _isNil from "lodash/isNil";
import _last from "lodash/last";
var _excluded = ["valueAccessor"],
  _excluded2 = ["data", "dataKey", "clockWise", "id", "textBreakAll"];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React, { cloneElement } from 'react';
import { Label } from './Label';
import { Layer } from '../container/Layer';
import { findAllByType, filterProps } from '../util/ReactUtils';
import { getValueByDataKey } from '../util/ChartUtils';
var defaultAccessor = function defaultAccessor(entry) {
  return Array.isArray(entry.value) ? _last(entry.value) : entry.value;
};
export function LabelList(_ref) {
  var _ref$valueAccessor = _ref.valueAccessor,
    valueAccessor = _ref$valueAccessor === void 0 ? defaultAccessor : _ref$valueAccessor,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var data = restProps.data,
    dataKey = restProps.dataKey,
    clockWise = restProps.clockWise,
    id = restProps.id,
    textBreakAll = restProps.textBreakAll,
    others = _objectWithoutProperties(restProps, _excluded2);
  if (!data || !data.length) {
    return null;
  }
  return /*#__PURE__*/React.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map(function (entry, index) {
    var value = _isNil(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry && entry.payload, dataKey);
    var idProps = _isNil(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return /*#__PURE__*/React.createElement(Label, _extends({}, filterProps(entry, true), others, idProps, {
      parentViewBox: entry.parentViewBox,
      index: index,
      value: value,
      textBreakAll: textBreakAll,
      viewBox: Label.parseViewBox(_isNil(clockWise) ? entry : _objectSpread(_objectSpread({}, entry), {}, {
        clockWise: clockWise
      })),
      key: "label-".concat(index) // eslint-disable-line react/no-array-index-key
    }));
  }));
}

LabelList.displayName = 'LabelList';
function parseLabelList(label, data) {
  if (!label) {
    return null;
  }
  if (label === true) {
    return /*#__PURE__*/React.createElement(LabelList, {
      key: "labelList-implicit",
      data: data
    });
  }
  if ( /*#__PURE__*/React.isValidElement(label) || _isFunction(label)) {
    return /*#__PURE__*/React.createElement(LabelList, {
      key: "labelList-implicit",
      data: data,
      content: label
    });
  }
  if (_isObject(label)) {
    return /*#__PURE__*/React.createElement(LabelList, _extends({
      data: data
    }, label, {
      key: "labelList-implicit"
    }));
  }
  return null;
}
function renderCallByParent(parentProps, data) {
  var checkPropsLabel = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (!parentProps || !parentProps.children && checkPropsLabel && !parentProps.label) {
    return null;
  }
  var children = parentProps.children;
  var explicitChildren = findAllByType(children, LabelList).map(function (child, index) {
    return /*#__PURE__*/cloneElement(child, {
      data: data,
      // eslint-disable-next-line react/no-array-index-key
      key: "labelList-".concat(index)
    });
  });
  if (!checkPropsLabel) {
    return explicitChildren;
  }
  var implicitLabelList = parseLabelList(parentProps.label, data);
  return [implicitLabelList].concat(_toConsumableArray(explicitChildren));
}
LabelList.renderCallByParent = renderCallByParent;