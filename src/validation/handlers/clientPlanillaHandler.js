class ClientPlanillaHandler {
  constructor(nextHandler) {
    this.nextHandler = nextHandler;
  }

  async handleValidation(clientData, validatedData) {
    console.log('Validando en ClientPlanillaHandler:', clientData);
    console.log('valdateddata en ClientPlanillaHandler:', validatedData);
    const apiData = await fetchWebApiData(clientData.CI, clientData.extension);

    if (this.nextHandler) {
      return this.nextHandler.handleValidation(clientData, apiData);
    }

    return apiData;
  }
}

async function fetchWebApiData(CI, extension) {
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


module.exports = ClientPlanillaHandler;


  