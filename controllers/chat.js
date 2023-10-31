const axios = require('axios');
const config = require('../config')


const jsonExamples = `{
    "historias_usuarios": [
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
  }`;

  async function sendMessage(req,res){

    console.log(req.body.mensaje)

    const data = JSON.stringify({
        "model": config.model_chatgpt,
        "messages": [
          {
            "role": "user",
            "content": `Dame ${req.body.cantidadRespuestas} ejemplos de historia de usuario de este requerimiento: ${req.body.mensaje}. quiero que la respuesta me la devuelvas en este formato JSON solo basate en el siguiente ejemplo no quiero que crees las mismas historias del ejemplo: ${jsonExamples}`
          }
        ],
        "temperature": config.temperature,
        "max_tokens": config.max_tokens
      });
    
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
        console.error(error);
        res.status(500).send({code:1,message: 'Hubo En error al consultar el servicio'})
      }

  }

  module.exports = {
    sendMessage
}