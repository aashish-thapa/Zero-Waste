"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, ChefHat, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface RecipeChatProps {
  ingredients: string[];
  onClose: () => void;
}

export default function RecipeChat({ ingredients, onClose }: RecipeChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting with recipe suggestions
    generateRecipes();
  }, []);

  const generateRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `I have these ingredients: ${ingredients.join(", ")}. Please suggest 3 creative recipes I can make with these ingredients. For each recipe, provide a brief description and key steps.`,
          ingredients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate recipes");
      }

      setMessages([
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (err) {
      setMessages([
        {
          role: "assistant",
          content: "Sorry, I couldn't generate recipes right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          ingredients,
          history: messages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0f]/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[80vh] flex flex-col rounded-2xl bg-[#111118] border border-[#1e1e2e] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1e1e2e]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#3b82f6]">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold">Recipe Assistant</h2>
              <p className="text-sm text-[#71717a]">
                {ingredients.length} ingredients detected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#71717a] hover:text-white hover:bg-[#1e1e2e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ingredients Pills */}
        <div className="flex flex-wrap gap-2 p-4 border-b border-[#1e1e2e]">
          {ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-sm capitalize"
            >
              {ingredient}
            </span>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && loading && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-[#8b5cf6] animate-spin mx-auto mb-3" />
                <p className="text-[#a1a1aa]">Generating recipe suggestions...</p>
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white"
                    : "bg-[#1e1e2e] text-[#e5e5e5]"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#8b5cf6]" />
                    <span className="text-sm font-medium text-[#8b5cf6]">AI Chef</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
              </div>
            </div>
          ))}

          {loading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-[#1e1e2e]">
                <Loader2 className="w-5 h-5 text-[#8b5cf6] animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[#1e1e2e]">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about recipes, cooking tips, or substitutions..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#1e1e2e] border border-[#2e2e3e] text-white placeholder-[#71717a] focus:outline-none focus:border-[#8b5cf6] transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
