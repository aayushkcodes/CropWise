const chatBtn = document.getElementById("chatbot-button");
const chatContainer = document.getElementById("chatbot-container");
const closeBtn = document.getElementById("close-chat");
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

chatBtn?.addEventListener("click", () => chatContainer.classList.toggle("hidden"));
closeBtn?.addEventListener("click", () => chatContainer.classList.add("hidden"));

function appendMessage(text, sender) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

const API_KEY = "AIzaSyDWJp-Eq0neroNvCpN093nbjRYxCZSxdxs";
const MODEL = "gemini-1.5-flash";

async function sendMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  appendMessage(userText, "user");
  chatInput.value = "";
  appendMessage("Thinking...", "bot");
  const thinkingMsg = chatBox.lastChild;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: userText }] }] }),
      }
    );
    const data = await res.json();

    if (data.candidates && data.candidates.length > 0) {
      thinkingMsg.textContent = data.candidates[0].content.parts[0].text;
    } else {
      thinkingMsg.textContent = "🌾 Sorry, I couldn’t understand.";
    }
  } catch (error) {
    thinkingMsg.textContent = "⚠️ Error: " + error.message;
  }
}

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
