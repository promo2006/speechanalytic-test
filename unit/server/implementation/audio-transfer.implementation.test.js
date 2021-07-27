let common = require("../../../common");
let axios = common.axios;
let chai = common.chai;
let should = common.should;
let faker = common.faker;
let sinon = common.sinon;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let mssql = require( `${serverSrcPath}/db/mssql.service`);
let audioTransferImplementation = require(`${serverSrcPath}/implementation/audio-transfer.implementation`);
let audioTransferImpl = new audioTransferImplementation.AudioTransferImplementation();

// Modelo de diarizado
const diarizationNlu01StubValue = {
    vcc: faker.random.word(),
    name: faker.random.word(),
    cognitiveEngine: 'RASA',
    culture: 'es',
    description: faker.random.word(),
    appId: faker.random.uuid(),
    subscriptionKey: faker.random.uuid(),
    isSystemApp: true,
    needTrain: false,
    lastTrainedDateTime: faker.date.past(),
    lastPublishedDateTime: faker.date.past(),
    createdDate: faker.date.past(),
    createdByUserId: faker.internet.userName(),
    lastModifiedDate: faker.date.past(),
    lastModifiedByUserId: faker.internet.userName(),
    status: 1,
    statusCode: 'AVAILABLE'
};

// 
const getNLUByAppIdStub = sinon.stub(mssql.MSSql, 'GetNLUByAppId');

// 
describe('GetAudioInfo', () => {
    let sandbox = null;
    let interaction = null; 
    let currentQueueId = 'queue::test';
    let executionCode = '1626965556676';

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        interaction = { 
            vcc : 'test', 
            language: 'es' 
        }; 
    });

    afterEach(() => { sandbox.restore() });

    // Test para verificar el funcionamiento cuando analizamos el archivo de audio
    it('GetAudioInfo: Analyze a mp3 mono audio file', () => {
        // Los audio stereo no consultan los modelos de diarizado
        getNLUByAppIdStub.returns(null);
        
        //
        interaction.filePath = `${serverSrcPath}/audio/test/audio-test-stereo-mp3.mp3`;

        return audioTransferImpl.GetAudioInfo(interaction, currentQueueId, executionCode)
        .then(result => {
            //console.log(result);
            // Para audios stereo no se consulta los nlu de diarizado
            getNLUByAppIdStub.called.should.to.be.false;
            
            // Verificamos que tenga el status de éxito de la función
            result.format.should.to.equal('mp3');
            result.channels.should.to.equal('mono');
            result.statusDescription.should.to.equal('pendingUpload');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });

    // Test para verificar el funcionamiento cuando analizamos el archivo de audio
    it('GetAudioInfo: Analyze a wav stereo audio file', () => {
        // Los audio stereo no consultan los modelos de diarizado
        getNLUByAppIdStub.returns(null);
        
        //
        interaction.filePath = `${serverSrcPath}/audio/test/audio-test-stereo-wav.wav`;

        return audioTransferImpl.GetAudioInfo(interaction, currentQueueId, executionCode)
        .then(result => {
            //console.log(result);
            // Para audios stereo no se consulta los nlu de diarizado
            getNLUByAppIdStub.called.should.to.be.false;
            
            // Verificamos que tenga el status de éxito de la función
            result.format.should.to.equal('wav');
            result.channels.should.to.equal('stereo');
            result.statusDescription.should.to.equal('pendingUpload');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });

    // Test para verificar el funcionamiento cuando analizamos el archivo de audio
    it('GetAudioInfo: Analyze a wav mono audio file with trained diarization model', () => {
        // 
        getNLUByAppIdStub.returns(diarizationNlu01StubValue);
        
        //
        interaction.filePath = `${serverSrcPath}/audio/test/audio-test-mono-wav.wav`;

        return audioTransferImpl.GetAudioInfo(interaction, currentQueueId, executionCode)
        .then(result => {
            //console.log(result);
            // Para audios stereo se consulta los nlu de diarizado
            getNLUByAppIdStub.called.should.to.be.true;
            
            // Verificamos que tenga el status de éxito de la función
            result.format.should.to.equal('wav');
            result.channels.should.to.equal('mono');
            result.statusDescription.should.to.equal('pendingUploadRawAudio');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });

    // Test para verificar el funcionamiento cuando analizamos el archivo de audio
    it('GetAudioInfo: Analyze a wav mono audio file without trained diarization model', () => {
        // 
        getNLUByAppIdStub.returns(null);
        
        //
        interaction.filePath = `${serverSrcPath}/audio/test/audio-test-mono-wav.wav`;

        return audioTransferImpl.GetAudioInfo(interaction, currentQueueId, executionCode)
        .then(result => {
            //console.log(result);
            // Para audios stereo se consulta los nlu de diarizado
            getNLUByAppIdStub.called.should.to.be.true;
            
            // Verificamos que tenga el status de éxito de la función
            result.status.should.to.equal(-1);
            result.format.should.to.equal('wav');
            result.channels.should.to.equal('mono');
            result.errorFunction.should.to.equal('GetAudioInfo');
            result.errorMessage.should.to.equal('AUDIO_NEED_DIARIZATION_BUT_PHRASES_WERE_NOT_FOUND');
        });
        // No colocamos catch porque provocaría un falso positivo en el test
    });
});