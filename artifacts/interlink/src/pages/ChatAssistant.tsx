import { useTranslation } from "@/lib/i18n";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PeachAvatar } from "@/components/ui/PeachAvatar";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
}

export function ChatAssistant() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: t("ai_greeting", "Hi! I'm Peach, your AI assistant. How can I help you today?"), isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userText = input;
    // Add user message
    const newMessage: Message = { id: Date.now().toString(), text: userText, isBot: false };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "Moo! I'm still learning, but I'm here to help you navigate InterLink!";
      const lowerInput = userText.toLowerCase();
      
      if (lowerInput.includes("connect") || lowerInput.includes("professional") || lowerInput.includes("mentor")) {
        botResponse = "Moo! To connect with professionals, you can select the 'Student' role on the Role Selection page, then navigate to the 'Industry Professionals' section where you can find and connect with mentors in your desired field!";
      } else if (lowerInput.includes("student")) {
        botResponse = "As a student, you can connect with mentors, read insights from industry leaders, and prepare for your career! Mooo!";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        botResponse = "Moo! Hello there! How can I assist you with InterLink today?";
      } else if (lowerInput.includes("language") || lowerInput.includes("translate")) {
        botResponse = "You can change the language using the globe icon at the top right of the page! Moo!";
      } else if (lowerInput.includes("help") || lowerInput.includes("what can you do")) {
        botResponse = "I can help you understand how to use InterLink. Ask me about connecting with professionals, student features, or changing the language! Moo!";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botResponse, isBot: true }
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24 md:py-32 min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-white rounded-full shadow-lg p-1 overflow-hidden">
           <PeachAvatar className="w-full h-full" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-[#342042]">{t("ai_title", "AI Assistant")}</h1>
          <p className="text-muted-foreground font-medium">{t("ai_subtitle", "Chat with Peach")}</p>
        </div>
      </div>

      <div className="flex-1 bg-white/60 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/50 flex flex-col overflow-hidden">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.isBot ? "justify-start" : "justify-end"} items-end gap-3`}
              >
                {msg.isBot && (
                  <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full shadow-md p-0.5 overflow-hidden">
                    <PeachAvatar className="w-full h-full" />
                  </div>
                )}
                
                <div 
                  className={`max-w-[75%] px-5 py-3.5 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                    msg.isBot 
                      ? "bg-white text-slate-800 rounded-bl-none border border-slate-100" 
                      : "bg-[#342042] text-white rounded-br-none"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/80 border-t border-slate-100">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="relative"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("ai_placeholder", "Type your message...")} 
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-[#342042]/5 transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#342042] text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#342042]/20"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
