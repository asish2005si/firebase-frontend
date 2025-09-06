import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {googleCloudRunner} from '@genkit-ai/google-cloud';

export const ai = genkit({
  plugins: [
    googleCloudRunner(),
    googleAI(),
  ],
});
