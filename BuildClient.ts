import fetch from "node-fetch";
import {
  ClientBuilder,

  // Import middlewares
  type HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions, // Required for sending HTTP requests
} from "@commercetools/sdk-client-v2";
import { generateRandomNumber } from "./helpers/generateNumber";

export const projectKey = "ygvyvt";
const scopeList = [
  `view_published_products`,
  `create_anonymous_token`,
  `view_categories`,
  `manage_my_profile`,
  `manage_my_payments`,
  `manage_my_business_units`,
  `manage_my_shopping_lists`,
  `manage_my_orders`,
  `manage_customers`,
];
const scopes = scopeList.map((it) => it.concat(":", projectKey));

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: "https://api.europe-west1.gcp.commercetools.com",
  fetch,
};

const anonymousId = String(generateRandomNumber());

const anonymousOptions: AnonymousAuthMiddlewareOptions = {
  host: "https://auth.europe-west1.gcp.commercetools.com",
  projectKey: projectKey,
  credentials: {
    clientId: "DbX0DhQieIwQMMmeY-mWhyCu",
    clientSecret: "A4bf_ce4Vd8EEWuLVxTM-n_4ORo8KATS",
    anonymousId: anonymousId, // a unique id
  },
  scopes,
  fetch,
};

// Export the ClientBuilder
export const ctpAnonymousClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withAnonymousSessionFlow(anonymousOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

// export const ctpClient = new ClientBuilder()
//   .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .withLoggerMiddleware() // Include middleware for logging
//   .build();
