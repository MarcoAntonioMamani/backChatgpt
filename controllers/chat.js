const axios = require('axios');
const config = require('../config')
let jsonHistoriaUsuario=require('../json/HistoriaUsuario')
let jsonCasosPruebas=require('../json/CasosPrueba')

  async function sendMessage(req,res){

    console.log(req.body.mensaje)
 jsonHistoriaUsuario=JSON.stringify(jsonHistoriaUsuario)
 jsonCasosPruebas=JSON.stringify(jsonCasosPruebas)


 
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