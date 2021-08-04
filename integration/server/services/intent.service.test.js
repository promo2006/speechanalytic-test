let common = require("../common");
let chai = common.chai;
let should = common.should;
let values = common.values;

describe('IntentService: GetAll, Create, GetByName', () => {
    it('[200] OK: Getting all Intents', (done) => {
        var url = `/api/intent/get_intents/${values.newNlu.appId}/name/`;
    
        chai.request(common.serverUrl)
        .get(url)
        .set({ Authorization: values.user.bearer })
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(0);
            } else {
                console.log(err);
                console.log(common.serverUrl + url);
            }
            
            done();
        });
    });

    it('[200] OK: Create new Intent', (done) => {
        var url = '/api/intent/create_intent';

        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({name: values.newIntent.name, appId: values.newNlu.appId})
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

    it('[200] OK: Getting created Intent by name', (done) => {
        var url = `/api/intent/get_intents/${values.newNlu.appId}/name/${values.newIntent.name}`;

        chai.request(common.serverUrl)
        .get(url)
        .set({ Authorization: values.user.bearer })
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(1, 'Should have at least 1 item.');

                if (res.body.data && res.body.data.length) {
                    if (res.body.data.find(d => d.name === values.newIntent.name)) {
                        values.newIntent = res.body.data.find(d => d.name === values.newIntent.name);
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

// Ejecutamos los test de Utterance antes de eliminar el intent
//common.importTest('UtteranceService works', './integration/utterance.test.js');

describe('IntentService: Delete', () => {
    it('[200] OK: Delete created Intent', (done) => {
        var url = '/api/intent/delete_intent';
        
        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({intent: values.newIntent})
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