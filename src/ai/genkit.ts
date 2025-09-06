import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {googleCloudRunner, googleCloudTelemetry} from '@genkit-ai/google-cloud';

export const ai = genkit({
  plugins: [
    googleCloudRunner({
      telemetry: googleCloudTelemetry,
    }),
    googleAI(),
  ],
});
