const ClientPlanillaHandler = require('./handlers/clientPlanillaHandler');
const ClientNuevoHandler = require('./handlers/clientNuevoHandler.js');
const ClientProspectoHandler = require('./handlers/clientProspectoHandler.js');

class ClientValidator {
  constructor() {
    this.chain = this.buildValidationChain();
  }

  buildValidationChain() {
    const prospectoHandler = new ClientProspectoHandler();
    const nuevoHandler = new ClientNuevoHandler(prospectoHandler);
    const planillaHandler = new ClientPlanillaHandler(nuevoHandler);
    return planillaHandler;
    
  }

  async validate(clientData) {
    const emptyComparisonResult = {
      nombres: false,
      apellidos: false,
      CI: false,
      extension: false,
      fechaDeNacimiento: false,
      estadoCivil: false,
      profesion: false,
      lugarDeNacimiento: false,
  
    };

    const validationResults = await this.chain.handleValidation(clientData, emptyComparisonResult);

    return validationResults;
  }
}

module.exports = ClientValidator;
