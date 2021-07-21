const Client = require("socket.io-client");
const assert = require("chai").assert;
let common = require("../common");
let chai = common.chai;
describe("Events testing", () => {
    let clientSocketListener, clientSocketEmit, vcc = 'incollege', userId1 = 'happy', userId2 = 'flash';
    before((done) => {
        clientSocketListener = new Client(`${common.serverUrl}/speech`, {
            secure: true,
            reconnection: true,
            forceNew: false,
            transports: ['websocket', 'polling', 'flashsocket'],
            query: `vcc=${vcc}&userId=${userId1}`
        });
        //   clientSocketListener.on("connect", done);
        clientSocketEmit = new Client(`${common.serverUrl}/speech`, {
            secure: true,
            reconnection: true,
            forceNew: false,
            transports: ['websocket', 'polling', 'flashsocket'],
            query: `vcc=${vcc}&userId=${userId2}`
        });
        clientSocketEmit.on("connect", done);
    });
    after(() => {
        clientSocketListener.close();
        clientSocketEmit.close();
    });
    it('[200] OK: Send events by post request', (done) => {
        let url = `/io/send-events/`;

        chai.request(common.serverUrl)
            .post(url)
            .set({ Authorization: common.values.vccUser.bearer })
            .send([
                {
                    "event": "UPDATE_TRANSCRIPTION",
                    "type": 2,
                    "vcc": "incollege"
                }
            ])
            .end((err, res) => {
                if (res) {
                    res.should.have.status(200);
                    res.body.status.should.to.equal(true);
                    // res.body.data.should.to.have.lengthOf.at.least(0);
                } else {
                    console.log(err);
                    console.log(common.serverUrl + url);
                }

                done();
            });
    });


    it("Emitting evaluation plan update", (done) => {
        clientSocketListener.on("UPDATE_EVALUATION_PLAN", (arg) => {
            assert.equal(arg, null);
            done();
        });
        clientSocketEmit.emit("UPDATE_EVALUATION_PLAN", {
            vcc
        });
    });

    it("Emitting study update", (done) => {
        clientSocketListener.on("UPDATE_STUDY", (arg) => {
            assert.equal(arg, null);
            done();
        });
        clientSocketEmit.emit("UPDATE_STUDY", {
            vcc
        });
    });

    it("Emitting Transcription update", (done) => {
        clientSocketListener.on("UPDATE_TRANSCRIPTION", (arg) => {
            assert.equal(arg, null);
            done();
        });
        clientSocketEmit.emit("UPDATE_TRANSCRIPTION", {
            vcc
        });
    });


});