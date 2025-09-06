
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Initialize Genkit and configure the Google AI plugin.
// The plugin reads the API key from the GOOGLE_GENAI_API_KEY
// environment variable.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
});
