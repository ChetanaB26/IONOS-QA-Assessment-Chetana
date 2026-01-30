// billingApiTests/authentication/authTests.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);



describe('Authentication Tests', function() {

    it('Should allow access with valid credentials', function(done) {
        chai.request(config.baseUrl)
            .post('/auth/login')   // POST to login
            .send({ username: 'validUser', password: 'validPass' })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token', config.validToken);
                done();
            });
    });

    it('Should return 401 with invalid credentials', function(done) {
        chai.request(config.baseUrl)
            .post('/auth/login')   // POST to login
            .send({ username: 'invalidUser', password: 'invalidPass' })
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message', 'Invalid credentials');
                done();
            });
    });

    it('Should return 401 when token is expired', function(done) {
        chai.request(config.baseUrl)
            .get('/internalPingGet')
            .set('Authorization', `Bearer ${config.expiredToken}`)
            .end((err, res) => {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message', 'Token expired');
                done();
            });
    });

});



/*describe('Authentication Tests', function() {

    it('Should allow access with valid credentials', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/contracts')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('Should return 401 with invalid credentials', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/contracts')
            .set('Authorization', `Bearer ${config.invalidToken}`)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

    it('Should return 401 when token is expired', function(done) {
        chai.request(config.baseUrl)
            .get('/internalPingGet')
            .set('Authorization', `Bearer ${config.expiredToken}`)
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
    });

});
*/