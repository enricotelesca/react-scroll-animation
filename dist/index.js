(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', './AnimatedComponent.js', './AnimatedSlidesContainer.js', './StaticSlide.js', './FloatingSlide.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('./AnimatedComponent.js'), require('./AnimatedSlidesContainer.js'), require('./StaticSlide.js'), require('./FloatingSlide.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.AnimatedComponent, global.AnimatedSlidesContainer, global.StaticSlide, global.FloatingSlide);
    global.index = mod.exports;
  }
})(this, function (module, _AnimatedComponent, _AnimatedSlidesContainer, _StaticSlide, _FloatingSlide) {
  'use strict';

  var _AnimatedComponent2 = _interopRequireDefault(_AnimatedComponent);

  var _AnimatedSlidesContainer2 = _interopRequireDefault(_AnimatedSlidesContainer);

  var _StaticSlide2 = _interopRequireDefault(_StaticSlide);

  var _FloatingSlide2 = _interopRequireDefault(_FloatingSlide);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  module.exports = {
    AnimatedComponent: _AnimatedComponent2.default,
    AnimatedSlidesContainer: _AnimatedSlidesContainer2.default,
    StaticSlide: _StaticSlide2.default,
    FloatingSlide: _FloatingSlide2.default
  };
});