// These are not proper unit tests, they are just to see some examples and play around.

const { CrawlingAPI, ScraperAPI, LeadsAPI } = require('./index.js');
const { test } = require('./src/config.js');

if (test.normalToken === '' || test.javascriptToken === '') {
  console.error('Please add a test normal token and javascript token in src/config.js to run tests');
  process.exit(1);
}

function processTestResponse(response) {
  if (response.statusCode === 200) {
    if (undefined !== response.json) {
      console.log(response.json);
    } else {
      console.log(response.body);
    }
    console.log('Test passed');
  } else {
    console.error('Test failed, expected statusCode 200 got ' + response.statusCode);
    process.exit(1);
  }
}

function processTestError(error) {
  console.error('Test failed: ' + error);
  process.exit(1);
}

const normalAPI = new CrawlingAPI({ token: test.normalToken });

normalAPI.get('https://httpbin.org/anything?hello=world').then(processTestResponse).catch(processTestError);

normalAPI.post('https://httpbin.org/post', { hello: 'post' }).then(processTestResponse).catch(processTestError);

normalAPI.post('https://httpbin.org/post', { hello: 'json' }, { postType: 'json' }).then(processTestResponse).catch(processTestError);

normalAPI.put('https://httpbin.org/put', { hello: 'put' }).then(processTestResponse).catch(processTestError);

const javascriptAPI = new CrawlingAPI({ token: test.javascriptToken });

javascriptAPI.get('https://httpbin.org/anything?hello=world').then(processTestResponse).catch(processTestError);

const scraperAPI = new ScraperAPI({ token: test.normalToken });

scraperAPI.get('https://www.amazon.com/Halo-SleepSack-Swaddle-Triangle-Neutral/dp/B01LAG1TOS').then(processTestResponse).catch(processTestError);

const leadsAPI = new LeadsAPI({ token: test.normalToken });

leadsAPI.getFromDomain('httpbin.org').then(processTestResponse).catch(processTestError);
