"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sentry = void 0;
const Sentry = require("@sentry/node");
exports.Sentry = Sentry;
// or use es6 import statements
// import * as Sentry from '@sentry/node';
const Tracing = require("@sentry/tracing");
// or use es6 import statements
// import * as Tracing from '@sentry/tracing';
Sentry.init({
    dsn: "https://da6bfbdf0e4c4de29c0cd85e8ddd7060@o939044.ingest.sentry.io/5888891",
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});
const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});
//# sourceMappingURL=senTry.js.map