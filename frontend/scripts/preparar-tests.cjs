
const esbuild = require("esbuild");
const babel = require("@babel/core");
const istanbul = require("babel-plugin-istanbul");
const fs = require("fs");
const path = require("path");

const destino = path.resolve(
  __dirname,
  "../tests/.karma"
);

fs.mkdirSync(destino, { recursive: true });

const archivos = [
  "productos.spec.js",
  "carrito.spec.js",
  "checkout.spec.js",
  "ordenes.spec.js"
];

const instrumentarServicios = {
  name: "instrumentar-servicios",

  setup(build) {
    build.onLoad(
      {
        filter: /src[\\/]services[\\/].*\.js$/
      },
      async (args) => {
        const codigo = fs.readFileSync(
          args.path,
          "utf8"
        );

        const resultado = await babel.transformAsync(
          codigo,
          {
            filename: args.path,
            babelrc: false,
            configFile: false,
            plugins: [
              [
                istanbul,
                {
                  include: ["**/src/services/**/*.js"],
                  exclude: []
                }
              ]
            ]
          }
        );

        return {
          contents: resultado.code,
          loader: "js"
        };
      }
    );
  }
};

async function preparar() {
  for (const archivo of archivos) {
    const entrada = path.resolve(
      __dirname,
      "../tests",
      archivo
    );

    const salida = path.join(
      destino,
      archivo.replace(".spec.js", ".bundle.js")
    );

    await esbuild.build({
      entryPoints: [entrada],
      bundle: true,
      platform: "browser",
      format: "iife",
      target: "es2020",
      outfile: salida,
      plugins: [instrumentarServicios]
    });
  }

  console.log("Pruebas preparadas con cobertura.");
}

preparar().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
