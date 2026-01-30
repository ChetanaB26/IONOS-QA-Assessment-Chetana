/*
const express = require('express');
const app = express();

app.use(express.json());

// Mock data
const contracts = [{ id: 'C1' }];
const VALID_TOKEN = 'VALID_TOKEN';
const invalidToken = 'INVALID_TOKEN';
const expiredToken = 'EXPIRED_TOKEN';

// Helper middleware to check auth
function checkAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (token === validToken) {
        next();
    } else if (token === expiredToken) {
        return res.status(401).json({ message: 'Token expired' });
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// ---------- Auth endpoint ----------
app.post('/auth/token', (req, res) => {
  const { clientId, clientSecret } = req.body;

  if (clientId === 'valid-client' && clientSecret === 'valid-secret') {
    return res.json({
      access_token: 'mock-access-token',
      token_type: 'Bearer',
      expires_in: 3600
    });
  }


app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'validUser' && password === 'validPass') {
    return res.status(200).json({ token: VALID_TOKEN });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

/*
  return res.status(401).json({
    error: 'Unauthorized',
    message: 'Invalid credentials'
  });

// GET /billing/v3/contracts - Auth required
app.get('/billing/v3/contracts', checkAuth, (req, res) => {
    res.status(200).json({ contracts });
});

// GET /internalPingGet - token expiry test
app.get('/internalPingGet', checkAuth, (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// GET /billing/invoices - Get all invoices
app.get('/billing/invoices', checkAuth, (req, res) => {
  res.json({
    invoices: [
      {
        id: 'inv-123',
        amount: 49.99,
        currency: 'EUR',
        status: 'PAID'
      }
    ]
  });
});

// GET /billing/v3/invoices/:id - Get invoice by ID
app.get('/billing/v3/invoices/:id', checkAuth, (req, res) => {
    const invoiceId = req.params.id;
    
    if (invoiceId === 'INVALID_ID') {
        return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.status(200).json({
        id: invoiceId,
        amount: 49.99,
        currency: 'EUR',
        status: 'PAID',
        datacenters: ['dc-01', 'dc-02', 'dc-03']
    });
});

// GET /:contract/evn - Billing endpoint for dynamic contract
app.get('/:contract/evn', checkAuth, (req, res) => {
    const contractId = req.params.contract;

    res.json({
        contract: contractId,
        invoices: [
            { id: `${contractId}-inv-001`, amount: 49.99, currency: 'EUR', status: 'PAID' },
            { id: `${contractId}-inv-002`, amount: 99.99, currency: 'EUR', status: 'PENDING' }
        ]
    });
});


// Additional endpoints can be added here as your test suite grows

app.get('/billing/v3/invoices', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== 'Bearer VALID_TOKEN') {
    return res.status(401).json({ message: 'Unauthorized' });
  }
// Negative schema scenario invoices
  if (req.query.mock === 'missingFields') {
    return res.status(200).json({
      startDate: "2020-01-01",
      endDate: "2020-01-12",
      datacenters: [
        {
          id: "ad34b997-43c7-4666-889b-57acbeaeeb8b",
          name: "Main VDC",
          // location field is intentionally missing
          meters: [
            {
              meterId: "C01000",
              meterDesc: "1h core AMD",
              quantity: {
                quantity: 742,
                unit: "1hour"
              }
            }
          ]
        }
      ],
      // metadata field is intentionally missing
    });
  }

  // Positive response (normal)
 res.status(200).json({
    startDate: "2020-01-01",
    endDate: "2020-01-12",
    datacenters: [
      {
        id: "ad34b997-43c7-4666-889b-57acbeaeeb8b",
        name: "Main VDC",
        location: "EU",
        meters: [
          {
            meterId: "C01000",
            meterDesc: "1h core AMD",
            quantity: {
              quantity: 742,
              unit: "1hour"
            }
          }
        ]
      }
    ],
    invoices: [
      { id: "INV-1001", amount: 100, currency: "EUR", status: "PAID" },
      { id: "INV-1002", amount: 200, currency: "EUR", status: "PENDING" }
    ],
    metadata: {
      contractId: 31805900,
      customerId: 112505406,
      reference: "31805900"
    }
  });
});
 /* res.status(200).json({
    startDate: "2020-01-01",
    endDate: "2020-01-12",
    datacenters: [
      {
        id: "ad34b997-43c7-4666-889b-57acbeaeeb8b",
        name: "Main VDC",
        location: "EU",
        meters: [
          {
            meterId: "C01000",
            meterDesc: "1h core AMD",
            quantity: {
              quantity: 742,
              unit: "1hour"
            }
          }
        ]
      }
    ],
    metadata: {
      contractId: 31805900,
      customerId: 112505406,
      reference: "31805900"
    },
    invoices: [
    { id: "INV-1001", date: "2026-01-01", amount: 150.5, unit: "EUR" }]
  }); 

app.get('/evnGet', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  // Sample EVN response
  res.status(200).json({
    evnId: 'EVN-123',
    description: 'Sample EVN data',
    from: '2026-01-01',
    to: '2026-01-28',
  });
});

app.get('/evnFindByPeriod', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const period = req.query.period;

  // 2️⃣ Bad Request if period is missing
  if (!period) {
    return res.status(400).json({ message: 'Missing period parameter' });
  }

  // CSV response for schema validation
  if (req.query.format === 'csv') {
    return res.status(200).json({
      evnCSV: [
        "contractId,VDCUUID,VDCName,ResourceType,ResourceUUID,IntervalMin,IntervalDivisor,From,To,ItemStub,Value,ValueDivisor,Additional Parameters",
        "31805900,f2c2edf6-49f7-4687-8100-872b4d02ddcc,Main VDC,SERVER,504b4dff-56e3-49cd-89b1-dbed716c6265,44640,60,2020-01-01T00:00:00.000Z,2020-01-31T23:59:59.999Z,C01000,2,1,AMD_OPTERON"
      ]
    });
  }
// NEGATIVE CSV SCHEMA
  if (req.query.format === 'csv' && req.query.invalid === 'true') {
    return res.status(200).json({
      evnCSV: [
        // Missing ValueDivisor column
        "contractId,VDCUUID,VDCName,ResourceType,ResourceUUID,IntervalMin,IntervalDivisor,From,To,ItemStub,Value",
        "31805900,f2c2edf6-49f7-4687-8100-872b4d02ddcc,Main VDC,SERVER,504b4dff-56e3-49cd-89b1-dbed716c6265,44640,60,2020-01-01T00:00:00.000Z,2020-01-31T23:59:59.999Z,C01000,ABC"
      ]
    });
  }
  res.status(200).json([
    {contractId: 31805900,
      VDCUUID: "f2c2edf6-49f7-4687-8100-872b4d02ddcc",
      VDCName: "Main VDC",
      ResourceType: "SERVER",
      ResourceUUID: "504b4dff-56e3-49cd-89b1-dbed716c6265",
      IntervalMin: 44640,
      IntervalDivisor: 60,
      From: "2020-01-01T00:00:00.000Z",
      To: "2020-01-31T23:59:59.999Z",
      ItemStub: "C01000",
      Value: 2,
      ValueDivisor: 1,
      AdditionalParameters: "AMD_OPTERON"}
   
  ]);
});

// ---------------------
// Profile Endpoint
// ---------------------
app.get('/profileGet', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.status(200).json({
    profileId: 'P-123',
    name: 'John Doe',
    email: 'john.doe@example.com'
  });
});

// ---------------------
// Products Endpoint
// ---------------------
app.get('/productsGet', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  res.status(200).json([
    { productId: 'PRD-001', name: 'Cloud VM', price: 10 },
    { productId: 'PRD-002', name: 'Storage', price: 5 }
  ]);
});

// ---------------------
// Utilization Endpoint
// ---------------------
app.get('/utilizationDailyFindById', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (req.query.id !== 'validId') {
    return res.status(404).json({ message: 'Resource not found' });
  }
  res.status(200).json({ usage: 123 });
});

app.get('/utilizationFindByPeriod', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  if (!req.query.period || req.query.period === 'invalid') {
    return res.status(404).json({ message: 'Period invalid' });
  }
  res.status(200).json([{ usage: 100 }, { usage: 200 }]);
});

// ---------------------
// Traffic Endpoint
// ---------------------
app.get('/trafficGet', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const accept = req.headers.accept;
  if (accept === 'text/csv') {
    return res.status(200).send('date,traffic\n2026-01-28,100');
  }

  res.status(200).json({
    traffic: [{ date: '2026-01-28', value: 100 }],
    evnCSV: ['date,traffic\n2026-01-28,100']
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Mock server running on http://localhost:${PORT}`);
});
*/






//new server.js

const express = require('express');
const app = express();

console.log('Mock server loaded');
app.use(express.json());

app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

/* =======================
   AUTH TOKENS & CONFIG
======================= */
const VALID_TOKEN = 'VALID_TOKEN';
const INVALID_TOKEN = 'INVALID_TOKEN';
const EXPIRED_TOKEN = 'EXPIRED_TOKEN';
const PORT = 3000;

/* =======================
   AUTHENTICATION MIDDLEWARE
======================= */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');

  if (token === EXPIRED_TOKEN) {
    return res.status(401).json({ message: 'Token expired' });
  }

  if (token !== VALID_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}

//const VALID_TOKEN = 'VALID_TOKEN';

/* =======================
   AUTHENTICATION
======================= */
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'validUser' && password === 'validPass') {
    return res.status(200).json({ token: VALID_TOKEN });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

app.get('/internalPingGet', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });
    if (authHeader === `Bearer ${EXPIRED_TOKEN}`) return res.status(401).json({ message: 'Token expired' });
    if (authHeader !== `Bearer ${VALID_TOKEN}`) return res.status(401).json({ message: 'Invalid token' });

    res.status(200).json({ message: 'pong' });
});

/* =======================
   INVOICES API
======================= */
const invoices = [
  { id: 'INV-1001', date: '2020-01-01', amount: 100, currency: 'EUR' },
  { id: 'INV-1002', date: '2020-01-02', amount: 200, currency: 'EUR' }
];

app.get('/billing/v3/invoices', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({
    startDate: '2020-01-01',
    endDate: '2020-01-12',
    invoices,  // array of invoices
    datacenters: [
      {
        id: 'ad34b997-43c7-4666-889b-57acbeaeeb8b',
        name: 'Main VDC',
        location: 'EU'
      }
    ],
    metadata: {
      contractId: 31805900,
      customerId: 112505406,
      reference: '31805900'
    }
  });
});

app.get('/billing/v3/invoices/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const invoice = invoices.find(i => i.id === req.params.id);
  if (!invoice) {
    return res.status(404).json({ message: 'Invoice not found' });
  }

  res.status(200).json(invoice);
});

// Mock Contracts / Datacenters endpoint
app.get('/billing/v3/contracts', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Example response similar to IONOS contracts/datacenters
    res.status(200).json({
        datacenters: [
            {
                id: 'ad34b997-43c7-4666-889b-57acbeaeeb8b',
                name: 'Main VDC',
                location: 'EU'
            },
            {
                id: 'bc56d123-12e4-4567-9988-abc123def456',
                name: 'Secondary VDC',
                location: 'US'
            }
        ],
        metadata: {
            contractId: 31805900,
            customerId: 112505406,
            reference: '31805900'
        }
    });
});

/* =======================
   EVN API
======================= */

app.get('/evnGet', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({
    evnCSV: [
      "contractId,VDCUUID,VDCName,ResourceType,ResourceUUID,IntervalMin,IntervalDivisor,From,To,ItemStub,Value,ValueDivisor,Additional Parameters",
      "31805900,f2c2edf6-49f7-4687-8100-872b4d02ddcc,Main VDC,SERVER,504b4dff-56e3-49cd-89b1-dbed716c6265,44640,60,2020-01-01T00:00:00.000Z,2020-01-31T23:59:59.999Z,C01000,2,1,AMD_OPTERON"
    ]
  });
});

app.get('/evnFindByPeriod', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!req.query.period) {
    return res.status(400).json({ message: 'Missing period parameter' });
  }

  res.status(200).json({
    evnCSV: [
      "contractId,VDCUUID,VDCName,ResourceType,ResourceUUID,IntervalMin,IntervalDivisor,From,To,ItemStub,Value,ValueDivisor,Additional Parameters",
      "31805900,f2c2edf6-49f7-4687-8100-872b4d02ddcc,Main VDC,SERVER,504b4dff-56e3-49cd-89b1-dbed716c6265,44640,60,2020-01-01T00:00:00.000Z,2020-01-31T23:59:59.999Z,C01000,2,1,AMD_OPTERON"
    ]
  });
});

/* =======================
   PRODUCTS API
======================= */

app.get('/products/:id', (req, res) => {
    const restrictedProductIds = ['PROD-RESTRICTED'];
    if (restrictedProductIds.includes(req.params.id)) {
        return res.status(403).json({ message: 'Access forbidden' });
    }
    res.status(200).json({ id: req.params.id, name: 'Regular Product' });
});

//pp.get('/products/restricted', (req, res) => {
  //res.status(403).json({ message: 'Forbidden' });
//});

// Mock restricted product access
app.get('/billing/v3/products/restricted', (req, res) => {
  const authHeader = req.headers.authorization;
  
  // Check auth token
  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Simulate restricted product
  res.status(403).json({ message: 'Access to this product is restricted' });
});


/* =======================
   TRAFFIC API
======================= */
app.get('/billing/v3/traffic', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({
    type: 'vdc',
    trafficObj: {
      ip: [
        {
          vdcUUID: 'f2c2edf6-49f7-4687-8100-872b4d02ddcc',
          vdcName: 'Main VDC',
          ip: '157.97.107.158',
          dates: [
            { Date: '2026-01-01', In: '1.23', Out: '0.45' },
            { Date: '2026-01-02', In: '0.67', Out: '0.89' }
          ]
        }
      ]
    },
    trafficArr: [
      ['In/Out', 'VDC UUID', 'VDC Name', 'IP', '2026-01-01', '2026-01-02'],
      ['In', 'f2c2edf6-49f7-4687-8100-872b4d02ddcc', 'Main VDC', '157.97.107.158', '1.23', '0.67'],
      ['Out', 'f2c2edf6-49f7-4687-8100-872b4d02ddcc', 'Main VDC', '157.97.107.158', '0.45', '0.89']
    ],
    traffic: [
      'In/Out,VDC UUID,VDC Name,IP,2026-01-01,2026-01-02',
      'In,f2c2edf6-49f7-4687-8100-872b4d02ddcc,Main VDC,157.97.107.158,1.23,0.67',
      'Out,f2c2edf6-49f7-4687-8100-872b4d02ddcc,Main VDC,157.97.107.158,0.45,0.89'
    ]
  });
});

/* =======================
   USAGE API
======================= */

// Mock Usage API
app.get('/billing/v3/usage', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${VALID_TOKEN}`) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Simulate rate limit scenario
    if (req.query.simulate === 'rateLimit') {
        return res.status(429).json({ message: 'Too Many Requests' });
    }

    // Normal usage response (simplified)
    res.status(200).json({
        usage: [
            {
                contractId: 31805900,
                vdcUUID: 'f2c2edf6-49f7-4687-8100-872b4d02ddcc',
                resourceType: 'SERVER',
                quantity: 100,
                unit: 'hours'
            }
        ]
    });
});


/*
app.get('/usage', (req, res) => {
    res.status(200).json({
        usage: [
            { resourceId: 'res-123', value: 50 },
            { resourceId: 'res-456', value: 75 }
        ]
    });
});

app.get('/usage', (req, res) => {
  //res.status(200).json({
    //contractId: 31805900,
    //usage: 12345
  //});
//});

app.get('/usage/rate-limit', (req, res) => {
  res.status(429).json({ message: 'Too Many Requests' });
});
let usageRequestCount = 0;


app.get('/usage', (req, res) => {
    usageRequestCount++;
    if (usageRequestCount > 5) {  // simulate limit exceeded
        return res.status(429).json({ message: 'Too Many Requests' });
    }

    res.status(200).json({
        usage: [
            { resourceId: 'res-123', value: 50 },
            { resourceId: 'res-456', value: 75 }
        ]
    });
});
*/
/* =======================
   SERVER START
======================= */
app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
});


