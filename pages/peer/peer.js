const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

function addMessage(sender, message) {
     const messageDiv = document.createElement('div');
     messageDiv.classList.add('flex');
     const bubbleDiv = document.createElement('div');
     bubbleDiv.classList.add('p-3', 'chat-bubble', 'max-w-[80%]');
     bubbleDiv.textContent = message;

     if (sender === 'user') {
          messageDiv.classList.add('justify-end');
          bubbleDiv.classList.add('user');
     } else {
          messageDiv.classList.add('justify-start');
          bubbleDiv.classList.add('bot');
     }

     messageDiv.appendChild(bubbleDiv);
     messageDiv.classList.add('message-enter-from');
     chatWindow.appendChild(messageDiv);

     requestAnimationFrame(() => {
          messageDiv.classList.remove('message-enter-from');
          messageDiv.classList.add('message-enter-active');
     });
     chatWindow.scrollTop = chatWindow.scrollHeight;
}

function getBotResponse(message) {
     const lowerMessage = message.toLowerCase();
     let clear = 0;
     if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
          return 'Hi there! How can I assist you today?';
     } else if (lowerMessage.includes('how are you')) {
          return 'I am a chatbot, so I am always doing great!';
     } else if (lowerMessage.includes('help')) {
          return 'I can provide information and answer questions. What do you need help with?';
     } else if (lowerMessage.includes('name')) {
          return 'My name is Simple Bot. It\'s a pleasure to meet you!';
     } else if (lowerMessage.includes('thank you')) {
          return 'You\'re welcome! Is there anything else?';
     } else if (lowerMessage.includes('james how are you bro')) {
          return 'You\'re welcome! Is there anything else?';
     } else {
          return 'I am sorry, I do not understand that. Please ask something else.';
     }
}

function sendMessage() {
     const message = userInput.value.trim();
     if (message === '') return;

     addMessage('user', message);
     userInput.value = '';

     setTimeout(() => {
          const botResponse = getBotResponse(message);
          addMessage('bot', botResponse);
     }, 500);
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
     if (e.key === 'Enter') {
          sendMessage();
     }
});
