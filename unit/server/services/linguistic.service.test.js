let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let expect = common.expect;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let linguisticService = require(`${serverSrcPath}/services/linguistic.service`);


// Declaramos un array de items con 7 únicos id y 10 únicos name
let interactionsArray = [
    { id: 'int1', name: 'int1_0_1' },
    { id: 'int1', name: 'int1_0_2' },
    { id: 'int2', name: 'int2_0_1' },
    { id: 'int3', name: 'int3_0_1' },
    { id: 'int3', name: 'int3_0_2' },
    { id: 'int4', name: 'int4_0_1' },
    { id: 'int5', name: 'int5_0_1' },
    { id: 'int6', name: 'int6_0_1' },
    { id: 'int7', name: 'int7_0_1' },
    { id: 'int7', name: 'int7_0_2' }
];

// 
describe('GetInteractionsSample', () => {
    it('Getting a sample using integer percentage', () => {
        var samplePercentage = 70; // Porcentaje de la muestra
        var idField = ''; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra

        var result = linguisticService.GetInteractionsSample(interactionsArray, samplePercentage, idField, maxSampleSize);
        result.sampleInteractionIds.should.to.have.lengthOf(5, 'Should be 5 items');
    });

    it('Getting a sample using decimal percentage', () => {
        var samplePercentage = 0.7; // Porcentaje de la muestra
        var idField = ''; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra

        var result = linguisticService.GetInteractionsSample(interactionsArray, samplePercentage, idField, maxSampleSize);
        result.sampleInteractionIds.should.to.have.lengthOf(5, 'Should be 5 items');
    });

    it('Getting a sample using a custom field', () => {
        var samplePercentage = 0.7; // Porcentaje de la muestra
        var idField = 'name'; // Nombre del property unica para búsqueda
        var maxSampleSize = 8; // Máximo de items para la muestra
        
        var result = linguisticService.GetInteractionsSample(interactionsArray, samplePercentage, idField, maxSampleSize);
        result.sampleInteractionIds.should.to.have.lengthOf(7, 'Should be 7 items');
        result.sampleInteractionDetails.should.to.have.lengthOf(7, 'Should be 7 items');
    });

    it('Getting a sample using a maxSampleSize', () => {
        var samplePercentage = 0.7; // Porcentaje de la muestra
        var idField = 'name'; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra
        
        var result = linguisticService.GetInteractionsSample(interactionsArray, samplePercentage, idField, maxSampleSize);
        result.sampleInteractionIds.should.to.have.lengthOf(5, 'Should be 5 items');
        result.sampleInteractionDetails.should.to.have.lengthOf(5, 'Should be 5 items');
    });

    it('Getting error using null as interactionsArray', () => {
        var samplePercentage = 0.7; // Porcentaje de la muestra
        var idField = 'name'; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra
        
        should.Throw(() => linguisticService.GetInteractionsSample(null, samplePercentage, idField, maxSampleSize), 'SERVER_ERROR_NO_ITEMS_RECEIVED');
    });

    it('Getting error using empty array as interactionsArray', () => {
        var samplePercentage = 0.7; // Porcentaje de la muestra
        var idField = 'name'; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra
        
        should.Throw(() => linguisticService.GetInteractionsSample([], samplePercentage, idField, maxSampleSize), 'SERVER_ERROR_NO_ITEMS_RECEIVED');
    });

    it('Getting error using null as samplePercentage', () => {
        var samplePercentage = null; // Porcentaje de la muestra
        var idField = 'name'; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra
        
        should.Throw(() => linguisticService.GetInteractionsSample(interactionsArray, samplePercentage, idField, maxSampleSize), 'SERVER_ERROR_INVALID_SAMPLE_PERCENTAGE');
    });

    it('Getting error using a no numeric as samplePercentage', () => {
        var samplePercentage = 'none'; // Porcentaje de la muestra
        var idField = 'name'; // Nombre del property unica para búsqueda
        var maxSampleSize = 5; // Máximo de items para la muestra
        
        should.Throw(() => linguisticService.GetInteractionsSample(interactionsArray, samplePercentage, idField, maxSampleSize), 'SERVER_ERROR_INVALID_SAMPLE_PERCENTAGE');
    });
});