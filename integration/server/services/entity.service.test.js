let common = require("../../../common");
let chai = common.chai;
let should = common.should;
let values = common.values;

describe('EntityService: GetAll, Create, GetByName', () => {
    it('[200] OK: Getting all Entities', (done) => {
        var url = `/api/entity/get_entities/${values.newNlu.appId}/name/`;
    
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

    it('[200] OK: Create new Entity', (done) => {
        var url = '/api/entity/create_entity';

        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })        
        .send({name: values.newEntity.name, type: "SIMPLE", appId: values.newNlu.appId})
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

    it('[200] OK: Getting created Entity by name', (done) => {
        var url = `/api/entity/get_entities/${values.newNlu.appId}/name/${values.newEntity.name}`;

        chai.request(common.serverUrl)
        .get(url)
        .set({ Authorization: values.user.bearer })
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(1, 'Should have at least 1 item.');

                if (res.body.data && res.body.data.length) {
                    if (res.body.data.find(d => d.name === values.newEntity.name)) {
                        values.newEntity = res.body.data.find(d => d.name === values.newEntity.name);
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

describe('EntityService: Delete', () => {
    it('[200] OK: Delete created Intent', (done) => {
        var url = '/api/entity/delete_entity';
        
        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({entity: values.newEntity})
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