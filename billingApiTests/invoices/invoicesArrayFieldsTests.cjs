
// billingApiTests/invoices/invoicesArrayFieldsTests.cjs
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);

// To validate invoices array fields in the Invoices API
describe('Invoices API – Invoices Array Fields Validation', function () {

    // Positive test
    it('Should return invoices array with correct fields', function (done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/invoices')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);

                expect(res.body).to.have.property('invoices').that.is.an('array');
                const invoice = res.body.invoices[0];

                expect(invoice).to.have.property('id').that.is.a('string');
                expect(invoice).to.have.property('date').that.is.a('string');
                expect(invoice).to.have.property('amount').that.is.a('number');
                expect(invoice).to.have.property('currency').that.is.a('string');

                done();
            });
    });

    // Negative test
    it('Should pass when invoices array schema is incorrect', function (done) {
        chai.request(config.baseUrl)
            .get('/billing/v3/invoices')
            .set('Authorization', `Bearer ${config.validToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);

                const invoice = res.body.invoices[0];

                // List of fields that should NOT exist (negative check)
                const missingFields = ['nonExistingField', 'extraField'];
                missingFields.forEach(field => {
                    expect(invoice).to.not.have.property(field);
                });

                // If all missing-field checks pass, test passes
                done();
            });
    });

});
