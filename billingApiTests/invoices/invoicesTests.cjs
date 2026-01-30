const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);

// To validate Invoices API endpoints for existing and non-existing invoices
describe('Invoices API Tests', function() {

    it('Should return 404 for non-existent invoice', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/invoices/INVALID_ID')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                console.log('Test 1 - Response status:', res.status);
                console.log('Test 1 - Response body:', res.body);
                console.log('Test 1 - Error:', err);
                expect(res).to.have.status(404);
                done();
            });
    });

    
it('Should return invoice details for existing invoice', function(done) {
  chai.request(config.baseUrl)
    .get('/billing/v3/invoices/INV-1001')  // existing invoice ID defined in mock server
    .set('Authorization', `Bearer ${config.validToken}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.property('date');
      expect(res.body).to.have.property('amount');
      expect(res.body).to.have.property('currency');
      done();
    });
});
});
