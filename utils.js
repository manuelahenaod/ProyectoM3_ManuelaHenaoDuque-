export function isValidMessage(text) {
  if (!text) return false
  const trimmed = text.trim()
  return trimmed.length >= 1 && trimmed.length <= 500
}


export function formatTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}


export function parseAIResponse(apiResponse) {
  // Optional chaining (?.) evita crash si apiResponse es null/undefined
  // Nullish coalescing (??) provee el fallback en lugar de || (que pisa "")
  if (!apiResponse || !apiResponse.reply) {
    return 'No pude procesar la respuesta del personaje.'
  }

  const text = apiResponse.reply

  // Verificar que es un string no vacío
  if (typeof text !== 'string' || text.trim().length === 0) {
    return 'No pude procesar la respuesta del personaje.'
  }

  return text.trim()
}

export function truncateHistory(messages, maxMessages = 20) {
  if (!Array.isArray(messages)) return []
  return messages.slice(-maxMessages)
}

export function buildMessagesPayload(history, maxMessages = 20) {
  if (!Array.isArray(history)) return []

  const trimmed = truncateHistory(history, maxMessages)

  // Filtrar y asegurar que todos los mensajes tienen role y content válidos
  return trimmed.filter(
    (msg) =>
      msg &&
      (msg.role === 'user' || msg.role === 'model') &&
      typeof msg.content === 'string' &&
      msg.content.trim().length > 0
  )
}
