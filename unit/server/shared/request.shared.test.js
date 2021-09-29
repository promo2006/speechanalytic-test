let common = require("../../../common");
let chai = common.chai;
let should = common.should;
let values = common.values;
let serverSrcPath = common.serverSrcPath;

let requestShared = require(`${serverSrcPath}/shared/request.shared`);



// 
describe('SimplePostRequest', () => {
    let data = {
        uri : 'https://172.16.120.154:9201/api/query',
        body: {
            "version":2,
            "from":0,
            "size":1,
            "query":"\"filter_data:(end_date:[2021-09-01 TO 2021-10-01]) AND (filter_data:(campaign:\\\"a_test\\\") OR filter_data:(campaign:\\\"aerocollege\\\") OR filter_data:(campaign:\\\"aerocollege2\\\") OR filter_data:(campaign:\\\"agenda\\\") OR filter_data:(campaign:\\\"agenda_telefonica\\\") OR filter_data:(campaign:\\\"aleinconcert\\\") OR filter_data:(campaign:\\\"alexinconcert\\\") OR filter_data:(campaign:\\\"anda\\\") OR filter_data:(campaign:\\\"armeniaco6350\\\") OR filter_data:(campaign:\\\"armeniaco6360\\\") OR filter_data:(campaign:\\\"armeniaco6364\\\") OR filter_data:(campaign:\\\"atlasdev\\\") OR filter_data:(campaign:\\\"blastervoz\\\") OR filter_data:(campaign:\\\"botpruebafb\\\") OR filter_data:(campaign:\\\"c2c_aerocollege\\\") OR filter_data:(campaign:\\\"calico3124\\\") OR filter_data:(campaign:\\\"calico3125\\\") OR filter_data:(campaign:\\\"campanaexito\\\") OR filter_data:(campaign:\\\"campanaexitotelefonia\\\") OR filter_data:(campaign:\\\"campanamartin01\\\") OR filter_data:(campaign:\\\"campanamartin02\\\") OR filter_data:(campaign:\\\"campanatelefonia\\\") OR filter_data:(campaign:\\\"campomni\\\") OR filter_data:(campaign:\\\"campsebastian\\\") OR filter_data:(campaign:\\\"cartagenaco4710\\\") OR filter_data:(campaign:\\\"chat_arca\\\") OR filter_data:(campaign:\\\"chat_demo\\\") OR filter_data:(campaign:\\\"chat_fna\\\") OR filter_data:(campaign:\\\"chat_viva\\\") OR filter_data:(campaign:\\\"chatbot_atlas\\\") OR filter_data:(campaign:\\\"chatbot_dian\\\") OR filter_data:(campaign:\\\"chatbot_tsystem\\\") OR filter_data:(campaign:\\\"chatfna\\\") OR filter_data:(campaign:\\\"chattest\\\") OR filter_data:(campaign:\\\"clip_demo\\\") OR filter_data:(campaign:\\\"consultas_vicky\\\") OR filter_data:(campaign:\\\"cursos\\\") OR filter_data:(campaign:\\\"demo\\\") OR filter_data:(campaign:\\\"demo_wap\\\") OR filter_data:(campaign:\\\"demobelcorp\\\") OR filter_data:(campaign:\\\"demobot\\\") OR filter_data:(campaign:\\\"demoeduardo\\\") OR filter_data:(campaign:\\\"demowap\\\") OR filter_data:(campaign:\\\"diamprueba\\\") OR filter_data:(campaign:\\\"digital_partners\\\") OR filter_data:(campaign:\\\"dw-webchat\\\") OR filter_data:(campaign:\\\"embol\\\") OR filter_data:(campaign:\\\"fna_voz\\\") OR filter_data:(campaign:\\\"fondomessenger\\\") OR filter_data:(campaign:\\\"fondowebchat\\\") OR filter_data:(campaign:\\\"funneltest\\\") OR filter_data:(campaign:\\\"gxc\\\") OR filter_data:(campaign:\\\"icetex\\\") OR filter_data:(campaign:\\\"inconcerprueba3\\\") OR filter_data:(campaign:\\\"inconcertpruebasale\\\") OR filter_data:(campaign:\\\"indemoscdsm\\\") OR filter_data:(campaign:\\\"inmarket\\\") OR filter_data:(campaign:\\\"intraining\\\") OR filter_data:(campaign:\\\"izzi-demo\\\") OR filter_data:(campaign:\\\"manizalesco6562\\\") OR filter_data:(campaign:\\\"medellinco1481\\\") OR filter_data:(campaign:\\\"medellinco2168\\\") OR filter_data:(campaign:\\\"medellinco2173\\\") OR filter_data:(campaign:\\\"medellinco4713\\\") OR filter_data:(campaign:\\\"medellinco6563\\\") OR filter_data:(campaign:\\\"medellinco8456\\\") OR filter_data:(campaign:\\\"nikkendemo\\\") OR filter_data:(campaign:\\\"nuevatell\\\") OR filter_data:(campaign:\\\"nuevatelltelf\\\") OR filter_data:(campaign:\\\"onelink\\\") OR filter_data:(campaign:\\\"orekafacebook\\\") OR filter_data:(campaign:\\\"orekaweb\\\") OR filter_data:(campaign:\\\"pereiraco6164\\\") OR filter_data:(campaign:\\\"pereiraco6165\\\") OR filter_data:(campaign:\\\"presentacion\\\") OR filter_data:(campaign:\\\"prueba\\\") OR filter_data:(campaign:\\\"prueba-mica\\\") OR filter_data:(campaign:\\\"prueba1\\\") OR filter_data:(campaign:\\\"pruebademo\\\") OR filter_data:(campaign:\\\"pruebafbs\\\") OR filter_data:(campaign:\\\"pruebamb\\\") OR filter_data:(campaign:\\\"pruebapalomino\\\") OR filter_data:(campaign:\\\"pruebas_certificacion\\\") OR filter_data:(campaign:\\\"pruebasbruno\\\") OR filter_data:(campaign:\\\"pruebasolechat\\\") OR filter_data:(campaign:\\\"pruevasms\\\") OR filter_data:(campaign:\\\"reclamos\\\") OR filter_data:(campaign:\\\"s2g\\\") OR filter_data:(campaign:\\\"skytel\\\") OR filter_data:(campaign:\\\"skyteltest\\\") OR filter_data:(campaign:\\\"smsdemo\\\") OR filter_data:(campaign:\\\"tecsa\\\") OR filter_data:(campaign:\\\"telefonia_nativa\\\") OR filter_data:(campaign:\\\"telefono\\\") OR filter_data:(campaign:\\\"test\\\") OR filter_data:(campaign:\\\"test_atlas_wa\\\") OR filter_data:(campaign:\\\"test_mas\\\") OR filter_data:(campaign:\\\"test_s2g\\\") OR filter_data:(campaign:\\\"test_vero\\\") OR filter_data:(campaign:\\\"testcorreo\\\") OR filter_data:(campaign:\\\"testwebcontact\\\") OR filter_data:(campaign:\\\"tma\\\") OR filter_data:(campaign:\\\"tma_migra\\\") OR filter_data:(campaign:\\\"vic\\\") OR filter_data:(campaign:\\\"videocall\\\") OR filter_data:(campaign:\\\"videochat\\\") OR filter_data:(campaign:\\\"webchat_ejercicio_martin\\\") OR filter_data:(campaign:\\\"webchatdemo\\\") OR filter_data:(campaign:\\\"webchatvains\\\") OR filter_data:(campaign:\\\"whatsappasesor\\\") OR filter_data:(campaign:\\\"womb_emailcarterizados\\\") OR filter_data:(campaign:\\\"womb_emailsegde5a14\\\") OR filter_data:(campaign:\\\"wpp_brian\\\")) AND (filter_data:(channel:\\\"CALL\\\") OR filter_data:(channel:\\\"CHAT\\\") OR filter_data:(channel:\\\"FACEBOOK\\\") OR filter_data:(channel:\\\"INSTAGRAM\\\") OR filter_data:(channel:\\\"MAIL\\\") OR filter_data:(channel:\\\"SMS\\\") OR filter_data:(channel:\\\"TWITTER\\\") OR filter_data:(channel:\\\"WEBCONTACT\\\") OR filter_data:(channel:\\\"WHATSAPP\\\") OR filter_data:(channel:\\\"YOUTUBE\\\"))\""
        },
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MzI3NTQ2NDQsIm5iZiI6MTYzMjc1NDY0NCwianRpIjoiMzk0Nzg1NjgtODQ2OS00NzllLWI1MWEtYzRlNjE2Mzc4MTY4IiwiZXhwIjoxNjMzMzU5NDQ0LCJpZGVudGl0eSI6eyJ1c2VybmFtZSI6InVzZXJfc3BlZWNoIiwicmVhbG0iOiJjb2xsZWdlb2NjIiwibGV2ZWwiOiJzdGFuZGFyZCJ9LCJmcmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJsZXZlbCI6InN0YW5kYXJkIn19.3XfcjzuMIAEhffSdQxrJW9WOoL0R8d40wpg-u30zu-c',
            'Content-Type': 'application/json'
        }
    }

    //
    it('Testing Idatha GetQueryId', () => {
        return requestShared.SimplePostRequest(data)
        .then(result => {
            console.log(result);
            
            // Verificamos que tenga el status de éxito de la función
            //result.status.should.to.equal(3);
            //result.jobId.should.to.equal(99999);
            //should.equal(result.errorFunction, null);
            //should.equal(result.errorMessage, null);
            //should.equal(result.errorDetail, null);
            
            //result.jobId.should.to.be.a('number', 99999);
            //result.errorFunction.should.to.be.a('null');
            //result.errorMessage.should.to.be.a('null');
            //result.errorDetail.should.to.be.a('null');
        });
    });

    // Test para probar el cambio de protocolo cuando el primero falla (el endpoint funciona con http, no con https)
    it.only('Testing https to http request', () => {
        return requestShared.SimplePostRequest(data)
        .then(result => {
            console.log(result);
            result.query_id.should.to.be.a('string');
            result.total_results.should.to.be.a('number');
            result.results.should.to.be.a('array');
        });
    });
});