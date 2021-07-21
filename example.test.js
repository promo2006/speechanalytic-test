let common = require("./common");
let chai = common.chai;
let should = common.should;
let values = common.values;

// Test para validar la página principal de speech
it('[200] OK: Index response', (done) => {
    chai.request(common.clientUrl)
    .get('/')
    .end((err, res) => {
        if (res) {
            res.should.have.status(200);
        } else {
            console.log(err);
            console.log(common.serverUrl);
        }
        
        done();
    });
});