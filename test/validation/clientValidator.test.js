const ClientPlanillaHandler = require('../../src/validation/handlers/clientPlanillaHandler');
const ClientNuevoHandler = require('../../src/validation/handlers/clientNuevoHandler');
const ClientProspectoHandler = require('../../src/validation/handlers/clientProspectoHandler');

describe('Client Validation Chain', () => {
  // Prueba simple: Validación exitosa de cliente planilla
  it('should validate a planilla client successfully', async () => {
    const planillaHandler = new ClientPlanillaHandler(null);
    const clientData = {
      source: 'CLIENTE_PLANILLA',
      nombres: 'John',
      apellidos: 'Doe',
      CI: '123456789',
      extension: 'LA',
      // Agregar más campos aquí...
    };

    const result = await planillaHandler.handleValidation(clientData, clientData);
    expect(result.nombres).toBe(true);
    expect(result.apellidos).toBe(true);
    expect(result.CI).toBe(true);
    expect(result.extension).toBe(true);
    // Agregar más aserciones para otros campos...
  });

  // Prueba simple: Validación exitosa de cliente nuevo
  it('should validate a nuevo client successfully', async () => {
    const nuevoHandler = new ClientNuevoHandler(null);
    const clientData = {
      source: 'CLIENTE_NUEVO',
      nombres: 'Jane',
      apellidos: 'Smith',
      CI: '987654321',
      extension: 'LP',
      // Agregar más campos aquí...
    };

    const result = await nuevoHandler.handleValidation(clientData, clientData);
    expect(result.nombres).toBe(true);
    expect(result.apellidos).toBe(true);
    expect(result.CI).toBe(true);
    expect(result.extension).toBe(true);
    // Agregar más aserciones para otros campos...
  });

  // ... (más pruebas simples)

  // Prueba compleja: Validación de cliente prospecto y comparación de datos
  it('should validate a prospect client and compare data', async () => {
    const planillaHandler = new ClientPlanillaHandler(null);
    const nuevoHandler = new ClientNuevoHandler(planillaHandler);
    const prospectoHandler = new ClientProspectoHandler(nuevoHandler);
    const clientData = {
      source: 'CLIENTE_PROSPECTO',
      nombres: 'Alice',
      apellidos: 'Johnson',
      CI: '5555555',
      extension: 'CB',
      // Agregar más campos aquí...
    };

    const result = await prospectoHandler.handleValidation(clientData, clientData);

    expect(result.nombres).toBe(false);
    expect(result.apellidos).toBe(false);
    expect(result.CI).toBe(false);
    expect(result.extension).toBe(false);
    // Agregar más aserciones para otros campos...

    // Verificar mensaje de campos que no coinciden
    const expectedErrorMessage = 'Los siguientes campos no concuerdan entre las tres fuentes de datos: nombres, apellidos, CI, extension';
    expect(console.log).toHaveBeenCalledWith(expectedErrorMessage);
  });

  // ... (más pruebas complejas)
});
