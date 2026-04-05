import { GoogleGenAI } from "@google/genai";

export async function generateBrandLogo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: "A professional, high-resolution logo for a biker apparel brand named 'Classic Gears'. The design should feature a stylized vintage motorcycle piston or a minimalist biker helmet with subtle flames. Colors: Bold Adrenaline Red (#ff1a1a) and Deep Black. The typography for 'CLASSIC GEARS' should be a rugged, slightly distressed retro-modern font. The background should be pure white or transparent-style for easy extraction. High contrast, clean vector-like style.",
        },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
