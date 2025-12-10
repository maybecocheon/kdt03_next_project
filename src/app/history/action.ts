"use server";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_KEY;

export async function generateHistory(region: string): Promise<{ ok: boolean; data?: string; error?: string }> {
  if (!apiKey) {
    return { ok: false, error: "Google Generative AI Key is missing" };
  }

  const prompt = `${region}이라는 도시의 이름 유래와 뜻깊은 역사적 사건에 대해 알려 주는데, 한국어로 500자로 요약해서 알려줘. 결과만 출력해줘.`;
  const maxRetries = 3;
  const retryDelay = 1000; // 1 second

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          return { ok: false, error: "No text generated from API" };
        }
        return { ok: true, data: text }; // Success
      }

      // Check for specific overload error to retry
      if (response.status === 503 && attempt < maxRetries) {
        console.warn(`Attempt ${attempt} failed with 503. Retrying in ${retryDelay / 1000}s...`);
        await new Promise(res => setTimeout(res, retryDelay));
        continue; // Go to next attempt
      }

      // For other errors or if it's the last attempt, return error
      const errorData = await response.json();
      console.error("Gemini API Error Data:", JSON.stringify(errorData, null, 2));
      return { ok: false, error: errorData.error?.message || `API request failed with status ${response.status}` };

    } catch (error: any) {
      console.error(`Attempt ${attempt} failed with error:`, error);
      if (attempt < maxRetries) {
        await new Promise(res => setTimeout(res, retryDelay));
        continue;
      }
      return { ok: false, error: error.message || "An unknown network error occurred" };
    }
  }

  return { ok: false, error: "Failed to generate history after multiple retries." };
}