import React, { useState } from "react";

const HelpCenterButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hello! How can we assist you today?" },
  ]);
  const [userMessage, setUserMessage] = useState("");

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      setMessages([...messages, { sender: "user", text: userMessage }]);
      setUserMessage("");
      // Simulate a response from customer support
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "support", text: "Thank you for your message! We'll get back to you shortly." },
        ]);
      }, 1000);
    }
  };

  return (
    <>
      {/* Floating Help Button */}
      <button
  onClick={toggleChat}
  className="fixed bottom-4 right-4 bg-yellow-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
  aria-label="Help Center"
>
  <img
    src="https://cdn0.iconfinder.com/data/icons/professions-icons-set-cartoon-style/512/a1153-512.png" // Replace with your image path
    alt="Help Center"
    className="w-16 h-16"
  />
</button>


      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-16 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-gray-700">Customer Care</h3>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-red-500"
              aria-label="Close Chat"
            >
              ✖
            </button>
          </div>
          <div className="h-64 overflow-y-auto border-t border-b mb-2 p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    message.sender === "user" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex items-center">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default HelpCenterButton;
