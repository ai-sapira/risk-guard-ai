import { GoogleGenAI, Type } from "@google/genai";
import { AiCampaignPlan } from "../types";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key not found in process.env.API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateCampaignPlan = async (
  riskScore: number,
  sector: string,
  department: string
): Promise<AiCampaignPlan | null> => {
  const ai = getAiClient();
  if (!ai) return null;

  const prompt = `
    You are a world-class cybersecurity expert designing a phishing simulation campaign.
    The target company is in the '${sector}' sector.
    The specific department is '${department}'.
    Their current human risk score is ${riskScore}/100 (where 100 is safest, 0 is highest risk).
    
    Create a strategic campaign plan to test and train these employees.
    If the score is low, suggest easier training-focused simulations.
    If the score is high, suggest sophisticated spear-phishing.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            campaignName: { type: Type.STRING },
            targetAudience: { type: Type.STRING },
            schedule: { type: Type.STRING },
            reasoning: { type: Type.STRING },
            emailTemplates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  subject: { type: Type.STRING },
                  bodyPreview: { type: Type.STRING },
                  difficultyLevel: { type: Type.STRING },
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AiCampaignPlan;
    }
    return null;
  } catch (error) {
    console.error("Error generating campaign plan:", error);
    return null;
  }
};
