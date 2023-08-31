const ClientPlanillaHandler = require('../../src/validation/handlers/clientPlanillaHandler');
const ClientNuevoHandler = require('../../src/validation/handlers/clientNuevoHandler');
const ClientProspectoHandler = require('../../src/validation/handlers/clientProspectoHandler');
const ClientValidator = require('../../src/validation/clientValidator');
describe('Client Validation Chain', () => {
  // Prueba simple: Validación exitosa de cliente planilla
  it('should get the web api data successfully', async () => {
    const planillaHandler = new ClientPlanillaHandler(null);
    const clientData = {
      CI: '987654321',
      extension: 'LP',
    };

    const result = await planillaHandler.handleValidation(clientData, clientData);
    expect(result.nombres).toBe('Jane');
    expect(result.apellidos).toBe('Smith');

  });

  // Prueba simple: Validación exitosa de cliente nuevo
  it('should validate a nuevo client successfully', async () => {
    const nuevoHandler = new ClientNuevoHandler(null);
    const clientData = {
      nombres: 'Jane',
      apellidos: 'Smith',
      CI: '987654321',
      extension: 'LP',
      fechaDeNacimiento: '20/07/2000',
      estadoCivil: 'soltera',
      profesion: 'abogada',
      lugarDeNacimiento: 'cochabamba',

    };

    const result = await nuevoHandler.handleValidation(clientData, clientData);
    expect(result.nombres).toBe(true);
    expect(result.apellidos).toBe(true);
    expect(result.CI).toBe(true);
    expect(result.extension).toBe(true);
  });

  
  // Prueba compleja: Validación de cliente prospecto y comparación de datos
  it('should pass through the entire validation chain', async () => {
    const clientData = {
      CI: '987654321',
      extension: 'LP',
    };

    const clientValidator = new ClientValidator();
    const validationResults = await clientValidator.validate(clientData);
    console.log(validationResults );
    // Verificar si los campos pasaron la validación
    expect(validationResults.nombres).toBe(true);
    expect(validationResults.apellidos).toBe(true);
    expect(validationResults.CI).toBe(true);
    expect(validationResults.extension).toBe(true);


  });
  it('should pass through the entire validation chain with wrong data', async () => {
    const clientData = {
      CI: '987654555',
      extension: 'SC',
    };

    const clientValidator = new ClientValidator();
    const validationResults = await clientValidator.validate(clientData);
    console.log(validationResults );
    // Verificar si los campos pasaron la validación
    expect(validationResults.nombres).toBe(false);
    expect(validationResults.apellidos).toBe(true);
    expect(validationResults.CI).toBe(true);
    expect(validationResults.extension).toBe(true);

    
  });

  
});
