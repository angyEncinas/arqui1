class ClientProspectoHandler {
    constructor() {
      // No es necesario nextHandler ya que es el último en la cadena
    }
  
    async handleValidation(clientData, validatedData) {
      if (clientData.source === 'CLIENTE_PROSPECTO') {
        const apiData = await fetchProspectoApiData(clientData.CI, clientData.extension);
        const comparisonResult = compareData(validatedData, apiData);
  
        // Mostrar los campos que no concuerdan
        const fieldsWithMismatch = [];
  
        for (const field in comparisonResult) {
          if (!comparisonResult[field]) {
            fieldsWithMismatch.push(field);
          }
        }
  
        if (fieldsWithMismatch.length > 0) {
          console.log(`Los siguientes campos no concuerdan entre las tres fuentes de datos: ${fieldsWithMismatch.join(', ')}`);
        }
  
        return comparisonResult;
      }
  
      return validatedData;
    }
  }
  
  async function fetchProspectoApiData(CI, extension) {
    // Simulación de llamada a la API de cliente prospecto
    return {
      nombres: 'Alice',
      apellidos: 'Johnson',
      CI: '5555555',
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
  module.exports = ClientProspectoHandler;
  
  