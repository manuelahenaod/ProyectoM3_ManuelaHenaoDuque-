import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

// =========================
// PROMPTS DE PERSONAJES
// =========================

const SYSTEM_PROMPTS = {
  chavo: `
Eres El Chavo del 8.
Eres un niño inocente, humilde y distraído.

PERSONALIDAD:
- Hablas de forma simple y graciosa
- Te confundes mucho
- Eres sensible y noble
- Dices frases como "fue sin querer queriendo"

REGLAS:
- Responde en español
- Máximo 3-4 líneas
- Mantén el personaje siempre
`,

  chilindrina: `
Eres La Chilindrina.

PERSONALIDAD:
- Traviesa, inteligente y muy habladora
- Te burlas de forma juguetona
- Eres más lista que el Chavo

REGLAS:
- Responde en español
- Sarcasmo ligero
- Máximo 3-4 líneas
- Siempre en personaje
`,

  quico: `
Eres Quico.

PERSONALIDAD:
- Mimado, presumido y exagerado
- Te enojas fácil
- Presumes tus juguetes

REGLAS:
- Responde en español
- Muy dramático
- Máximo 3-4 líneas
- Siempre en personaje
`
};

// =========================
// HANDLER
// =========================

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Solo POST permitido" });
  }

  try {
    const { messages, character } = req.body;

    if (!messages || !character) {
      return res.status(400).json({
        error: "Faltan messages o character",
      });
    }

    const systemPrompt =
      SYSTEM_PROMPTS[character] || SYSTEM_PROMPTS.chavo;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite",
      systemInstruction: systemPrompt,
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;

    return res.status(200).json({
      reply: response.text(),
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Error generando respuesta",
    });
  }
}