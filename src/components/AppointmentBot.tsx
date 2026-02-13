"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
  options?: string[];
};

type FormData = {
  purpose: string;
  name: string;
  phone: string;
  email: string;
  jewelryType: string;
  message: string;
};

const QUESTIONS = [
  { 
    field: "purpose", 
    question: "Greetings. I am your Salf Antqe curator. How may I assist you today?",
    options: ["Schedule Appointment", "Inquire about a piece", "General Inquiry"]
  },
  { field: "name", question: "I would be honored to assist you. May I ask for your full name?" },
  { field: "phone", question: "A pleasure. What is the best phone number to reach you at?" },
  { field: "email", question: "And your preferred email address for the appointment details?" },
  { 
    field: "jewelryType", 
    question: "Which of our collections has captured your interest?",
    options: ["Victorian Rings", "Rare Gemstones", "Bespoke Jewelry", "Antique Necklaces", "Other"]
  },
  { field: "message", question: "Are there any specific details or historical periods you would like to discuss during our consultation?" },
];

export default function AppointmentBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Listen for custom events to open the bot
    const handleOpenBot = (e: any) => {
      setIsOpen(true);
      if (e.detail?.message) {
        // If it's a specific inquiry, skip the purpose question
        setFormData(prev => ({ ...prev, purpose: "Inquire about a piece" }));
        
        // Add user message from event
        const userMsg: Message = { 
          id: Date.now().toString(), 
          text: e.detail.message, 
          sender: "user" 
        };
        
        setMessages((prev) => [...prev, userMsg]);
        
        // Add a specialized bot response
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { 
              id: (Date.now() + 1).toString(), 
              text: "I understand. I am here to assist you with the acquisition of this exquisite piece. May I start by getting your name?", 
              sender: "bot" 
            }
          ]);
          setStep(1); // Move to name question
        }, 800);
      }
    };

    window.addEventListener("open-appointment-bot", handleOpenBot);

    // Automatically open the bot after 3 seconds on the home page
    const timer = setTimeout(() => {
      if (window.location.pathname === "/") {
        setIsOpen(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener("open-appointment-bot", handleOpenBot);
      clearTimeout(timer);
    };
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      text: QUESTIONS[0].question, 
      sender: "bot",
      options: QUESTIONS[0].options 
    },
  ]);
  const [formData, setFormData] = useState<FormData>({
    purpose: "",
    name: "",
    phone: "",
    email: "",
    jewelryType: "",
    message: "",
  });

  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleOptionClick = (option: string) => {
    processInput(option);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    processInput(inputValue);
    setInputValue("");
  };

  const processInput = async (value: string) => {
    const currentField = QUESTIONS[step].field;
    const userMessage: Message = { id: Date.now().toString(), text: value, sender: "user" };
    
    setMessages((prev) => [...prev, userMessage]);
    setFormData((prev) => ({ ...prev, [currentField]: value }));

    if (step < QUESTIONS.length - 1) {
      // Show next question after a small delay
      setTimeout(() => {
        const nextQuestion = QUESTIONS[step + 1];
        const nextBotMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: nextQuestion.question,
          sender: "bot",
          options: nextQuestion.options,
        };
        setMessages((prev) => [...prev, nextBotMessage]);
        setStep(step + 1);
      }, 600);
    } else {
      // Form complete, submit
      setTimeout(() => {
        const finishingMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Perfect. I'm processing your request now...",
          sender: "bot",
        };
        setMessages((prev) => [...prev, finishingMessage]);
        submitAppointment({ ...formData, [currentField]: value });
      }, 600);
    }
  };

  const submitAppointment = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            text: "Thank you! Your virtual appointment has been requested. Our curator will contact you shortly.",
            sender: "bot",
          },
        ]);
        setIsComplete(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: "I apologize, but there was an error. Please try again or contact us directly.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#5d735d] shadow-[0_8px_30px_rgba(93,115,93,0.3)] border border-[#5d735d]/20 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-[#5d735d]/20 animate-ping group-hover:hidden" />
            <div className="relative flex flex-col items-center">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-[7px] font-bold tracking-[0.2em] text-white/80 uppercase mt-0.5">Chat</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="flex h-[500px] w-[calc(100vw-2rem)] sm:w-[380px] flex-col overflow-hidden rounded-2xl border border-muted-gold/20 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-white px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative h-10 w-10 rounded-full border border-muted-gold/20 p-1 bg-gray-50">
                  <img src="/logo.png" alt="Logo" className="h-full w-full object-contain" />
                  <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h3 className="font-serif text-[13px] font-semibold tracking-widest text-gray-900 uppercase">Salf Curator</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-medium text-gray-400 uppercase tracking-widest">Always Available</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-gray-900 transition-colors p-1"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
              {messages.map((msg, idx) => {
                const isLastBotMessage = msg.sender === "bot" && idx === messages.length - 1;
                return (
                  <div key={msg.id} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[13px] leading-relaxed ${
                          msg.sender === "bot"
                            ? "bg-gray-50 text-gray-800 font-serif italic border border-gray-100/50"
                            : "bg-gray-900 text-white font-medium"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                    
                    {/* Render options if this is the last bot message and it has options */}
                    {isLastBotMessage && msg.options && !isSubmitting && !isComplete && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 pl-2"
                      >
                        {msg.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="rounded-full border border-[#5d735d]/30 bg-white px-4 py-2 text-[11px] font-medium text-gray-700 transition-all hover:border-[#5d735d] hover:bg-[#5d735d]/5 active:scale-95"
                          >
                            {option}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
              {isSubmitting && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 px-4 py-3 rounded-2xl border border-gray-100">
                    <div className="flex gap-1">
                      <span className="h-1 w-1 rounded-full bg-muted-gold animate-bounce" />
                      <span className="h-1 w-1 rounded-full bg-muted-gold animate-bounce [animation-delay:0.2s]" />
                      <span className="h-1 w-1 rounded-full bg-muted-gold animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              
              {isComplete && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col gap-3 pt-4"
                >
                  <a 
                    href="https://wa.me/917977556989" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] py-4 text-[14px] font-bold text-white shadow-[0_10px_20px_rgba(37,211,102,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_15px_25px_rgba(37,211,102,0.3)] active:scale-[0.98]"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.197 1.441 4.866 1.442 5.22.002 9.469-4.248 9.471-9.47.001-2.529-.985-4.903-2.777-6.696-1.793-1.793-4.167-2.78-6.697-2.781-5.221 0-9.47 4.248-9.472 9.47-.001 1.902.553 3.758 1.599 5.359l-1.048 3.825 3.931-1.031-.127-.089zm13.313-10.421c-.244-.122-1.441-.712-1.664-.793-.223-.081-.385-.122-.547.122-.162.244-.63.793-.772.955-.142.162-.284.183-.528.061-.244-.122-1.03-.38-1.962-1.211-.725-.647-1.215-1.445-1.357-1.688-.142-.244-.015-.376.107-.497.11-.11.244-.284.365-.427.122-.142.162-.244.244-.406.081-.162.041-.305-.02-.427-.061-.122-.547-1.32-.75-1.81-.197-.477-.397-.412-.547-.419-.142-.007-.305-.008-.467-.008-.162 0-.427.061-.65.305-.223.244-.853.834-.853 2.031 0 1.197.874 2.353.996 2.516.122.163 1.72 2.626 4.167 3.683.582.251 1.036.401 1.391.513.584.186 1.116.16 1.536.097.469-.071 1.441-.589 1.644-1.159.203-.57.203-1.057.142-1.159-.061-.101-.223-.162-.467-.284z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => {
                        setIsComplete(false);
                        setStep(0);
                        setFormData({
                          purpose: "",
                          name: "",
                          phone: "",
                          email: "",
                          jewelryType: "",
                          message: "",
                        });
                        setMessages([{ 
                          id: "1", 
                          text: QUESTIONS[0].question, 
                          sender: "bot",
                          options: QUESTIONS[0].options 
                        }]);
                      }, 1000);
                    }}
                    className="mt-2 text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase hover:text-gray-900 transition-colors"
                  >
                    START NEW CONVERSATION
                  </button>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            {!isComplete && (
              <div className="bg-white px-6 pb-6">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 focus-within:border-muted-gold/50 transition-colors shadow-inner">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your response..."
                    className="flex-1 bg-transparent text-[13px] focus:outline-none font-serif italic text-gray-900 placeholder:text-gray-400"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white transition-all disabled:opacity-20 hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <p className="mt-3 text-center text-[9px] font-medium tracking-[0.2em] text-gray-300 uppercase">
                  Exquisite Service • Salf Antqe
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
