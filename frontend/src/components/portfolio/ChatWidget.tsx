"use client";

import type { PortfolioData } from "@/types/portfolio";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageSquare, SendHorizontal, User, X } from "lucide-react";
import { useMemo, useState } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

export function ChatWidget({ data }: { data: PortfolioData }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi! I'm ${data.profile.name}'s portfolio assistant. Ask me about projects, skills, certifications, or my technical journey.`,
    },
  ]);

  const projectTitles = useMemo(() => data.projects.map((project) => project.title).join(", "), [data.projects]);
  const technologies = useMemo(() => {
    const set = new Set<string>();
    data.projects.forEach((project) => project.tech.forEach((tech) => set.add(tech)));
    return Array.from(set).join(", ");
  }, [data.projects]);

  function generateReply(query: string) {
    const q = query.toLowerCase();

    if (q.includes("project")) {
      return `Highlighted projects include: ${projectTitles}. You can open each card for detailed outcomes and architecture highlights.`;
    }

    if (q.includes("technology") || q.includes("tech") || q.includes("stack")) {
      return `Core technologies used: ${technologies}. I usually combine product-focused frontend architecture with scalable backend and data systems.`;
    }

    if (q.includes("certification") || q.includes("certificate")) {
      const top = data.certifications[0];
      return `Recent certification: ${top.title} by ${top.issuer} (${top.date}). Check the certifications section for all credentials.`;
    }

    if (q.includes("experience") || q.includes("work") || q.includes("journey") || q.includes("timeline")) {
      const latest = data.journey.find((j) => j.period === "2026") || data.journey[data.journey.length - 2];
      return `My current mission is: "${latest.title}" (${latest.period}). Focus: ${latest.content.join(", ")}`;
    }

    if (q.includes("contact") || q.includes("email")) {
      return `You can reach out at ${data.profile.email} or use the contact form in the final section.`;
    }

    return "I can help with project summaries, tech stack details, certifications, my technical journey, and contact info. Try: 'Tell me about your projects'.";
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: Message = { role: "user", text: trimmed };
    const botMessage: Message = { role: "assistant", text: generateReply(trimmed) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  }

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-8 sm:bottom-8">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="mb-3 h-[28rem] w-[min(90vw,24rem)] overflow-hidden rounded-2xl border border-white/20 bg-white/90 shadow-2xl backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-100">Portfolio Assistant</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="rounded-md p-1 text-slate-500 transition hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-[20.3rem] flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex items-start gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" ? <Bot className="mt-1 h-4 w-4 text-cyan-500" /> : null}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      message.role === "assistant"
                        ? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        : "bg-cyan-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.role === "user" ? <User className="mt-1 h-4 w-4 text-cyan-500" /> : null}
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 p-3 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleSend();
                  }}
                  placeholder="Ask about projects or skills..."
                  className="flex-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-cyan-400 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500 text-white transition hover:bg-cyan-400"
                  aria-label="Send message"
                >
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-3 text-sm font-medium text-white shadow-xl transition hover:scale-[1.02]"
      >
        <MessageSquare className="h-4 w-4" />
        {open ? "Hide Assistant" : "Ask AI Assistant"}
      </button>
    </div>
  );
}
