import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Retries up to 3 times on 429 with 20s → 40s → 60s backoff.
// onRetry(attemptNumber, waitSeconds) lets the caller update UI.
export async function generateTripPlan(prompt, onRetry) {
  const DELAYS = [20000, 40000, 60000];

  for (let attempt = 0; attempt <= DELAYS.length; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      const is429 =
        err?.message?.includes("429") ||
        err?.status === 429 ||
        err?.message?.toLowerCase().includes("too many requests");

      if (is429 && attempt < DELAYS.length) {
        const wait = DELAYS[attempt];
        onRetry?.(attempt + 1, wait / 1000);
        await sleep(wait);
      } else {
        throw err;
      }
    }
  }
}
