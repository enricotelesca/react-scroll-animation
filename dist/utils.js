(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.utils = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by enrico on 25/11/16.
   */

  const serverSideUtil = typeof window !== 'undefined' ? null : () => {};

  const scroll = {
    y: () => serverSideUtil || window.scrollY || window.pageYOffset,
    z: () => serverSideUtil || window.scrollX || window.pageXOffset
  };

  const dimensions = {
    y: () => serverSideUtil || window.innerHeight,
    x: () => serverSideUtil || window.innerWidth,
    d: () => serverSideUtil || Math.sqrt(window.innerHeight * window.innerHeight + window.innerWidth * window.innerWidth),
    b: () => serverSideUtil || Math.acos(window.innerWidth / Math.sqrt(window.innerHeight * window.innerHeight + window.innerWidth * window.innerWidth))
  };

  const easeInOut = pos => {
    return -0.5 * (Math.cos(Math.PI * pos) - 1);
  };

  exports.scroll = scroll;
  exports.dimensions = dimensions;
  exports.easeInOut = easeInOut;
});