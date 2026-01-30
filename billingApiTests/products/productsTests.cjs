const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);


describe('Products API Tests', function() {

    it('Should return 403 for restricted product access', function(done) {
  chai.request(config.baseUrl)
    .get('/billing/v3/products/restricted') // match mock server route
    .set('Authorization', `Bearer ${config.validToken}`)
    .end((err, res) => {
      expect(res).to.have.status(403);
      expect(res.body).to.have.property('message', 'Access to this product is restricted');
      done();
      });
    });
});

/*
describe('Products API Tests', function() {

    it('Should return 403 for restricted product access', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/products')
            .set('Authorization', `Bearer ${config.invalidToken}`)
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });

});
*/