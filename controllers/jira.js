const axios = require('axios');
const config = require('../config');
const { json } = require('body-parser');

async function createTestCase(req,res){
    
   // console.log(JSON.stringify(req.body))
    console.log("------------------------------")
    const url = 'https://ecosistemas22.atlassian.net/rest/api/3/issue';
    const encodedToken = Buffer.from(`${config.mail_jira}:${config.toke_jira}`).toString('base64');
    const configuracion = {
        headers: {
            'Authorization': `Basic ${encodedToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    let historias=req.body
    for (let historia of historias) {
        // Combinar descripción y criterios de aceptación
        let descripcionCompleta = historia.descripcion + "\n\nCriterios de Aceptación:\n";
        for (let criterio of historia.criterios) {
            descripcionCompleta += "- " + criterio + "\n";
        }
       // console.log(descripcionCompleta)

        // Construir datos para la petición
        const datos = {
            fields: {
                project: {
                    key: 'PER'
                },
                summary: historia.nombre,
                description: {
                    version: 1,
                    type: 'doc',
                    content: [
                        {
                            type: 'paragraph',
                            content: [
                                {
                                    type: 'text',
                                    text: descripcionCompleta
                                }
                            ]
                        }
                    ]
                },
                issuetype: {
                    name: 'Prueba'
                }
            }
        };

        // Hacer la petición a Jira para crear el testcase
        try {
            const response = await axios.post(url, datos, configuracion);
            //let data =JSON.stringify(response)
            console.log(`Testcase creado para la historia: ${historia.nombre}  `);
        } catch (error) {
            console.error(`Error creando testcase para la historia: ${historia.nombre}`);
            console.error(error);
            res.status(500).send({code:1,message: 'Hubo En error al consultar el servicio'})
        }
    }
    res.status(200).send({code:1,message: 'Todos Los item en jira fueron creados correctamente'})
}


module.exports = {
    createTestCase
}