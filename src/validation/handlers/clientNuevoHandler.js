class ClientNuevoHandler {
    constructor(nextHandler) {
      this.nextHandler = nextHandler;
    }
  
    async handleValidation(clientData, validatedData) {
      if (clientData.source === 'CLIENTE_NUEVO') {
        const apiData = await fetchNuevoApiData(clientData.CI, clientData.extension);
        const comparisonResult = compareData(validatedData, apiData);
  
        if (this.nextHandler) {
          return this.nextHandler.handleValidation(clientData, comparisonResult);
        }
  
        return comparisonResult;
      }
  
      if (this.nextHandler) {
        return this.nextHandler.handleValidation(clientData, validatedData);
      }
  
      return validatedData;
    }
  }
  
  async function fetchNuevoApiData(CI, extension) {
    // Simulación de llamada a la API de cliente nuevo
    return {
      nombres: 'Jane',
      apellidos: 'Smith',
      CI: '987654321',
      extension: 'LP',
      // Agregar más campos aquí...
    };
  }
  function compareData(validatedData, apiData) {
    const comparisonResult = {};
  
    comparisonResult.nombres = validatedData.nombres === apiData.nombres;
    comparisonResult.apellidos = validatedData.apellidos === apiData.apellidos;
    comparisonResult.CI = validatedData.CI === apiData.CI;
    comparisonResult.extension = validatedData.extension === apiData.extension;
    // Agregar más comparaciones aquí...
  
    return comparisonResult;
  }
  module.exports = ClientNuevoHandler;
  