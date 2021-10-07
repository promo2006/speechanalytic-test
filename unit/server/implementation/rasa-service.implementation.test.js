let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let mssql = require( `${serverSrcPath}/db/mssql.service`);
let rasaServiceImplementation = require(`${serverSrcPath}/implementation/rasa-service.implementation`);
let rasaServiceImpl = new rasaServiceImplementation.RASAServiceImplementation();

// 
describe('AddApp', () => {
    it.skip('AddApp: Creating a rasa nlu', () => {
        let nlu ={
            culture: values.newNlu.culture, 
            description: "test-1323", 
            importNLU: false, 
            importNLUFrom: null, 
            importNLULoaded: false, 
            name: faker.random.uuid(),
            vcc: 'collegeocc'
        }

        return rasaServiceImpl.AddApp(null, null, nlu)
        .then(result => {
            console.log('Created nlu:' + nlu.name)
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

//
describe.skip('TrainApp', () => {
    it('TrainApp: Training a rasa nlu', () => {
        let nluAppId  = 'occ_test::saludo_occ_test';

        return rasaServiceImpl.TrainApp(null, null, nluAppId)
        .then(result => {
            console.log(result);
            // Verificamos que tenga el status de éxito de la función
            result.status.should.to.equal('UpToDate');
            result.statusId.should.to.equal(2);
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    })
    .timeout(180000);
});

//
describe.skip('PublishApp', () => {
    it('PublishApp: Launching a rasa nlu', () => {
        let nluAppId  = 'occ_test::saludo_occ_test';

        return rasaServiceImpl.PublishApp(null, null, nluAppId, true)
        .then(result => {
            console.log(result);
            result.should.to.be.a('number');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    })
    .timeout(180000);
});

//
describe('ModelQuery', () => {
    it('ModelQuery: Evaluating a text', () => {
        let nluAppId  = 'occ_test::saludo_occ_test';
        let queryText = 'Hola, buenos dias a todos';

        return rasaServiceImpl.ModelQuery(null, null, nluAppId, queryText, null, null)
        .then(result => {
            console.log(result);
            //result.should.to.be.a('number');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });
});

// 
describe('GetAppsList', () => {
    // 
    it.skip('GetAppsList: Getting all nlus', () => {
        return rasaServiceImpl.GetAppsList(null, null)
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