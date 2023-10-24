// // --- START of unnecessary polyfills
// /**
//  * @note The block below contains polyfills for Node.js globals
//  * required for Jest to function when running JSDOM tests.
//  * These HAVE to be require's and HAVE to be in this exact
//  * order, since "undici" depends on the "TextEncoder" global API.
//  *
//  * Consider migrating to a more modern test runner if
//  * you don't want to deal with this.
//  */

// import { TextDecoder, TextEncoder } from 'node:util'

// Object.defineProperties(globalThis, {
//   TextDecoder: { value: TextDecoder },
//   TextEncoder: { value: TextEncoder },
// })

// import { Blob } from 'node:buffer'
// import { fetch, Headers, FormData, Request, Response } from 'undici'

// Object.defineProperties(globalThis, {
//   TextDecoder: { value: TextDecoder },
//   TextEncoder: { value: TextEncoder },
//   Blob: { value: Blob },
//   fetch: { value: fetch, writable: true },
//   Headers: { value: Headers },
//   FormData: { value: FormData },
//   Request: { value: Request },
//   Response: { value: Response },
// })
// // --- END of unnecessary polyfills

// jest.polyfills.ts

// Check if the code is running in a Node.js environment
if (typeof window === 'undefined') {
  // Import and apply the isomorphic-fetch polyfill
  require('isomorphic-fetch');

  const { TextDecoder, TextEncoder } = require('util');
  const { Blob } = require('buffer');
  const { Headers, FormData, Request, Response } = require('undici');

  // Define polyfills on the global object
  Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
    Blob: { value: Blob },
    Headers: { value: Headers },
    FormData: { value: FormData },
    Request: { value: Request },
    Response: { value: Response },
  });
}