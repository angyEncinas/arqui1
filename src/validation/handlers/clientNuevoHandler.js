class ClientNuevoHandler {
  constructor(nextHandler) {
    this.nextHandler = nextHandler;
  }

  async handleValidation(clientData, validatedData) {
    console.log('Validando en ClientNuevoHandler:', clientData);
    console.log('Validtenuevo:', validatedData);
    const apiData = await fetchSenapiApiData(clientData.CI, clientData.extension);
    const comparisonResult = compareData(validatedData, apiData);

    if (this.nextHandler) {
      return this.nextHandler.handleValidation(clientData, comparisonResult);
    }

    return comparisonResult.comparisonResult;
  }
}

async function fetchSenapiApiData(CI, extension) {
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
      nombres: 'Julia',
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
  console.log(comparisonResult);
  return {comparisonResult,validatedData};
}
module.exports = ClientNuevoHandler;
