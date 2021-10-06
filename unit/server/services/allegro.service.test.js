let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let expect = common.expect;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let allegroService = require(`${serverSrcPath}/services/allegro.service`);

// La función GetSupervisors no está exportada, por tanto sus test no se agendan para ejecución automática
describe.skip('GetSupervisors', () => {

    // Test para verificar el funcionamiento (Función no exportada)
    it.skip('GetSupervisors: basic', () => {
        let vcc = 'collegeocc';
        let vccType = 'OTHER'; 
        let campaigns = [];

        return allegroService.GetSupervisors(vcc, vccType, campaigns)
        .then(result => {
            //console.log(result);
            result.should.to.be.a('array');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });
});