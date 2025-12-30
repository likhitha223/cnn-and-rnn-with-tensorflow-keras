
import { GoogleGenAI, Type } from "@google/genai";
import { ModelType, LayerConfig } from "../types";

// Always use the named parameter and process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateModelSolution = async (
  type: ModelType,
  layers: LayerConfig[],
  taskDescription: string
) => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    Act as a senior AI Research Engineer. Generate an end-to-end TensorFlow/Keras implementation for a ${type} model.
    
    Layers requested: ${JSON.stringify(layers)}
    Task: ${taskDescription}

    Requirements:
    1. Include data preprocessing using TensorFlow datasets or standard synthetic data.
    2. Define the model using the Keras Functional or Sequential API.
    3. Include model compilation with appropriate optimizer and loss.
    4. Include a training loop with callbacks (EarlyStopping, ModelCheckpoint).
    5. Include an evaluation and inference section.
    
    Provide the response as JSON with two fields: 'code' (string) and 'explanation' (markdown string).
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING },
          explanation: { type: Type.STRING }
        },
        required: ["code", "explanation"]
      }
    }
  });

  // response.text is a property, not a method
  return JSON.parse(response.text || '{}');
};
