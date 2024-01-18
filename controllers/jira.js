const axios = require('axios');
const config = require('../config');
const excel = require('exceljs');
const fs = require('fs');

  function isHistoriaUsuario(json) {
    return 'criterios' in json;
}
function isCasosPrueba(json) {
    return 'pasos' in json && 'resultados' in json;
}

async function listarTareasTablero(req,res) {

    const boardId=2;
    const url = `https://ecosistemas22.atlassian.net/rest/agile/1.0/board/${boardId}/issue`;
    const encodedToken = Buffer.from(`${config.mail_jira}:${config.toke_jira}`).toString('base64');
    const configuracion = {
        headers: {
            'Authorization': `Basic ${encodedToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

  
    try {
      const respuesta = await axios.get(url, configuracion);
      const tareas = respuesta.data.issues.map(issue => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description
    }));
    res.status(200).send(tareas);
    console.log('Tareas en el tablero:', tareas);
      
    } catch (error) {
      console.error('Error al obtener las tareas:', error.response ? error.response.data : error.message);
    }
  }

async function createTestCase(req,res){
    
    console.log(JSON.stringify(req.body))
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

    let historias = req.body.contenido;
    if (req.body.Tipo!=3 ){
        let tipoContenido=req.body.Tipo
        for (let item of historias) {
            let descripcionCompleta = item;
            let title = "";

            switch (tipoContenido) {
                case 1:
                    title = item.split('\n')[0].replace('Como: ', '');
                    break;
                case 2:
                    title = item.split('\n')[0];
                    break;
                default:
                     title = 'Nombre No Definido';
                    break;
            }
  

            const datos = {
                fields: {
                    project: {
                        key: 'PER'
                    },
                    summary: title,
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
            try {
                const response = await axios.post(url, datos, configuracion);
                console.log(`Testcase creado para: ${item.nombre}`);
            } catch (error) {
                console.error(`Error creando testcase para: ${item.nombre}`);
                console.error(error);
                res.status(500).send({code:1,message: 'Hubo un error al consultar el servicio'});
                return; // Salir del bucle si hay un error
            }
        }
        res.status(200).send({code:1,message: 'Todos los items en Jira fueron creados correctamente'});
    }else{
        for (let item of historias) {
            const url = 'https://ecosistemas22.atlassian.net/rest/api/3/issue/'+req.body.idJira;
            const datos = {
                fields: {
                    project: {
                        key: 'PER'
                    },
                    description: {
                        version: 1,
                        type: 'doc',
                        content: [
                            {
                                type: 'paragraph',
                                content: [
                                    {
                                        type: 'text',
                                        text: item
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
            
            
            try {

                const response = await axios.put(url, datos, configuracion);
                console.log(`Testcase creado para: ${item.nombre}`);
            } catch (error) {
                console.error(`Error creando testcase para: ${item.nombre}`);
                console.error(error);
                res.status(500).send({code:1,message: 'Hubo un error al consultar el servicio'});
                return; // Salir del bucle si hay un error
            }
            res.status(200).send({code:1,message: 'Tarjeta modificada correctamente'});
        }
    }
  
}

async function ExpotTestCaseExcel(req,res){
    
    console.log(JSON.stringify(req.body))
    console.log("------------------------------")
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Casos de Prueba');
    worksheet.columns = [
        { header: 'titulo', key: 'titulo', width: 40 },
        { header: 'descripcion', key: 'descripcion', width: 60 },
        { header: 'precondiciones', key: 'preCondicion', width: 60 },
        { header: 'pasos', key: 'pasos', width: 60 },
        { header: 'resultadosEsperados', key: 'resultadosEsperados', width: 60 },
      ];
    
    let historias = req.body;
    for (let item of historias) {
        let Precondicion = "";
        for (let paso of item.precondiciones) {
            Precondicion += "- " + paso + "\n";
        }
        let pasos = "";
        for (let resultado of item.pasos) {
            pasos += "- " + resultado + "\n";
        }
        let resultadosEsperados = "";
        for (let resultado of item.resultados) {
            resultadosEsperados += "- " + resultado + "\n";
        }

        worksheet.addRow({
            titulo: item.nombre,
            descripcion: item.descripcion,
            preCondicion: Precondicion,
            pasos: pasos,
            resultadosEsperados: resultadosEsperados,
            // Agregar más columnas según tus necesidades
        });
     
    }
    const filename = `casos_de_prueba_${Date.now()}.xlsx`;
    // Guardar el archivo Excel en una ubicación temporal
    await workbook.xlsx.writeFile(filename);

    // Configurar la respuesta HTTP para descargar el archivo Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);


    // Leer el archivo Excel y enviarlo como respuesta
    const fileStream = fs.createReadStream(filename);
    fileStream.pipe(res);

    // Eliminar el archivo temporal después de enviarlo como respuesta
    fileStream.on('end', () => {
        fs.unlinkSync(filename);
    });
}



module.exports = {
    createTestCase,
    ExpotTestCaseExcel,
    listarTareasTablero
}