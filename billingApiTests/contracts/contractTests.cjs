// billingApiTests/invoices/invoicesTests.cjs
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../../config/config.cjs');

const { expect } = chai;
chai.use(chaiHttp);

describe('Invoices API Tests – Contracts / Datacenters', function() {

    it('Should return datacenters array for valid token (200)', function(done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/contracts')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);

                // Root fields
                expect(res.body).to.have.property('datacenters').that.is.an('array');
                expect(res.body.datacenters.length).to.be.greaterThan(0);

                // Check first datacenter for required fields
                const datacenter = res.body.datacenters[0];
                expect(datacenter).to.have.property('id').that.is.a('string');
                expect(datacenter).to.have.property('name').that.is.a('string');
                expect(datacenter).to.have.property('location').that.is.a('string');

                // Metadata
                expect(res.body).to.have.property('metadata').that.is.an('object');
                const metadata = res.body.metadata;
                expect(metadata).to.have.property('contractId');
                expect(metadata).to.have.property('customerId');
                expect(metadata).to.have.property('reference');

                done();
            });
    });


  /*
  it('Should return datacenters array for valid token (200)', function (done) {
    chai.request(config.baseUrl)
      .get('/billing/v3/invoices/EXISTING_ID') // must exist in mock server
      .set('Authorization', `Bearer ${config.validToken}`)
      .end((err, res) => {
        if (err) return done(err);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('datacenters');
        expect(res.body.datacenters).to.be.an('array');
        done();
      });
  }); */

  it('Should return 401 for invalid token', function (done) {
    chai.request(config.baseUrl)
      .get('/billing/v3/invoices/EXISTING_ID')
      .set('Authorization', `Bearer ${config.invalidToken}`)
      .end((err, res) => {
        if (err && !res) return done(err);

        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Unauthorized');
        done();
      });
  });

});
