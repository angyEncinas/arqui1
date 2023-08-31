const ClientPlanillaHandler = require('./handlers/clientPlanillaHandler');
const ClientNuevoHandler = require('./handlers/clientNuevoHandler');
const ClientProspectoHandler = require('./handlers/clientProspectoHandler');

class ClientValidator {
  constructor() {
    this.handlerChain = new ClientPlanillaHandler(
      new ClientNuevoHandler(
        new ClientProspectoHandler(null)
      )
    );
  }

  async validate(clientData) {
    const initialValidatedData = {
      nombres: clientData.nombres,
      apellidos: clientData.apellidos,
      CI: clientData.CI,
      extension: clientData.extension
      // Agregar más campos aquí...
    };

    return await this.handlerChain.handleValidation(clientData, initialValidatedData);
  }
}

module.exports = ClientValidator;
