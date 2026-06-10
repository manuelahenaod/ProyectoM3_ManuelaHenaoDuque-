import { formatTimestamp, 
  buildMessagesPayload, 
  parseAIResponse, 
  isValidMessage
 } from "./utils.js";

let isTyping = false;

const savedMessages = localStorage.getItem("chat-history");

const messages = savedMessages ? JSON.parse(savedMessages) : {};

// =====================
// SETUP CHAT
// =====================

export function setupChat(selectedCharacter) {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const clearButton = document.getElementById("clear-chat");

  if (!messages[selectedCharacter]) {
    messages[selectedCharacter] = [];
  }

  clearButton?.addEventListener("click", () => {
    clearChatHistory(selectedCharacter);
    renderMessages(selectedCharacter);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    if (!isValidMessage(text)) {
      return;
    }

    addMessage(selectedCharacter, "user", text);

    isTyping = true;
    renderMessages(selectedCharacter);

    try {
      const history = messages[selectedCharacter] || [];

      const formattedHistory = history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        content: msg.text,
      }));

      const payload = buildMessagesPayload(formattedHistory);

      payload.push({
        role: "user",
        content: text,
      });

      const res = await fetch("/api/functions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          character: selectedCharacter,
          messages: payload,
        }),
      });

      const data = await res.json();
      const reply = parseAIResponse(data);
      addMessage(selectedCharacter, "bot", reply);
    } finally {
      isTyping = false;
      renderMessages(selectedCharacter);
    }
  });

  renderMessages(selectedCharacter);
}

// =====================
// RENDER MENSAJES
// =====================

function renderMessages(selectedCharacter) {
  const container = document.getElementById("messages");
  if (!container) return;

  const chat = messages[selectedCharacter] || [];

  let html = chat
    .map(
      (msg) => `
    <div class="message message--${msg.sender}">
      <p>${msg.text}</p>
      <small>${msg.timestamp}</small>
    </div>
  `
    )
    .join("");

  if (isTyping) {
    html += `
      <div class="message message--bot typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
  }

  container.innerHTML = html;
  container.scrollTop = container.scrollHeight;
}

// =====================
// AGREGAR MENSAJE
// =====================

function addMessage(character, sender, text) {
  if (!messages[character]) {
    messages[character] = [];
  }

  messages[character].push({
    sender,
    text,
    timestamp: formatTimestamp(),
  });

  localStorage.setItem("chat-history", JSON.stringify(messages));
}

// =====================
// LIMPIAR CHAT
// =====================

export function clearChatHistory(character) {
  messages[character] = [];
  localStorage.setItem("chat-history", JSON.stringify(messages));
}