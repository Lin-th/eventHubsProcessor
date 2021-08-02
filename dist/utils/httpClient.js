"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.httpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = __importDefault(require("../env"));
var AuthenticationContext = require('adal-node').AuthenticationContext;
async function generateToken() {
    var authorityHostUrl = env_1.default.AUTHORITY_HOST_URL;
    var tenant = env_1.default.AAD_TENANT_ID; // AAD Tenant name.
    var authorityUrl = authorityHostUrl + "/" + tenant;
    var applicationId = env_1.default.AAD_EVC_APP_API_SP_CLIENT_ID; // Application Id of app registered under AAD.
    var clientSecret = env_1.default.AAD_EVC_APP_API_SP_CLIENT_SECRET; // Secret generated for app. Read this environment variable.
    var resource = env_1.default.AZURE_RESOURCE; // URI that identifies the resource for which the token is valid.
    var context = new AuthenticationContext(authorityUrl);
    return new Promise(async (resolve, reject) => {
        context.acquireTokenWithClientCredentials(resource, applicationId, clientSecret, function (err, tokenResponse) {
            if (err) {
                console.log("well that didn't work: " + err.stack);
                return reject("well that didn't work: " + err.stack);
            }
            else {
                // console.log("Access token: ", tokenResponse.accessToken);
                return resolve(tokenResponse.accessToken);
            }
        });
    });
}
exports.generateToken = generateToken;
// axios.defaults.timeout = (1000 * 30); // 2500; // 2.5 seconds
axios_1.default.interceptors.request.use(async (config) => {
    config.headers["Authorization"] = await generateToken();
    return config;
});
const httpClient = axios_1.default;
exports.httpClient = httpClient;
//# sourceMappingURL=httpClient.js.map