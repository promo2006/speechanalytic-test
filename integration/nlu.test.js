let common = require("../common");
let chai = common.chai;
let should = common.should;
let values = common.values;

describe('NLUService: GetAll, Create, GetByName', () => {
    // Test para validar el servicio de getNlus correctamente
    it('[200] OK: Getting all NLUs', (done) => {
        var url = '/api/nlu/get_nlus/';

        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({searchCriteria: "name", searchExpression: "", isSystemApp: false})
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(0);
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });

    it('[200] OK: Create new NLU', (done) => {
        var url = '/api/nlu/create_nlu';

        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({culture: values.newNlu.culture, description: "test", importNLU: false, importNLUFrom: null, importNLULoaded: false, name: values.newNlu.name})
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });

    it('[200] OK: Getting created NLU by name', (done) => {
        var url = '/api/nlu/get_nlus/';

        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({searchCriteria: values.newNlu.name, searchExpression: "", isSystemApp: false})
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(1, 'Should have at least 1 item.');

                if (res.body.data && res.body.data.length) {
                    if (res.body.data.find(d => d.name === values.newNlu.name)) {
                        values.newNlu = res.body.data.find(d => d.name === values.newNlu.name);
                    } else {
                        console.log(err);
                        console.log(common.serverUrl);
                    }
                    
                } else {
                    console.log(err);
                    console.log(common.serverUrl);
                }
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });
});

// Ejecutamos los test de Entity e Intent antes de eliminar el nlu
common.importTest('EntityService works', './integration/entity.test.js');
common.importTest('IntentService works', './integration/intent.test.js');

describe('NLUService: Delete', () => {
    it('[200] OK: Delete created NLU', (done) => {
        var url = '/api/nlu/delete_nlu';
        
        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.vccUser.bearer })
        .send({nlu: values.newNlu})
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });
});