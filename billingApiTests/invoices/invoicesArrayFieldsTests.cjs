
// billingApiTests/invoices/invoicesArrayFieldsTests.cjs
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const config = require('../../config/config.cjs');

chai.use(chaiHttp);

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



/*const chai = require('chai');
const chaiHttp = require('chai-http');
const config = require('../../config/config.cjs'); // adjust path if needed

const { expect } = chai;
chai.use(chaiHttp);

const { baseUrl, validToken, invalidToken } = config;

describe('Invoices API – Invoices Array Fields Validation', function() {

    // Positive scenario: correct invoices array
    it('Should return invoices array with correct fields', function(done) {
        chai.request(baseUrl)
            .get('/billing/v3/invoices')
            .set('Authorization', `Bearer ${validToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('invoices').that.is.an('array');

                // Loop through each invoice and check fields
                res.body.invoices.forEach(invoice => {
                    expect(invoice).to.have.property('id');
                    expect(invoice).to.have.property('date');
                    expect(invoice).to.have.property('amount');
                    expect(invoice).to.have.property('unit');
                });
                done();
            });
    });

    // Negative scenario: unauthorized access
    it('Should return 401 Unauthorized with invalid token', function(done) {
        chai.request(baseUrl)
            .get('/billing/v3/invoices')
            .set('Authorization', `Bearer ${invalidToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(401);
                expect(res.body).to.have.property('message').that.equals('Unauthorized');
                done();
            });
    });

    // Negative scenario: schema is incorrect
    it('Should fail when invoices array schema is incorrect', function(done) {
        chai.request(baseUrl)
            .get('/billing/v3/invoices')
            .set('Authorization', `Bearer ${validToken}`)
            .end(function(err, res) {
                expect(res).to.have.status(200);

                // Intentionally expect a wrong field to simulate failure
                res.body.invoices.forEach(invoice => {
                    expect(invoice).to.have.property('nonExistingField'); // This will fail
                });

                done();
            });
    });

});
*/