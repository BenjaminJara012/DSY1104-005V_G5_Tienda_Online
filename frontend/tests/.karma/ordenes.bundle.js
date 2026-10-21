(() => {
  // src/services/ordenesService.js
  function cov_dthz6z9l0() {
    var path = "C:\\Users\\usuar\\DSY1104-005V_G5_Tienda_Online\\frontend\\src\\services\\ordenesService.js";
    var hash = "2056392e05c076288fa8684b66f34610ff169762";
    var global = new Function("return this")();
    var gcv = "__coverage__";
    var coverageData = {
      path: "C:\\Users\\usuar\\DSY1104-005V_G5_Tienda_Online\\frontend\\src\\services\\ordenesService.js",
      statementMap: {
        "0": {
          start: {
            line: 2,
            column: 22
          },
          end: {
            line: 2,
            column: 39
          }
        },
        "1": {
          start: {
            line: 5,
            column: 2
          },
          end: {
            line: 16,
            column: 3
          }
        },
        "2": {
          start: {
            line: 6,
            column: 18
          },
          end: {
            line: 6,
            column: 53
          }
        },
        "3": {
          start: {
            line: 8,
            column: 4
          },
          end: {
            line: 8,
            column: 26
          }
        },
        "4": {
          start: {
            line: 8,
            column: 16
          },
          end: {
            line: 8,
            column: 26
          }
        },
        "5": {
          start: {
            line: 10,
            column: 20
          },
          end: {
            line: 10,
            column: 37
          }
        },
        "6": {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 12,
            column: 49
          }
        },
        "7": {
          start: {
            line: 14,
            column: 4
          },
          end: {
            line: 14,
            column: 54
          }
        },
        "8": {
          start: {
            line: 15,
            column: 4
          },
          end: {
            line: 15,
            column: 14
          }
        },
        "9": {
          start: {
            line: 20,
            column: 18
          },
          end: {
            line: 20,
            column: 34
          }
        },
        "10": {
          start: {
            line: 22,
            column: 24
          },
          end: {
            line: 22,
            column: 43
          }
        },
        "11": {
          start: {
            line: 24,
            column: 2
          },
          end: {
            line: 27,
            column: 4
          }
        },
        "12": {
          start: {
            line: 29,
            column: 2
          },
          end: {
            line: 29,
            column: 15
          }
        }
      },
      fnMap: {
        "0": {
          name: "obtenerOrdenes",
          decl: {
            start: {
              line: 4,
              column: 16
            },
            end: {
              line: 4,
              column: 30
            }
          },
          loc: {
            start: {
              line: 4,
              column: 33
            },
            end: {
              line: 17,
              column: 1
            }
          },
          line: 4
        },
        "1": {
          name: "guardarOrden",
          decl: {
            start: {
              line: 19,
              column: 16
            },
            end: {
              line: 19,
              column: 28
            }
          },
          loc: {
            start: {
              line: 19,
              column: 36
            },
            end: {
              line: 30,
              column: 1
            }
          },
          line: 19
        }
      },
      branchMap: {
        "0": {
          loc: {
            start: {
              line: 8,
              column: 4
            },
            end: {
              line: 8,
              column: 26
            }
          },
          type: "if",
          locations: [{
            start: {
              line: 8,
              column: 4
            },
            end: {
              line: 8,
              column: 26
            }
          }, {
            start: {
              line: void 0,
              column: void 0
            },
            end: {
              line: void 0,
              column: void 0
            }
          }],
          line: 8
        },
        "1": {
          loc: {
            start: {
              line: 12,
              column: 11
            },
            end: {
              line: 12,
              column: 48
            }
          },
          type: "cond-expr",
          locations: [{
            start: {
              line: 12,
              column: 36
            },
            end: {
              line: 12,
              column: 43
            }
          }, {
            start: {
              line: 12,
              column: 46
            },
            end: {
              line: 12,
              column: 48
            }
          }],
          line: 12
        }
      },
      s: {
        "0": 0,
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0
      },
      f: {
        "0": 0,
        "1": 0
      },
      b: {
        "0": [0, 0],
        "1": [0, 0]
      },
      _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
      hash: "2056392e05c076288fa8684b66f34610ff169762"
    };
    var coverage = global[gcv] || (global[gcv] = {});
    if (!coverage[path] || coverage[path].hash !== hash) {
      coverage[path] = coverageData;
    }
    var actualCoverage = coverage[path];
    {
      cov_dthz6z9l0 = function() {
        return actualCoverage;
      };
    }
    return actualCoverage;
  }
  cov_dthz6z9l0();
  var CLAVE_ORDENES = (cov_dthz6z9l0().s[0]++, "ordenesLibreria");
  function obtenerOrdenes() {
    cov_dthz6z9l0().f[0]++;
    cov_dthz6z9l0().s[1]++;
    try {
      const datos = (cov_dthz6z9l0().s[2]++, localStorage.getItem(CLAVE_ORDENES));
      cov_dthz6z9l0().s[3]++;
      if (!datos) {
        cov_dthz6z9l0().b[0][0]++;
        cov_dthz6z9l0().s[4]++;
        return [];
      } else {
        cov_dthz6z9l0().b[0][1]++;
      }
      const ordenes = (cov_dthz6z9l0().s[5]++, JSON.parse(datos));
      cov_dthz6z9l0().s[6]++;
      return Array.isArray(ordenes) ? (cov_dthz6z9l0().b[1][0]++, ordenes) : (cov_dthz6z9l0().b[1][1]++, []);
    } catch (error) {
      cov_dthz6z9l0().s[7]++;
      console.error("Error al obtener \xF3rdenes:", error);
      cov_dthz6z9l0().s[8]++;
      return [];
    }
  }
  function guardarOrden(orden) {
    cov_dthz6z9l0().f[1]++;
    const ordenes = (cov_dthz6z9l0().s[9]++, obtenerOrdenes());
    const nuevasOrdenes = (cov_dthz6z9l0().s[10]++, [...ordenes, orden]);
    cov_dthz6z9l0().s[11]++;
    localStorage.setItem(CLAVE_ORDENES, JSON.stringify(nuevasOrdenes));
    cov_dthz6z9l0().s[12]++;
    return orden;
  }

  // tests/ordenes.spec.js
  describe("Registro de \xF3rdenes", () => {
    const clave = "ordenesLibreria";
    let datosOriginales;
    const crearOrden = (id) => ({
      id,
      fecha: "2026-10-20T12:00:00.000Z",
      cliente: {
        nombre: "Cliente Prueba",
        email: "cliente@ejemplo.cl"
      },
      productos: [
        {
          id: 1,
          titulo: "Harry Potter",
          precio: 15e3,
          cantidad: 1,
          subtotal: 15e3
        }
      ],
      total: 15e3,
      estadoPago: "aprobado",
      estadoPedido: "pendiente"
    });
    beforeEach(() => {
      datosOriginales = localStorage.getItem(clave);
      localStorage.removeItem(clave);
    });
    afterEach(() => {
      if (datosOriginales === null) {
        localStorage.removeItem(clave);
      } else {
        localStorage.setItem(clave, datosOriginales);
      }
    });
    it("debe devolver un arreglo vac\xEDo si no existen \xF3rdenes", () => {
      expect(obtenerOrdenes()).toEqual([]);
    });
    it("debe guardar una orden correctamente", () => {
      const orden = crearOrden("ORD-TEST-001");
      guardarOrden(orden);
      const resultado = obtenerOrdenes();
      expect(resultado.length).toBe(1);
      expect(resultado[0].id).toBe("ORD-TEST-001");
      expect(resultado[0].total).toBe(15e3);
    });
    it("debe conservar las \xF3rdenes anteriores", () => {
      guardarOrden(crearOrden("ORD-TEST-001"));
      guardarOrden(crearOrden("ORD-TEST-002"));
      const resultado = obtenerOrdenes();
      expect(resultado.length).toBe(2);
      expect(resultado[0].id).toBe("ORD-TEST-001");
      expect(resultado[1].id).toBe("ORD-TEST-002");
    });
    it("debe recuperar los datos de una orden guardada", () => {
      guardarOrden(crearOrden("ORD-TEST-003"));
      const resultado = obtenerOrdenes();
      const orden = resultado[0];
      expect(orden.cliente.nombre).toBe("Cliente Prueba");
      expect(orden.productos[0].precio).toBe(15e3);
      expect(orden.estadoPago).toBe("aprobado");
      expect(orden.estadoPedido).toBe("pendiente");
    });
  });
})();
