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

  

    let historias = req.body;
    for (let item of historias) {
        let descripcionCompleta = "";

        // Formatear la descripción según el formato del JSON
        if (isHistoriaUsuario(item)) {
            descripcionCompleta = item.descripcion + "\n\nCriterios de Aceptación:\n";
            for (let criterio of item.criterios) {
                descripcionCompleta += "- " + criterio + "\n";
            }
        } else if (isCasosPrueba(item)) {
            descripcionCompleta = item.descripcion + "\n\nPrecondiciones:\n";
            for (let precondicion of item.precondiciones) {
                descripcionCompleta += "- " + precondicion + "\n";
            }
            descripcionCompleta += "\nPasos:\n";
            for (let paso of item.pasos) {
                descripcionCompleta += "- " + paso + "\n";
            }
            descripcionCompleta += "\nResultados esperados:\n";
            for (let resultado of item.resultados) {
                descripcionCompleta += "- " + resultado + "\n";
            }
        }

        // Construcción del objeto para la solicitud
        const datos = {
            fields: {
                project: {
                    key: 'PER'
                },
                summary: item.nombre,
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

        // Intentar crear la tarjeta en Jira
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

    //res.status(200).send({code:1,message: 'Todos los items en Jira fueron creados correctamente'});
}



module.exports = {
    createTestCase,
    ExpotTestCaseExcel
}