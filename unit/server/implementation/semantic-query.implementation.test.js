let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let mssql = require( `${serverSrcPath}/db/mssql.service`);
let semanticQueryImplementation = require(`${serverSrcPath}/implementation/semantic-query.implementation`);
let semanticQueryImpl = new semanticQueryImplementation.SemanticQueryImplementation();
let requestShared = require(`${serverSrcPath}/shared/request.shared`);


describe('GetIdathaQueryId', () => {
    let sandbox = null;
    let idatha = null; 
    let accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzU5OTA1MDUsIm5iZiI6MTYzNTk5MDUwNSwianRpIjoiNTczYmJmYzUtZWYyYi00M2U1LThiMmQtYWZiMDE4NTJhZjNmIiwiZXhwIjoxNjM2NTk1MzA1LCJpZGVudGl0eSI6eyJ1c2VybmFtZSI6ImFkbW9uIiwicmVhbG0iOiJjb2xsZWdlb2NjIiwibGV2ZWwiOiJzdGFuZGFyZCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJsZXZlbCI6InN0YW5kYXJkIn19.7sWPAz45v1UmuMOmXQfCyVyaqZl49HclbjrGBKr7HmU';
    let vcc = 'collegeocc'
    let processId = "1PT88E0N-R3A5-NZ1E-5RV1-8C9P7562P8ZL"//'20210817-1702_prueba';//'09BEKR05-6CY6-T38N-2637-06AVF1E594J3';
    let currentQueueId = 'queue::test';
    let executionCode = '1626965556676';

    // Test para verificar el funcionamiento cuando speechmatics retorna error
    it('GetIdathaQueryId: Testing process filters', () => {

        return mssql.MSSql.GetProcessTask(vcc, processId)
        .then(result => {
            return semanticQueryImpl.GetIdathaQueryId(idatha, accessToken, result, currentQueueId, executionCode)
        })
        .then(result => {
            console.log(result);
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });
});
/*
describe('GetIdathaQuery', () => {
    let idatha = null; 
    let accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzI3NTQ2NDQsIm5iZiI6MTYzMjc1NDY0NCwianRpIjoiMzk0Nzg1NjgtODQ2OS00NzllLWI1MWEtYzRlNjE2Mzc4MTY4IiwiZXhwIjoxNjMzMzU5NDQ0LCJpZGVudGl0eSI6eyJ1c2VybmFtZSI6InVzZXJfc3BlZWNoIiwicmVhbG0iOiJjb2xsZWdlb2NjIiwibGV2ZWwiOiJzdGFuZGFyZCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJsZXZlbCI6InN0YW5kYXJkIn19.3XfcjzuMIAEhffSdQxrJW9WOoL0R8d40wpg-u30zu-c';
    let vcc = 'collegeocc';
    let idathaQueryId = '6150c2fd721c7921b3791c73';//'61489a86721c7921b3791c1d';
    let genericQueryId = 'query1';//'en_buy';//'hola_v';//'en_hello';//'hola'//
    let genericQueryQuery = null;
    let queryType = null;

    // Test para verificar el funcionamiento cuando speechmatics retorna error
    it('GetIdathaQuery: Testing query', () => {
        return mssql.MSSql.GetGenericQuery(vcc, genericQueryId)
        .then(result => {
            genericQueryQuery = result.query;
            console.log(result.query);
            
            let options = semanticQueryImpl.GetIdathaRequestOptions(vcc, idatha, accessToken, idathaQueryId, result.query, 0, 15, result.version, null);
            queryType = options.queryType;
            console.log(options.body)
            
            return requestShared.SimplePostRequest(options.body)
        })
        .then(result => {
            // Homologamos la respuesta de idatha
            let response = semanticQueryImpl.GetIdathaRequestResponse(queryType, genericQueryQuery, result);
            
            console.log(response);

            //return semanticQueryImpl.GetIdathaRequestOptions(vcc, idatha, accessToken, queryId, query, from, size, version, null);
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });

});
*/