import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const StudentChatbot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! Ask me anything from your study materials." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input;
    setMessages(prev => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://erp-sxpm.onrender.com/api/chatbot/chat",
        { question },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setMessages(prev => [
        ...prev,
        { role: "bot", text: response.data.answer, sources: response.data.sources }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Something went wrong, please try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) sendMessage();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold border-l-4 border-blue-500 pl-3 text-gray-800 mb-5">
        Study Assistant (AI)
      </h1>

      <div className="bg-white rounded-xl shadow-md p-5 max-w-3xl mx-auto flex flex-col h-[78vh]">

        {/* chat window */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>

              {/* label */}
              <span className="text-xs text-gray-400 mb-1 px-1">
                {msg.role === "user" ? "You" : "Assistant"}
              </span>

              {/* bubble */}
              <div
                className={`px-4 py-3 rounded-2xl text-sm max-w-[75%] leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white rounded-tr-sm"
                    : "bg-gray-100 text-gray-800 border border-gray-200 rounded-tl-sm"
                }`}
              >
                {msg.role === "bot" ? (
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-li:my-0.5">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>

            </div>
          ))}

          {/* typing indicator */}
          {loading && (
            <div className="flex items-start gap-2">
              <div className="bg-gray-100 border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* input */}
        <div className="flex gap-2 border-t pt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask a question from your study materials..."
            className="flex-1 p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="px-5 py-3 bg-blue-500 text-white text-sm rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentChatbot;
