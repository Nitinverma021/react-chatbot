import { GoogleGenerativeAI } from "@google/generative-ai";

const generateResponse = async (message) => {
  try {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(message);
    return result.response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Something went wrong while fetching the response.");
  }
};

export { generateResponse }; 