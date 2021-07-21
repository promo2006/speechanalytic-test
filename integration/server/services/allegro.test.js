let common = require("../../../common");
let chai = common.chai;
let should = common.should;
let values = common.values;

let campaign = null;

describe('AllegroService: Integrated', () => {
    it('[200] OK: Getting campaigns', (done) => {
        var url = '/api/process/allegro/get_allegro_campaigns';

        chai.request(common.serverUrl)
        .get(url)
        .set({ Authorization: values.user.bearer })
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(0, 'Should be at least 0');

                // Asignamos una campaña a la variable local
                campaign = res.body.data[0]
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });

    it('[200] OK: Getting agents', (done) => {
        var url = '/api/process/allegro/get_allegro_agents/:campaign';

        chai.request(common.serverUrl)
        .get(url)
        .set({ Authorization: values.user.bearer })
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(0, 'Should be at least 0');
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });

    it('[200] OK: Getting dispositionCodes', (done) => {
        var url = '/api/process/allegro/get_allegro_management_results';

        chai.request(common.serverUrl)
        .get(url)
        .set({ Authorization: values.user.bearer })
        .end((err, res) => {
            if (res) {
                res.should.have.status(200);
                res.body.status.should.to.equal(true);
                res.body.data.should.to.have.lengthOf.at.least(0, 'Should be at least 0');
            } else {
                console.log(err);
                console.log(common.serverUrl);
            }
            
            done();
        });
    });
});