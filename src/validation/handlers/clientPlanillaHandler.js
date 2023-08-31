class ClientPlanillaHandler {
    constructor(nextHandler) {
      this.nextHandler = nextHandler;
    }
  
    async handleValidation(clientData, validatedData) {
      if (clientData.source === 'CLIENTE_PLANILLA') {
        const apiData = await fetchPlanillaApiData(clientData.CI, clientData.extension);
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
  
  async function fetchPlanillaApiData(CI, extension) {
    // Simulación de llamada a la API de cliente planilla
    return {
      nombres: 'John',
      apellidos: 'Doe',
      CI: '123456789',
      extension: 'LA',
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
  
  module.exports = ClientPlanillaHandler;
  