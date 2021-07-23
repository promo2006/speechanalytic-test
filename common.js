var axios = require('axios');
var path = require('path');
let chai = require('chai');
let sinon = require('sinon');
let faker = require('faker');

let chaiHttp = require('chai-http');
//let app = require('../../dist/dev/app.server');
let should = chai.should();

chai.use(chaiHttp);

// Definimos las rutas para las carpetas de client y server
const clientSrcPath = path.resolve(__dirname, '../..', 'dist/dev/client').replace(/\\/g, '/');
const serverSrcPath = path.resolve(__dirname, '../..', 'dist/dev/server').replace(/\\/g, '/');

// Endpoint del server de speechanalytics
const clientUrl = 'http://localhost:5100';
const serverUrl = 'http://localhost:9001';

let adminUser = { user: 'admin', password: '289128e9a91391c0198705308a88ea5c'}
//let vccUser = { user: 'analytic@allegro', password: 'dbaf4be87cdcc70cf27c1b28a88e155b'} // Usuario para vcc allegro y LUIS
let vccUser = { user: 'happy@incollege', password: 'a2fa1f83eb8931899553f609a191c636'} // Usuario para vcc allegro y LUIS
//let vccUser = { user: 'analytic@occ_test', password: 'dbaf4be87cdcc70cf27c1b28a88e155b'} // Usuario para vcc occ_test y RASA
let newNlu = { name: 'nlu-test-borrable', culture: 'es-es' }
let newEntity = { name: 'entity-test-borrable' }
let newIntent = { name: 'intent-test-borrable' }
let utterance={appId: "17d69bef-83be-4422-94cb-0b37acbec7d0", intentId: "55a26838-9058-4528-a8f0-d0d0e850dfcf", text: "aeropuerto", utteranceId: "3534965496"};

var values = {
    user: vccUser,
    //user: vccUser,
    newNlu: newNlu,
    newEntity: newEntity,
    newIntent: newIntent,
    utterance
};

function ImportTest(name, path) {
    describe(name, () => {
        require(path);
    });
}

exports.values = values;
exports.axios = axios;
exports.chai = chai;
exports.should = should;
exports.faker = faker;
exports.sinon = sinon;
exports.clientUrl = clientUrl;
exports.serverUrl = serverUrl;
exports.clientSrcPath = clientSrcPath;
exports.serverSrcPath = serverSrcPath;

exports.importTest = ImportTest;
