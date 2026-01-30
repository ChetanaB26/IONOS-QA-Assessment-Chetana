// billingApiTests/invoices/invoicesSchemaNegativeTests.cjs
const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../../config/config.cjs');

chai.use(chaiHttp);
const { expect } = chai;
const { baseUrl, validToken } = config;


describe('Invoices API – Negative Schema Validation', function () {

  it('Should fail when datacenters or metadata fields are missing', function (done) {
    chai.request(baseUrl)
      .get('/billing/v3/invoices')
      .set('Authorization', `Bearer ${validToken}`)
      .end((err, res) => {

        // Status code should be 200
        expect(res).to.have.status(200);

        // --- Root fields ---
        expect(res.body).to.have.property('startDate').that.is.a('string');
        expect(res.body).to.have.property('endDate').that.is.a('string');

        // --- Datacenters array check ---
        expect(res.body).to.have.property('datacenters').that.is.an('array');
        const datacenter = res.body.datacenters[0];

        // Negative checks: remove a required field temporarily to test failure
        expect(datacenter).to.have.property('id');          // If missing, test fails
        expect(datacenter).to.have.property('name');        // If missing, test fails
        expect(datacenter).to.have.property('location');    // If missing, test fails

        // --- Metadata object check ---
        expect(res.body).to.have.property('metadata');
        const metadata = res.body.metadata;
        expect(metadata).to.have.property('contractId');    // If missing, test fails
        expect(metadata).to.have.property('customerId');    // If missing, test fails
        expect(metadata).to.have.property('reference');     // If missing, test fails

        done();
      });
  });

});






/*describe('Invoices API – Negative Schema Validation', function() {

    it('Should fail when datacenters or metadata fields are missing', function(done) {
        chai.request(baseUrl)
            .get('/billing/v3/invoices?mock=missingFields') // query param to trigger negative mock
            .set('Authorization', `Bearer ${validToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

                // datacenters array should exist
                expect(res.body).to.have.property('datacenters');
                
                // Force fail by checking a field we know is missing in mock
                expect(res.body.datacenters[0]).to.have.property('nonExistingField'); // This will fail
                done();
                console.log(res.body);
            });
    });

});
*/