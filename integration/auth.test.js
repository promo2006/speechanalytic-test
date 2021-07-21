let common = require("../common");
let chai = common.chai;
let should = common.should;
let values = common.values;

// Test para validar el servicio de login correctamente
it('[200] OK: Login admin user', (done) => {
    var url = '/auth/login';

    chai.request(common.serverUrl)
    .post(url)
    .send({ password : values.user.password, userId : values.user.user })
    .end((err, res) => {
        if (res) {
            res.should.have.status(200);
        } else {
            console.log(err);
            console.log(common.serverUrl);
        }
        
        done();
    });
});

// Test para validar el servicio de login incorrectamente
it('[401] OK: Login admin user using fail password', (done) => {
    var url = '/auth/login'
    
    chai.request(common.serverUrl)
    .post(url)
    .send({ password : 'xxxxx', userId : values.user.user })
    .end((err, res) => {
        if (res) {
            res.should.have.status(401);
        } else {
            console.log(err);
            console.log(common.serverUrl);
        }
        
        done();
    });
});

// Test para validar el servicio de login correctamente
it('[200] OK: Login vcc user (analytic@allegro)', (done) => {
    var url = '/auth/login';

    chai.request(common.serverUrl)
    .post(url)
    .send({ password : values.user.password, userId : values.user.user })
    .end((err, res) => {
        if (res) {
            //console.log(res.body);
            values.user.bearer = `bearer ${res.body.data.session}`;
            res.should.have.status(200);
        } else {
            console.log(err);
            console.log(common.serverUrl);
        }
        
        done();
    });
});

// Test para validar el servicio de login incorrectamente
it('[401] OK: Login vcc user (analytic@allegro) using fail password', (done) => {
    var url = '/auth/login';

    chai.request(common.serverUrl)
    .post(url)
    .send({ password : 'xxxxx', userId : values.user.user })
    .end((err, res) => {
        if (res) {
            res.should.have.status(401);
        } else {
            console.log(err);
            console.log(common.serverUrl);
        }
        
        done();
    });
});