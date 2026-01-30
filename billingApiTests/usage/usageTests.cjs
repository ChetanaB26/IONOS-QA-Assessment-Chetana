const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);


describe('Usage API Tests', function() {

    it('Should handle valid usage request', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/usage')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.usage).to.be.an('array');
                done();
            });
    });


    it('Should return 429 Too Many Requests under rate limit', function(done) {
    chai.request(config.baseUrl)
        .get('/billing/v3/usage')
        .set('Authorization', `Bearer ${config.validToken}`)
        .query({ simulate: 'rateLimit' })  // triggers 429 in the mock
        .end((err, res) => {
            expect(res).to.have.status(429);
            expect(res.body).to.have.property('message', 'Too Many Requests');
            done();
        });
});
});
/*
    it('Should return 429 Too Many Requests under rate limit', function(done) {
        // Example: hit endpoint twice quickly
        Promise.all([
            chai.request(config.baseUrl).get('/billing/v3/items').set('Authorization', `Bearer ${config.validToken}`),
            chai.request(config.baseUrl).get('/billing/v3/items').set('Authorization', `Bearer ${config.validToken}`)
        ]).then(responses => {
            responses.forEach(res => {
                expect([200, 429]).to.include(res.status);
            });
            done();
        });
    });

});
*/