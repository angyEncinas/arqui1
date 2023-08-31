class ClientProspectoHandler {
  constructor() {
    // No es necesario nextHandler ya que es el último en la cadena
  }

  async handleValidation(clientData, validatedData) {
    console.log('Validando en ClientProspectoHandler:', clientData);
    console.log('Validated data ProspectoHandler:', validatedData);
    const apiData = await fetchBancoApiData(clientData.CI, clientData.extension);
    console.log('apidataProspectoHandler:', apiData);
    const comparisonResult = compareData(validatedData.validatedData, apiData);
    const comparisonResultafter = compareData2(validatedData.comparisonResult, comparisonResult);
    // Mostrar los campos que no concuerdan
    const fieldsWithMismatch = [];

    for (const field in comparisonResultafter) {
      if (!comparisonResult[field]) {
        fieldsWithMismatch.push(field);
      }
    }

    if (fieldsWithMismatch.length > 0) {
      console.log(`Los siguientes campos no concuerdan entre las tres fuentes de datos: ${fieldsWithMismatch.join(', ')}`);
    }

    return comparisonResult;
  }
}

async function fetchBancoApiData(CI, extension) {
  // Simulación de llamada a la API de cliente prospecto
  const apiData = [
    {
      nombres: 'Jane',
      apellidos: 'Smith',
      CI: '987654321',
      extension: 'LP',
      fechaDeNacimiento: '20/07/2000',
      estadoCivil: 'soltera',
      profesion: 'abogada',
      lugarDeNacimiento: 'cochabamba',
    },
    {
      nombres: 'Anastasia',
      apellidos: 'Robert',
      CI: '987654555',
      extension: 'SC',
      fechaDeNacimiento: '30/07/1981',
      estadoCivil: 'casada',
      profesion: 'veterinaria',
      lugarDeNacimiento: 'La Paz',
    },
    // Otros datos de clientes prospecto...
  ];

  // Buscar en los datos de la API por CI y extensión
  const matchingData = apiData.find(data => data.CI === CI && data.extension === extension);

  if (matchingData) {
    return matchingData;
  } else {
    throw new Error('Cliente prospecto no encontrado');
  }
}

function compareData(validatedData, apiData) {
  const comparisonResult = {};

  comparisonResult.nombres = validatedData.nombres === apiData.nombres;
  comparisonResult.apellidos = validatedData.apellidos === apiData.apellidos;
  comparisonResult.CI = validatedData.CI === apiData.CI;
  comparisonResult.extension = validatedData.extension === apiData.extension;
  comparisonResult.fechaDeNacimiento = validatedData.fechaDeNacimiento === apiData.fechaDeNacimiento;
  comparisonResult.estadoCivil = validatedData.estadoCivil === apiData.estadoCivil;
  comparisonResult.profesion = validatedData.profesion === apiData.profesion;
  comparisonResult.lugarDeNacimiento = validatedData.lugarDeNacimiento === apiData.lugarDeNacimiento;
  console.log('resultados finales:',comparisonResult);
  return comparisonResult;
}
function compareData2(validatedData, apiData) {
  const comparisonResult = {};

  comparisonResult.nombres = validatedData.nombres === apiData.nombres;
  comparisonResult.apellidos = validatedData.apellidos === apiData.apellidos;
  comparisonResult.CI = validatedData.CI === apiData.CI;
  comparisonResult.extension = validatedData.extension === apiData.extension;
  comparisonResult.fechaDeNacimiento = validatedData.fechaDeNacimiento === apiData.fechaDeNacimiento;
  comparisonResult.estadoCivil = validatedData.estadoCivil === apiData.estadoCivil;
  comparisonResult.profesion = validatedData.profesion === apiData.profesion;
  comparisonResult.lugarDeNacimiento = validatedData.lugarDeNacimiento === apiData.lugarDeNacimiento;
  console.log('resultados finales:',comparisonResult);
  return comparisonResult;
}

module.exports = ClientProspectoHandler;

  