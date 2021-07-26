//let app = null
var common = require("./common");

describe('Launching unit tests', () => {
    common.importTest('Server>shared>arrays.shared', './unit/server/shared/arrays.shared.test.js');
});


describe('Launching integration tests', () => {
   /* before(() => {
        console.log("before all tests");
        //app = require('../../dist/dev/app.server');
    });

    //beforeEach(() => {
    //   console.log("running something before each test");
    //});
    
    
    common.importTest('Main page works', './example.test.js');
    common.importTest('AuthService works', './integration/auth.test.js');
    common.importTest('NLUService works', './integration/nlu.test.js');
    
    after(() => {
        console.log("after all tests");
    });
    */
    common.importTest('AuthService works', './integration/auth.test.js');
    common.importTest('SocketIO works', './integration/io.test.js');
   // common.importTest('Delete utterances works', './integration/server/services/utterance.test.js');
});

