let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let mssql = require( `${serverSrcPath}/db/mssql.service`);
let transcriptionsImplementation = require(`${serverSrcPath}/implementation/transcriptions.implementation`);
let transcriptionsImpl = new transcriptionsImplementation.TranscriptionsImplementation();

// 
const stubDictionaryWordsStubValue = [
    {
        vcc: faker.random.word(),
        dictionaryId: faker.random.word(),
        id: faker.random.uuid(),
        word: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName()
    },
    {
        vcc: faker.random.word(),
        dictionaryId: 'my-dictionary',
        id: 'my-word',
        word: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName()
    },
    {
        vcc: faker.random.word(),
        dictionaryId: faker.random.word(),
        id: faker.random.uuid(),
        word: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName()
    },
];
const stubDictionaryWordSoundLikesValue = [
    {
        vcc: faker.random.word(),
        dictionaryWordId: 'my-word',
        id: faker.random.uuid(),
        soundLike: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName(),
    },
    {
        vcc: faker.random.word(),
        dictionaryWordId: 'my-word',
        id: faker.random.uuid(),
        soundLike: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName(),
    },
    {
        vcc: faker.random.word(),
        dictionaryWordId: faker.random.word(),
        id: faker.random.uuid(),
        soundLike: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName(),
    },
    {
        vcc: faker.random.word(),
        dictionaryWordId: faker.random.word(),
        id: faker.random.uuid(),
        soundLike: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName(),
    },
    {
        vcc: faker.random.word(),
        dictionaryWordId: faker.random.word(),
        id: faker.random.uuid(),
        soundLike: faker.random.word(),
        createdDate: faker.date.past(),
        createdByUserId: faker.internet.userName(),
        lastModifiedDate: faker.date.past(),
        lastModifiedByUserId: faker.internet.userName(),
    }
];

// 
const getDictionaryWordsStub = sinon.stub(mssql.MSSql, 'GetDictionaryWords').returns(stubDictionaryWordsStubValue);
const getDictionaryWordSoundLikesStub = sinon.stub(mssql.MSSql, 'GetDictionaryWordSoundLikes').returns(stubDictionaryWordSoundLikesValue);

// 
describe('UploadAudio', () => {
    let sandbox = null;
    let interaction = null; 
    let currentQueueId = 'queue::demo';
    let executionCode = '1626965556676';

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        interaction = { vcc : 'demo', dictionaryId : 'dictionaryDemo', environmentType : 'allegro', fileName: 'audio-demo-wav.wav', language: 'es' }; 
    });
    afterEach(() => sandbox.restore());

    // Test para verificar el funcionamiento cuando speechmatics retorna error
    it('UploadAudio: Getting Resolve from fake Speechmatics', () => {
        const resolved = new Promise((r) => r({ data: { balance:0, check_wait:30, cost:0, id:99999 } }));
        sandbox.stub(axios, 'default').returns(resolved);
        //stub = sinon.stub(axios, 'default').resolves(resolved);

        return transcriptionsImpl.UploadAudio(interaction, currentQueueId, executionCode)
        .then(result => {
            // Verificamos que tenga el status de éxito de la función
            result.status.should.to.equal(3);
            result.jobId.should.to.be.a('number', 99999);
            result.errorFunction.should.to.be.a('null');
            result.errorMessage.should.to.be.a('null');
            result.errorDetail.should.to.be.a('null');
        })
        .catch(error => {
            console.log('ERROR', error)
        });
    });

    it('UploadAudio: Getting Reject from fake Speechmatics', () => {
        const rejected = new Promise((_, r) => r({ name: 'CustomError', message: 'Error', stack: 'Failed at debug.' }));
        sandbox.stub(axios, 'default').returns(rejected);

        return transcriptionsImpl.UploadAudio(interaction, currentQueueId, executionCode)
        .then(result => {
            //console.log(result);
            // Verificamos que tenga el status de error de la función
            result.status.should.to.equal(-3);
            result.errorFunction.should.to.be.a('string', 'UploadAudio');
            result.errorMessage.should.to.be.a('string', 'UPLOAD_ERROR');
            result.errorDetail.should.to.be.a('string', 'Failed at debug.');
        })
        .catch(error => {
            console.log('ERROR', error)
        });
    });
});

// 
describe('GetDictionaryContent', () => {
    let interaction = { vcc : 'demo', dictionaryId : 'dictionaryDemo' }; 
    let currentQueueId = 'queue::demo';
    let executionCode = '1626965556676';

    it('GetDictionaryContent', () => {
        return transcriptionsImpl.GetDictionaryContent(interaction, currentQueueId, executionCode)
        .then(result => {
            //console.log('RES', result);

            getDictionaryWordsStub.called.should.to.be.true;
            getDictionaryWordSoundLikesStub.called.should.to.be.true;
            // Verificamos que retorne la cantidad de items en el stub de DictionaryWords
            result.should.to.have.lengthOf(stubDictionaryWordsStubValue.length, `Should be ${stubDictionaryWordsStubValue.length} dictionaryWord items, instead were found ${result.length}.`);
        }); // no catch, it'll figure it out since the promise is rejected
    });
});