"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { Send, X, RotateCcw, MessageSquareText } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
};

const INITIAL_GREETING = "Chào bạn! Tôi là trợ lý AI của chuyên gia Tuan Le. Bạn cần hỗ trợ thông tin gì về các dự án Hệ thống AI, MCP Server, Automation hay Mendix không ạ?";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-0", sender: "ai", text: INITIAL_GREETING }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Tải Knowledge Base ngay lúc mount
    async function loadKnowledge() {
      try {
        const response = await fetch("/chatbot_data.txt");
        let knowledgeBase = "";
        if (response.ok) {
          knowledgeBase = await response.text();
        } else {
          console.error("Không tải được cơ sở dữ liệu cho chatbot!");
        }

        const PROMPT = `Bạn là AI trợ lý cá nhân độc quyền trên website của chuyên gia Tuan Le. 
Nhiệm vụ của bạn là hỗ trợ khách truy cập lịch sự, cung cấp thông tin chính xác về các dịch vụ, khóa học, và dự án của chuyên gia này.

Dưới đây là cơ sở dữ liệu kiến thức (Knowledge Base) của bạn:
${knowledgeBase}

Quy tắc giao tiếp bắt buộc:
1. Luôn chào hỏi thân thiện và kết thúc bằng cách mời họ đặt thêm câu hỏi.
2. Phải định dạng các câu trả lời bằng Markdown đầy đủ (in đậm ý chính, dùng gạch đầu dòng, tạo code block nếu cần).
3. Nếu người dùng hỏi điều gì ngoài phạm vi dữ liệu trên, hãy tế nhị từ chối và hướng dẫn họ gửi email hoặc nhắn tin Zalo trực tiếp cho chuyên gia. 
4. Không bịa đặt thông tin ngoài cơ sở dữ liệu đã cấp.

Quy tắc đặc biệt: Trong quá trình trò chuyện, nếu bạn phát hiện người dùng cung cấp
Tên, Số điện thoại hoặc Email, bạn HÃY VỪA trả lời họ bình thường, VỪA chèn thêm
một đoạn mã JSON vào cuối cùng của câu trả lời theo đúng định dạng sau:

||LEAD_DATA: {"name": "...", "phone": "...", "email": "...", "interest": "...", "intent_level": "..."}||

Hãy tự suy luận ra các giá trị của trường:
- "interest": Khách quan tâm sản phẩm/dịch vụ gì?
- "intent_level": Mức độ sẵn sàng mua hàng/dịch vụ (hot / warm / cold).

Nếu thông tin nào chưa có, hãy để null.
TUYỆT ĐỐI KHÔNG giải thích hay đề cập đến đoạn mã này cho người dùng.

Nếu phát hiện thấy khách có intent_level là "warm" hay "hot", hãy hỏi thêm Tên, Số điện thoại, Email (nếu họ chưa cung cấp).

Ví dụ:
- Khách nhắn: "Tôi là Minh, 0901234567. Tôi muốn mua ngay 5 bộ máy tính cho văn phòng mới, gửi báo giá qua email minh@company.com nhé"
- AI trả lời bình thường + chèn tag: ||LEAD_DATA: {"name": "Minh", "phone": "0901234567", "email": "minh@company.com", "interest": "Máy tính văn phòng (5 bộ)", "intent_level": "hot"}||
`;
        setSystemPrompt(PROMPT);
      } catch (err) {
        console.error("Lỗi khi load System Prompt:", err);
      }
    }
    loadKnowledge();
  }, []);

  // Auto-scroll on new message
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setMessages([]);
    setTimeout(() => {
      setMessages([{ id: `msg-${Date.now()}`, sender: "ai", text: INITIAL_GREETING }]);
      setIsRefreshing(false);
    }, 500);
  };

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    
    // 1. Thêm tin nhắn của User vào giao diện
    const userText = inputVal.trim();
    const userMessage: Message = { id: `msg-${Date.now()}`, sender: "user", text: userText };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputVal("");
    setIsTyping(true);

    try {
      // 2. Chuẩn bị payload dạng GPT
      const apiMessages = [
        { role: "system", content: systemPrompt },
        // Chỉ lấy vài tin nhắn gần nhất để làm ngữ cảnh tránh vượt quá token
        ...newMessages.slice(-10).map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        }))
      ];

      // 3. Gọi API LLM custom
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();
      
      const aiReplyText = data.reply || "Xin lỗi, hiện tại tôi đang gặp chút sự cố kết nối. Vui lòng thử lại nha.";
      
      // 4. Update UI
      const aiMessage: Message = { id: `msg-${Date.now()}`, sender: "ai", text: aiReplyText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat API Error:", error);
      const errorMessage: Message = { id: `err-${Date.now()}`, sender: "ai", text: "*(Lỗi từ máy chủ API)* Mạng đang chập chờn, bạn xem lại kết nối và thử hỏi lại nhé." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 z-50 glass-card rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col overflow-hidden bg-surface-container/90"
            style={{ height: "500px", maxHeight: "80vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/30 bg-surface/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold font-headline select-none">
                    AI
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-on-surface font-headline leading-tight">AI Assistant</h4>
                  <p className="text-xs text-on-surface-variant font-label">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <button
                  onClick={handleRefresh}
                  className="p-2 hover:bg-surface-variant rounded-full transition-colors group"
                >
                  <RotateCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-secondary" : "group-hover:text-on-surface"}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-surface-variant rounded-full transition-colors hover:text-error"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                      msg.sender === "user" 
                        ? "bg-primary text-on-primary rounded-br-sm" 
                        : "bg-surface-variant text-on-surface rounded-bl-sm border border-outline-variant/20"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      msg.text
                    ) : (
                      <div 
                        className="chat-markdown prose prose-invert prose-p:leading-[1.6] prose-ul:ml-4 prose-li:my-1 prose-strong:text-secondary-fixed prose-strong:font-bold prose-code:bg-[#0e141a]/50 prose-code:text-[#dde3ec] prose-code:font-mono prose-code:px-1.5 prode-code:py-0.5 prose-code:rounded-md prose-blockquote:border-l-2 prose-blockquote:border-secondary-container/50 prose-blockquote:text-on-surface-variant text-sm"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(msg.text) as string) }}
                      />
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface-variant text-on-surface px-4 py-3 rounded-2xl rounded-bl-sm border border-outline-variant/20">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-surface border-t border-outline-variant/30">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full border border-outline-variant/20 focus-within:border-secondary/50 transition-colors"
              >
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-on-surface text-sm border-none focus:ring-0 outline-none pb-0.5"
                />
                <button 
                  type="submit"
                  disabled={!inputVal.trim() || isTyping || !systemPrompt}
                  className="p-1.5 bg-secondary-container text-on-secondary-container rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary-fixed transition-colors"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-on-primary-fixed rounded-full shadow-[0_0_20px_rgba(221,252,255,0.15)] flex items-center justify-center transition-all animate-bounce hover:animate-none border border-secondary/20"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquareText className="w-6 h-6" />}
      </motion.button>
    </>
  );
}
