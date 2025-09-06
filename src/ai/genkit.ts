import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase, enableFirebaseTelemetry} from '@genkit-ai/firebase';

export const ai = genkit({
  plugins: [
    firebase(enableFirebaseTelemetry()), // Will use Application Default Credentials
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
