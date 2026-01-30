const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);


// To validate Products API endpoint for restricted access with invalid token

describe('Products API Tests', function() {
    it('Should return 403 for restricted product access', function(done) {
        const contractId = config.contractId; // set your contract ID here

        chai.request(config.baseUrl)
            .get(`/billing/${contractId}/products`)
            .set('Authorization', `Bearer ${config.invalidToken}`)
            .end((err, res) => {
                if (err) {
                    console.log('Error status:', err.status);
                    console.log('Response body:', err.response?.body);
                    expect(err.status).to.equal(403); // assert on error status
                    done();
                } else {
                    expect(res).to.have.status(403);
                    done();
                }
            });
    });
});
