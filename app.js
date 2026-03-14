const character = document.getElementById('character');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const emotions = ['neutral', 'thinking', 'happy', 'sad'];

// Фейковый ИИ
function fakeAIResponse(question) {
  const responses = [
    "Конечно, могу помочь!",
    "Интересный вопрос...",
    "Я подумаю над этим.",
    "Попробуем разобраться вместе!"
  ];
  const randomText = responses[Math.floor(Math.random() * responses.length)];
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return { text: randomText, emotion: randomEmotion };
}

function setCharacterEmotion(emotion) {
  character.src = `sprites/${emotion}.png`;
}

function animateText(text, callback) {
  let i = 0;
  const messageEl = document.createElement('div');
  messageEl.classList.add('message', 'bot');
  chatBox.appendChild(messageEl);

  const interval = setInterval(() => {
    messageEl.innerHTML += text[i];
    i++;
    chatBox.scrollTop = chatBox.scrollHeight;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 50);
}

function sendQuestion() {
  const question = userInput.value.trim();
  if (!question) return;

  // Добавляем сообщение пользователя
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.textContent = question;
  chatBox.appendChild(userMessage);
  chatBox.scrollTop = chatBox.scrollHeight;

  userInput.value = '';

  // ИИ думает
  setCharacterEmotion('thinking');

  setTimeout(() => {
    const ai = fakeAIResponse(question);
    setCharacterEmotion(ai.emotion);
    animateText(ai.text, () => {
      setCharacterEmotion('neutral');
    });
  }, 1000);
}

sendBtn.addEventListener('click', sendQuestion);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendQuestion();
});
