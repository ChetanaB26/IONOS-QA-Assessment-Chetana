const request = require('superagent');
const { expect } = require('chai');
const config = require('../../config/config.cjs'); // import config

// EVN API – CSV Schema Validation (Negative)- 'Additional Parameters' field is added in expectedColumns but missing in actual CSV
describe('EVN API – CSV Schema Validation (Negative)', () => {
  it('Should fail when CSV schema is incorrect', async () => {
    const res = await request
      .get(`${config.baseUrl}/evnFindByPeriod`)
      .query({ period: '2020-01', format: 'csv', invalid: 'true' })
      .set('Authorization', `Bearer ${config.validToken}`);

    const csv = res.body.evnCSV;
    const header = csv[0].split(',');

    const expectedColumns = [
      'contractId',
      'VDCUUID',
      'VDCName',
      'ResourceType',
      'ResourceUUID',
      'IntervalMin',
      'IntervalDivisor',
      'From',
      'To',
      'ItemStub',
      'Value',
      'ValueDivisor',
      'Additional Parameters'
    ];

    // This assertion MUST fail
    expect(header).to.deep.equal(expectedColumns);
  });
});
