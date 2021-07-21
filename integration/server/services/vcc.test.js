let common = require("../../../common");
let chai = common.chai;
let should = common.should;
let values = common.values;

describe('VCCService: Integrated', () => {
    it('[200] OK: Getting integrated VCCs', (done) => {
        var url = '/api/vcc/get_integrated_vccs';

        chai.request(common.serverUrl)
        .post(url)
        .set({ Authorization: values.user.bearer })
        .send({})
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
});