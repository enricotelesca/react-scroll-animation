(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './SlideComponent.jsx'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./SlideComponent.jsx'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.SlideComponent);
    global.FloatingSlide = mod.exports;
  }
})(this, function (exports, _react, _SlideComponent) {
  /**
   * Created by enrico on 24/11/16.
   */

  /**
   * Created by enrico on 24/11/16.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _SlideComponent2 = _interopRequireDefault(_SlideComponent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function FloatingSlideComponent() {
    return class extends _react.Component {
      render() {
        const position = this.props.isStaticVersion ? 'relative' : 'fixed';
        const transform = this.props.isStaticVersion ? '' : 'translate3d(0px,100%,0px)';
        const style = Object.assign({}, {
          transform: transform,
          position: position,
          zIndex: 100,
          top: '0px',
          left: '0px'
        }, this.props.style);
        return _react2.default.createElement(_SlideComponent2.default, _extends({ slideStyle: style, type: 'float' }, this.props));
      }
    };
  }

  const FloatingSlide = FloatingSlideComponent();
  exports.default = FloatingSlide;
});