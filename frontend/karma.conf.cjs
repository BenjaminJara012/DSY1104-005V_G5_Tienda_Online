
module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],

    files: [
      {
        pattern: "tests/.karma/productos.bundle.js",
        watched: false
      },
      {
        pattern: "tests/.karma/carrito.bundle.js",
        watched: false
      },
      {
        pattern: "tests/.karma/checkout.bundle.js",
        watched: false
      },
      {
        pattern: "tests/.karma/ordenes.bundle.js",
        watched: false
      }
    ],

    browsers: ["ChromeHeadless"],

    singleRun: true,

    reporters: ["spec", "coverage"],

    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" },
        { type: "lcovonly", subdir: "." }
      ]
    },

    client: {
      clearContext: false
    },

    browserNoActivityTimeout: 60000
  });
};
