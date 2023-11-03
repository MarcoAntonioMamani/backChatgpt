const axios = require('axios');
const config = require('../config')
let jsonHistoriaUsuario=require('../json/HistoriaUsuario')
let jsonCasosPruebas=require('../json/CasosPrueba')


jsonHistoriaUsuario=`{"historias_usuarios": [
  {
    "nombre": "Registro de Usuarios",
    "descripcion": "Como usuario, quiero poder registrarme en la plataforma para acceder a mis funciones personalizadas.",
    "criterios_aceptacion": [
      "Debo poder acceder a la página de registro desde la página de inicio.",
      "Debo poder ingresar mi nombre, dirección de correo electrónico y contraseña para registrarme.",
      "Debo recibir un correo electrónico de confirmación después de registrarme.",
      "Debo poder iniciar sesión con las credenciales que utilicé durante el registro.",
      "Debo ver un mensaje de bienvenida después de iniciar sesión correctamente."
    ]
  },
  {
    "nombre": "Gestión de Perfiles de Usuario",
    "descripcion": "Como administrador, quiero poder gestionar los perfiles de usuario para controlar los accesos y permisos.",
    "criterios_aceptacion": [
      "Debo poder agregar nuevos perfiles de usuario.",
      "Debo poder editar los permisos de los perfiles existentes.",
      "Debo poder desactivar perfiles de usuario si es necesario.",
      "Debo ver una lista de todos los perfiles de usuario disponibles."
    ]
  }
]
}`

jsonCasosPruebas=`{
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
}`
  async function sendMessage(req,res){

    console.log(req.body.mensaje)
 //jsonHistoriaUsuario=JSON.stringify(jsonHistoriaUsuario)
 //jsonCasosPruebas=JSON.stringify(jsonCasosPruebas)


 
    const data = obtenerDataJson(req.body.tipo,req.body.cantidadRespuestas,req.body.mensaje)
    
      const configChat = {
        method: 'post',
        maxBodyLength: Infinity,
        url: config.url_chatgpt,
        headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.key_chatgpt}`
        },
        data: data
      };
    
      try {
        const response = await axios.request(configChat);
        console.log("-----------------------------------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------------------------------")
        console.log(JSON.parse(response.data.choices[0].message.content))
        return res.status(200).send(JSON.parse(response.data.choices[0].message.content))

      } catch (error) {
        console.log('ERORRR----------------------------------')
        console.log(response.data.choices[0].message.content)
        console.error(error);
        res.status(500).send({code:1,message: 'Hubo En error al consultar el servicio'})
      }

  }

  function obtenerDataJson(tipo,cantidadRespuestas,mensaje){

    if (tipo==1){
  return JSON.stringify({
    "model": config.model_chatgpt,
    "messages": [
      {
        "role": "user",
        "content": `Dame ${cantidadRespuestas} ejemplos de historia de usuario de este requerimiento: ${mensaje}. quiero que la respuesta me la devuelvas en este formato JSON solo basate en el siguiente ejemplo no quiero que crees las mismas historias del ejemplo: ${jsonHistoriaUsuario}`
      }
    ],
    "temperature": config.temperature,
    "max_tokens": config.max_tokens
  });
    }else{

      return JSON.stringify({
        "model": config.model_chatgpt,
        "messages": [
          {
            "role": "user",
            "content": `Dame ${cantidadRespuestas} ejemplos de casos de pruebas de este requerimiento: ${mensaje}. quiero que la respuesta me la devuelvas en este formato JSON solo basate en el siguiente ejemplo no quiero que crees los mismos casos de pruebas del ejemplo: ${jsonCasosPruebas}`
          }
        ],
        "temperature": config.temperature,
        "max_tokens": config.max_tokens
      });
    }


  }

  module.exports = {
    sendMessage
}