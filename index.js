var express = require('express');
let app = express();

//let app = null
var common = require("./common");

let serverSrcPath = common.serverSrcPath;
let mssqlInit = require( `${serverSrcPath}/db/mssql.init`);
let redisInit = require( `${serverSrcPath}/db/redis.init`);

describe('Launching unit tests', () => {
    before(() => {
        // Inicializo conexión a Redis.
		return redisInit.RedisInit(app)
        .then(_ => { 
            // Para probar funciones que consultan a bd necesitamos iniciar la conexión
            return mssqlInit.MsSqlInit(app)
        });
    });

    //common.importTest('Server>shared>arrays.shared', './unit/server/shared/arrays.shared.test.js');
    //common.importTest('Server>shared>request.shared', './unit/server/shared/request.shared.test.js');
    //common.importTest('Server>implementation>audio-transfer.implementation', './unit/server/implementation/audio-transfer.implementation.test.js');
    common.importTest('Server>implementation>rasa-service.implementation', './unit/server/implementation/rasa-service.implementation.test.js');
    //common.importTest('Server>implementation>semantic-query.implementation', './unit/server/implementation/semantic-query.implementation.test.js');
    //common.importTest('Server>implementation>transcriptions.implementation', './unit/server/implementation/transcriptions.implementation.test.js');

    //common.importTest('Server>services>allegro.service', './unit/server/services/allegro.service.test.js');
    //common.importTest('Server>services>linguistic.service', './unit/server/services/linguistic.service.test.js');
});


describe('Launching integration tests', () => {
    
    before(() => {
        //console.log("before all tests");
        /*
        return mssqlInit.MsSqlInit(app)
        .then(_ => {
            
        });
        */
    });
    
    //beforeEach(() => {
    //   console.log("running something before each test");
    //});
    
    //common.importTest('Server>implementation>semantic-query.implementation', './unit/server/implementation/semantic-query.implementation.test.js');
    /*
    common.importTest('Main page works', './example.test.js');
    common.importTest('AuthService works', './integration/auth.test.js');
    common.importTest('NLUService works', './integration/server/services/nlu.service.test.js');
    
    after(() => {
        console.log("after all tests");
    });*/
    //common.importTest('AuthService works', './integration/auth.test.js');
    // common.importTest('SocketIO works', './integration/io.test.js');
    // common.importTest('Delete utterances works', './integration/server/services/utterance.service.test.js');
});

