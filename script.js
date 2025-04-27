// You can replace this with your own WebSocket server URL
const socket = new WebSocket("wss://ws.ifelse.io");

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("messageInput");

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

socket.onmessage = (event) => {
  displayMessage(event.data, "incoming");
};

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
};

function sendMessage() {
  const message = messageInput.value.trim();
  if (message !== "") {
    socket.send(message);
    displayMessage(message, "outgoing");
    messageInput.value = "";
  }
}

function displayMessage(message, type) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-message";
  msgDiv.textContent = message;
  if (type === "outgoing") {
    msgDiv.style.backgroundColor = "#c8e6c9";
    msgDiv.style.alignSelf = "flex-end";
  }
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
