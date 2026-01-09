import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

export const explainConcept = async (concept: string, lang: 'en' | 'cn'): Promise<string> => {
  if (!ai) {
    return lang === 'en' 
      ? "API Key not configured. Unable to fetch AI explanation." 
      : "API Key 未配置。无法获取 AI 解释。";
  }

  const prompt = lang === 'en' 
    ? `Explain the concept of "${concept}" in the context of Artificial Intelligence. Keep it concise, under 100 words, and easy to understand for a beginner.`
    : `在人工智能的背景下解释概念“${concept}”。保持简洁，100字以内，适合初学者理解。`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || (lang === 'en' ? "No explanation found." : "未找到解释。");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'en' 
      ? "Error connecting to AI service." 
      : "连接 AI 服务出错。";
  }
};