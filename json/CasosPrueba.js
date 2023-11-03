module.exports = {
  "casos_prueba": [
    {
      "titulo": "Acceso a edición de impuestos desde el panel administrativo",
      "descripcion": "Verificar que el administrador pueda acceder a la sección de edición de impuestos desde el panel administrativo.",
      "preCondicion": [
        "El usuario debe estar registrado y autenticado como administrador."
      ],
      "pasos": [
        "Ingresar al sistema con credenciales de administrador.",
        "Acceder al panel de administración.",
        "Buscar y seleccionar la opción de edición de impuestos."
      ],
      "resultadosEsperados": [
        "El administrador accede al panel de administración sin problemas.",
        "La opción de edición de impuestos es visible y accesible."
      ]
    },
    {
      "titulo": "Modificación del impuesto Percepción AFIP RG 4815",
      "descripcion": "Verificar que el administrador pueda modificar el porcentaje del impuesto Percepción AFIP RG 4815.",
      "preCondicion": [
        "El administrador debe estar en la sección de edición de impuestos."
      ],
      "pasos": [
        "Buscar el impuesto Percepción AFIP RG 4815.",
        "Cambiar el porcentaje de 35% a 45%.",
        "Guardar los cambios."
      ],
      "resultadosEsperados": [
        "El sistema permite la modificación del porcentaje sin problemas.",
        "Los cambios se reflejan correctamente al guardar."
      ]
    }
  ]
}
