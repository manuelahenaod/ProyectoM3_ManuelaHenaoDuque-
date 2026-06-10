import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Falta GEMINI_API_KEY en variables de entorno");
}

const genAI = new GoogleGenerativeAI(apiKey);

// =========================
// PROMPTS
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
    return res.status(405).json({
      error: "Método no permitido. Solo POST",
    });
  }

  try {
    const { messages, character } = req.body;

    // ─────────────────────────────
    // VALIDACIÓN DE ENTRADA
    // ─────────────────────────────
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "messages debe ser un array no vacío",
      });
    }

    if (!character) {
      return res.status(400).json({
        error: "Falta el personaje (character)",
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

    if (!lastMessage?.content) {
      return res.status(400).json({
        error: "Último mensaje inválido",
      });
    }

    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.8,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text()?.trim();

    if (!text) {
      return res.status(502).json({
        error: "La IA no devolvió una respuesta válida",
      });
    }

    return res.status(200).json({
      reply: text,
    });

  } catch (error) {
    console.error("Gemini error:", error);

    // ─────────────────────────────
    // MANEJO DE ERRORES POR TIPO
    // ─────────────────────────────

    // Rate limit (demasiadas peticiones)
    if (error?.status === 429) {
      return res.status(429).json({
        error: "Demasiadas solicitudes. Espera unos segundos e intenta de nuevo",
      });
    }

    // API key inválida o problemas auth
    if (error?.status === 401 || error?.message?.includes("API_KEY")) {
      return res.status(401).json({
        error: "Error de autenticación con la API",
      });
    }

    // Quota excedida (muy común en Gemini free tier)
    if (error?.message?.toLowerCase().includes("quota")) {
      return res.status(429).json({
        error: "Cuota de IA agotada. Intenta más tarde o revisa tu plan de API",
      });
    }

    // Error genérico
    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
}