import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {firebase, enableFirebaseTelemetry} from '@genkit-ai/firebase';

export const ai = genkit({
  plugins: [
    firebase({
      telemetry: enableFirebaseTelemetry(),
    }),
    googleAI(),
  ],
});
