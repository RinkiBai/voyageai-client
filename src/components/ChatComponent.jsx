import { useState } from "react";
import { sendMessageToAI } from "../utils/api";

const ChatComponent = () => {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [listening, setListening] = useState(false);

  // 🗣️ Speech synthesis (AI speaks)
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  // 🎤 Speech recognition (User speaks)
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setListening(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", content: input };
    setChatLog([...chatLog, userMessage]);
    setInput("");
    setLoading(true);
    setTypingText("");

    try {
      const response = await sendMessageToAI(input);
      const botMessage = { sender: "ai", content: response.reply };

      let index = 0;
      const typingInterval = setInterval(() => {
        setTypingText((prev) => prev + response.reply.charAt(index));
        index++;

        if (index >= response.reply.length) {
          clearInterval(typingInterval);
          setChatLog((prev) => [...prev, botMessage]);
          setTypingText("");
          setLoading(false);
          speak(response.reply); // 🔊 AI speaks
        }
      }, 30);
    } catch (error) {
      const errorMessage = "⚠️ Error: " + error.message;
      setChatLog((prev) => [...prev, { sender: "ai", content: errorMessage }]);
      setLoading(false);
      speak(errorMessage);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">🎤 Voice AI Chat</h2>
      <div className="border p-2 rounded mb-4 h-64 overflow-y-auto bg-white shadow">
        {chatLog.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "text-right" : "text-left"}>
            <p className={msg.sender === "user" ? "text-blue-500" : "text-green-600"}>
              <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.content}
            </p>
          </div>
        ))}
        {loading && (
          <div className="text-left text-green-600">
            <strong>AI:</strong> {typingText}
            <span className="animate-pulse">|</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1 rounded"
          placeholder="Type or speak your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          Send
        </button>
        <button
          onClick={startListening}
          className={`px-3 py-2 rounded ${listening ? "bg-red-500" : "bg-green-600"} text-white hover:opacity-90`}
        >
          🎙️
        </button>
      </div>
      <p className="text-sm mt-1 text-gray-500">{listening ? "Listening..." : "Click mic to speak"}</p>
    </div>
  );
};

export default ChatComponent;
