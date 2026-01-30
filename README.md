# ionos-billing-api-tests
IONOS Public Billing API
IONOS Billing API Automation – Test Execution Guide(ReadMe)
1. Prerequisites
Before running the tests, make sure the following are installed on your system:
1.	Node.js (v18+ recommended)
Check installation:
2.	node -v
3.	npm -v
4.	Git
Check installation:
5.	git --version
6.	Access to IONOS API
o	Valid username and password for authentication
o	Access to IONOS endpoints such as /billing/v3/contracts, /billing/v3/invoices, /evnGet, /trafficGet, etc.
2. Clone the Repository
Clone your GitHub repository to your local machine:
git clone <GITHUB_REPO_URL>
cd <REPO_NAME>
3.  Install Dependencies
Install required Node.js packages:
npm install
This will install:
•	chai – Assertion library
•	chai-http – For HTTP requests
•	mocha – Test runner
4. Configure Credentials
Update the config/config.cjs file with real IONOS credentials (I have executed my tests using a mock server):
module.exports = {
    baseUrl: 'https://api.ionos.com',   // IONOS endpoint
    validToken: '<YOUR_VALID_BEARER_TOKEN>',
    invalidToken: '<OPTIONAL: INVALID_TOKEN>',
    expiredToken: '<OPTIONAL: EXPIRED_TOKEN>'
};
5. Running the Tests
Run all automated tests with:
npm test
Or directly using Mocha:
npx mocha billingApiTests/**/*.cjs --reporter spec
Expected behavior:
•	Authentication tests validate valid, invalid, and expired tokens.
•	Invoice, EVN, Traffic, Products, Usage API tests verify response structure, status codes, and error handling.
•	Test failures will be reported in the console with details.
6. Running Specific Test Suites
You can run individual test suites separately:
•	Authentication tests:
•	npx mocha billingApiTests/authentication/authTests.cjs
•	Invoices tests:
•	npx mocha billingApiTests/invoices/invoicesTests.cjs
•	EVN tests:
•	npx mocha billingApiTests/evn/evnTests.cjs
•	Traffic tests:
•	npx mocha billingApiTests/traffic/trafficTests.cjs
•	Usage tests:
•	npx mocha billingApiTests/usage/usageTests.cjs
7. Test Results
•	After execution, Mocha console output will show:
o	Passing tests
o	Failing tests
o	Console logs 
•	Negative test cases are expected to fail on purpose (e.g., 401 Unauthorized, 404 Not Found) and are considered successful if they fail for the right reason.
9. Optional Debugging
If a test fails unexpectedly:
DEBUG=true npx mocha billingApiTests/**/*.cjs --reporter spec
This will print detailed HTTP request and response logs.
10. Generating Mocha Test Reports
To make test results easier to review, you can generate a HTML or JSON report.
Step 1: Install the Mochawesome reporter
npm install --save-dev mochawesome
Step 2: Run tests with Mochawesome
npx mocha billingApiTests/**/*.cjs --reporter mochawesome
•	This generates a HTML report at mochawesome-report/mochawesome.html by default.
•	A JSON report is also available at mochawesome-report/mochawesome.json.
Step 3: View the report
•	Open mochawesome.html in a browser to see a visual report of passed/failed tests.
•	The report shows:
o	Test suite names
o	Test case names
o	Status (pass/fail)
o	Duration
o	Error messages (if any)

11. Notes
1.	The automation scripts are written in JavaScript (Node.js) using Mocha & Chai.
2.	To stop test execution anytime, press Ctrl+C.


