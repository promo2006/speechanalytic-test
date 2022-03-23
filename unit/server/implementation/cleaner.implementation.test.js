let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let mssql = require( `${serverSrcPath}/db/mssql.service`);
let cleanerImplementation = require(`${serverSrcPath}/implementation/cleaner.implementation`);
let cleanerImpl = new cleanerImplementation.CleanerImplementation();

//
describe('CleanReadyProcessInteractions', () => {
    it('CleanReadyProcessInteractions: DEV', () => {
        let executionCode = '0123456789';

        return cleanerImpl.CleanReadyProcessInteractions(executionCode)
        .then(result => {
            console.log(result);
            // Verificamos que tenga el status de éxito de la función
            /*
            result.status.should.to.equal(3);
            result.jobId.should.to.equal(99999);
            should.equal(result.errorFunction, null);
            should.equal(result.errorMessage, null);
            should.equal(result.errorDetail, null);
            */
            //result.jobId.should.to.be.a('number', 99999);
            //result.errorFunction.should.to.be.a('null');
            //result.errorMessage.should.to.be.a('null');
            //result.errorDetail.should.to.be.a('null');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });
});
