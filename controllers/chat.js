const config = require('../config')
let jsonHistoriaUsuario=require('../json/HistoriaUsuario')
let jsonCasosPruebas=require('../json/CasosPrueba')
let jsonCriterioAceptacion;
const OpenAI= require("openai");
const openai = new OpenAI({apiKey: `${config.key_chatgpt}`});

jsonHistoriaUsuario=`{
  "historiaDeUsuario": [
    {
      "como": "Cliente",
      "quiero": "poder eliminar productos de mis favoritos en el módulo correspondiente",
      "para": "poder gestionar la lista de productos favoritos de manera personalizada y eficiente"
    },
    {
      "como": "Cliente",
      "quiero": "poder eliminar productos de mis favoritos en el módulo correspondiente",
      "para": "poder gestionar la lista de productos favoritos de manera personalizada y eficiente"
    }
  ]
}`

jsonCriterioAceptacion=`{
  "criteriosDeAceptacion": [
    {
      "dado": "soy un Cliente y tengo varios productos en mi lista de favoritos",
      "cuando": "intento eliminar múltiples productos de mi lista de favoritos",
      "entonces": "los productos seleccionados se eliminan de la lista de favoritos"
    },
    {
      "dado": "soy un Cliente y tengo productos en mi lista de favoritos",
      "cuando": "intento eliminar un producto de mi lista de favoritos",
      "entonces": "el producto seleccionado se elimina de la lista de favoritos sin requerir confirmación adicional"
    },
    {
      "dado": "soy un Cliente y he eliminado un producto de mi lista de favoritos",
      "cuando": "la acción de eliminación se completa con éxito",
      "entonces": "recibo una confirmación visual o un mensaje de éxito que indica que el producto se ha eliminado correctamente"
    }
  ]
}`

jsonCasosPruebas=`{"casos_prueba": [
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
    }
  ]}`
  async function sendMessage(req,res){

    console.log(req.body.mensaje)
    console.log(req.body)
    //console.log(obtenerDataJson(req.body.tipo,req.body.cantidadRespuestas,req.body.mensaje))
      try {
       // const completion = await openai.chat.completions.create(obtenerDataJson(req.body.tipo,req.body.cantidadRespuestas,req.body.mensaje)  );
        const completion = await openai.chat.completions.create({
          model: config.model_chatgpt,
          messages:obtenerDataJson(req.body.tipo,req.body.cantidadRespuestas,req.body.mensaje),
          temperature: 0,
          max_tokens: 4096,
        });
        //const response = await axios.request(configChat);
        console.log("-----------------------------------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------------------------------")
        console.log(completion)
        console.log(completion.choices[0].message.content)
        return res.status(200).send(JSON.parse(completion.choices[0].message.content))

      } catch (error) {
        console.log('ERORRR----------------------------------')
      
        if (error.response) { // Verifica si la propiedad response está presente en el objeto de error
          // Puedes acceder a error.response.data, error.response.status, etc.
          
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          // La solicitud fue hecha pero no se recibió respuesta
          console.log(error.request);
        } else {
          // Algo sucedió al configurar la solicitud y se lanzó un error
          console.log('Error', error.message);
        }
        console.error(error.config);
        res.status(500).send({code:1,message: 'Hubo un error al consultar el servicio'})
      }

  }

  function obtenerDataJson(tipo, cantidadRespuestas, mensaje) {
    // Verificar y convertir tipo a entero si es una cadena
    if (typeof tipo === 'string') {
        tipo = parseInt(tipo, 10);

        // Verificar si la conversión fue exitosa
        if (isNaN(tipo)) {
            console.error("Error: El tipo no es un número válido.");
            return []; // Tipo no válido
        }
    }

    // Resto de la función sigue igual, pero ahora tipo siempre es un entero

    switch (tipo) {
        case 1:
            return [
                {
                    "role": "system",
                    "content": `Eres un experto en crear historia de usuarios el cual siempre responderás en este formato que tiene 1 historia de usuario: ${jsonHistoriaUsuario}`
                },
                {
                    "role": "user",
                    "content": `según a esa estructura dame ${cantidadRespuestas} ejemplos de historia de usuario de esta necesidad: ${mensaje} no aumentes la palabra json en la respuesta ni ninguna otra, solo devuélveme en formato del ejemplo que tiene el sistema`
                }
            ];
        case 2:
            return [
                {
                    "role": "system",
                    "content": `Eres un experto en crear casos de prueba el cual siempre responderás en este formato que tiene 1 caso de pruebas: ${jsonCasosPruebas}`
                },
                {
                    "role": "user",
                    "content": `según a esa estructura dame ${cantidadRespuestas} ejemplos de casos de pruebas de esta necesidad: ${mensaje}  no aumentes la palabra json en la respuesta ni ninguna otra, solo devuélveme en formato del ejemplo que tiene el sistema`
                }
            ];
        case 3:
            return [
                {
                    "role": "system",
                    "content": `Eres un experto en crear criterios de Aceptacion el cual siempre responderás en este formato: ${jsonCriterioAceptacion}`
                },
                {
                    "role": "user",
                    "content": `según a esa estructura dame ${cantidadRespuestas} ejemplos de criterios de aceptacion de esta historia de usuario: ${mensaje}  no aumentes la palabra json en la respuesta ni ninguna otra, solo devuélveme en formato del ejemplo que tiene el sistema`
                }
            ];
        default:
            console.error("Error: Tipo no válido.");
            return []; // Tipo no válido
    }
}


  module.exports = {
    sendMessage
}