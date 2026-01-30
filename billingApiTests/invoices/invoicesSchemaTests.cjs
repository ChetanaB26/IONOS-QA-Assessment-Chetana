const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const config = require('../../config/config.cjs');

chai.use(chaiHttp);

const { baseUrl, validToken } = config;

describe('Invoices API – Datacenters & Metadata Schema Validation', function () {

  it('Should return properly structured datacenters and metadata', function (done) {
    chai.request(baseUrl)
      .get('/billing/v3/invoices')
      .set('Authorization', `Bearer ${validToken}`)
      .end((err, res) => {

        // --- Status Code ---
        expect(res).to.have.status(200);

        // --- Root Fields ---
        expect(res.body).to.have.property('startDate').that.is.a('string');
        expect(res.body).to.have.property('endDate').that.is.a('string');

        // --- Datacenters Array ---
        expect(res.body).to.have.property('datacenters').that.is.an('array');
        expect(res.body.datacenters.length).to.be.greaterThan(0);

        const datacenter = res.body.datacenters[0];
        expect(datacenter).to.have.property('id').that.is.a('string');
        expect(datacenter).to.have.property('name').that.is.a('string');
        expect(datacenter).to.have.property('location').that.is.a('string');

        // --- Meters Array ---
        //expect(datacenter).to.have.property('meters').that.is.an('array');
        //expect(datacenter.meters.length).to.be.greaterThan(0);

        //const meter = datacenter.meters[0];
        //expect(meter).to.have.property('meterId').that.is.a('string');
        //expect(meter).to.have.property('meterDesc').that.is.a('string');

        // --- Quantity Object ---
        //expect(meter).to.have.property('quantity');
        //expect(meter.quantity).to.have.property('quantity').that.is.a('number');
        //expect(meter.quantity).to.have.property('unit').that.is.a('string');

        // --- Metadata Object ---
        expect(res.body).to.have.property('metadata');
        expect(res.body.metadata).to.have.property('contractId');
        expect(res.body.metadata).to.have.property('customerId');
        expect(res.body.metadata).to.have.property('reference');

        done();
      });
  });

});
