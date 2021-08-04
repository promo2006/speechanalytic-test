let common = require("../../../common");
let chai = common.chai;
let values = common.values;

describe('Uterance Service: Delete utterances', () => {
    it('[200] OK: Deleting utterances  ', (done) => {
        var url = '/api/utterance/delete_utterances?mode=0';

        chai.request(common.serverUrl)
            .post(url)
            .set({ Authorization: values.user.bearer })
            .send({ utterances: [values.utterance] })
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

describe('Uterance Service: Delete diarization', () => {
    it('[200] OK: Deleting diarization ', (done) => {
        var url = '/api/utterance/delete_utterance';

        chai.request(common.serverUrl)
            .post(url)
            .set({ Authorization: values.user.bearer })
            .send({ utterance: { appId: "garrix::diarization-es", intentId: "Agent", "intentName": "Agent", "id": "ff68a78d-2359-4e82-a905-bcec73a6f776", "text": "buen día" } })
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

describe('Uterance Service: Filter utterances', () => {
    it('[200] OK: Filtering utterances by text', (done) => {
        var url = 'api/utterance/get_utterances/316edacf-8b91-4e14-a3a7-d877c732f076/name/ale';

        chai.request(common.serverUrl)
            .get(url)
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

