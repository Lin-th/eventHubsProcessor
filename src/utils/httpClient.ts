import axios from 'axios';
import env from '../env';
var AuthenticationContext = require('adal-node').AuthenticationContext;

async function generateToken() {

  var authorityHostUrl = env.AUTHORITY_HOST_URL;
  var tenant = env.AAD_TENANT_ID; // AAD Tenant name.
  var authorityUrl = authorityHostUrl + "/" + tenant;
  var applicationId = env.AAD_EVC_APP_API_SP_CLIENT_ID; // Application Id of app registered under AAD.
  var clientSecret = env.AAD_EVC_APP_API_SP_CLIENT_SECRET; // Secret generated for app. Read this environment variable.
  var resource = env.AZURE_RESOURCE; // URI that identifies the resource for which the token is valid.

  var context = new AuthenticationContext(authorityUrl);

  return new Promise(async (resolve, reject) => {
    context.acquireTokenWithClientCredentials(
      resource,
      applicationId,
      clientSecret,
      function (err, tokenResponse) {
        if (err) {
          console.log("well that didn't work: " + err.stack);
          return reject("well that didn't work: " + err.stack);
        } else {
          // console.log("Access token: ", tokenResponse.accessToken);
          return resolve(tokenResponse.accessToken);
        }
      }
    );
  });
}

// axios.defaults.timeout = (1000 * 30); // 2500; // 2.5 seconds

axios.interceptors.request.use(async (config) => {
    config.headers["Authorization"] = await generateToken();
    return config;
});



const httpClient = axios;

export { httpClient , generateToken }