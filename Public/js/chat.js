const socket = io();

//Query DOM
const messageInput = document.getElementById("messageInput"),
  chatForm = document.getElementById("chatForm"),
  chatBox = document.getElementById("chat-box"),
  feedback = document.getElementById("feedback"),
  nameInput = document.getElementById("nameInput"),
  chatDev = document.getElementById("chatDev");

// Emit Events
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (messageInput.value) {
    socket.emit("message", {
      message: messageInput.value,
      name: nameInput.value ? nameInput.value : "Unknown",
      time: moment(Date.now()).format("hh:mm:ss a"),
    });
    messageInput.value = "";
  }
});

messageInput.addEventListener("keypress", () => {
  socket.emit("typing", nameInput.value);
});

messageInput.addEventListener("keydown", () => {
  socket.emit("notyping");
});

// Listening
socket.on("message", (data) => {
  feedback.innerHTML = "";
  chatBox.innerHTML += `
                        <li class="alert alert-light">
                            <span
                                class="text-dark font-weight-normal"
                                style="font-size: 11pt"
                                >${data.name}</span
                            >
                            <span
                                class="
                                    text-muted
                                    font-italic font-weight-light
                                    m-2
                                "
                                style="font-size: 10pt"
                                >${data.time}</span
                            >
                            <p
                                class="alert alert-info mt-2 font-weight-normal"
                                style="font-size: 12pt"
                            >
                            ${data.message}
                            </p>
                        </li>`;
  chatDev.scrollTop = chatDev.scrollHeight - chatDev.clientHeight;
});

socket.on("typing", (name) => {
  feedback.innerHTML = `<p class="alert alert-info w-75">${name} is typing...</p>`;
  chatDev.scrollTop = chatDev.scrollHeight - chatDev.clientHeight;
});

socket.on("notyping", () => {
  feedback.innerHTML = "";
});
