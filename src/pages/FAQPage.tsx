import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FAQ_ANSWERS: Record<string, string> = {
  "What Minecraft worlds are available?": "**Nextup Studio offers several exciting Minecraft worlds:**\n\n• **Techno Gamerz World** - The famous YouTuber's survival world\n• **Custom Survival Worlds** - Handcrafted adventure maps\n• **Creative Showcases** - Stunning architectural builds\n\nAll worlds work on Minecraft Bedrock Edition!",
  "How do I install addons?": "**Installing addons is easy!**\n\n1. Download the .mcaddon or .mcpack file\n2. Tap/click the file — it auto-opens Minecraft\n3. Wait for \"Import successful\"\n4. Apply the addon to your world\n\n**Tip:** Make sure you have the latest version!",
  "Which shader works best on mobile?": "**For mobile devices:**\n\n• **Newb X Legacy** - Lightweight, minimal FPS drop\n• **Solar Shader** - Good balance of visuals and performance\n\n**For high-end phones:** Prizma Shader offers cinematic lighting.",
  "Are the downloads safe?": "**Yes, all downloads are 100% safe!**\n\n✓ All files tested before upload\n✓ No viruses or malware\n✓ Direct download links\n✓ Trusted by thousands of players",
  "What is the latest Minecraft version?": "**Current Version: Minecraft 1.26.3.1**\n\nThis is the latest release. Download it from our Downloads page!\n\n**Available:** Music Version and No Music Version",
  "How do I contact support?": "**Contact Nextup Studio:**\n\n• **Email:** sanjayvansu1973@gmail.com\n• **YouTube:** @nextupstudioyt\n• **Instagram:** @vanshu_ag_72",
  "What is Nextup Studio?": "**Nextup Studio is your ultimate Minecraft content hub!**\n\nCreated by Vanshu Agarwal.\n\n• Premium Minecraft worlds\n• Quality addons\n• Performance-optimized shaders\n• Safe, direct downloads"
};

const SUGGESTED_QUESTIONS = [
  "What Minecraft worlds are available?",
  "How do I install addons?",
  "Which shader works best on mobile?",
  "Are the downloads safe?",
  "What is the latest Minecraft version?",
  "How do I contact support?",
];

const FAQPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your Nextup Studio AI assistant. Ask me anything about our Minecraft content!" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const getPreAnsweredResponse = (question: string): string | null => {
    const q = question.trim().toLowerCase();
    for (const [key, value] of Object.entries(FAQ_ANSWERS)) {
      if (key.toLowerCase() === q || q.includes(key.toLowerCase().replace("?", "").trim())) return value;
    }
    if (q.includes("world") || q.includes("map")) return FAQ_ANSWERS["What Minecraft worlds are available?"];
    if (q.includes("install") || q.includes("addon")) return FAQ_ANSWERS["How do I install addons?"];
    if (q.includes("shader") || q.includes("mobile")) return FAQ_ANSWERS["Which shader works best on mobile?"];
    if (q.includes("safe") || q.includes("virus")) return FAQ_ANSWERS["Are the downloads safe?"];
    if (q.includes("version") || q.includes("latest")) return FAQ_ANSWERS["What is the latest Minecraft version?"];
    if (q.includes("contact") || q.includes("support")) return FAQ_ANSWERS["How do I contact support?"];
    if (q.includes("nextup") || q.includes("about")) return FAQ_ANSWERS["What is Nextup Studio?"];
    return null;
  };

  const streamChat = async (userMessage: Message): Promise<boolean> => {
    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/faq-chat`;
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: [...messages.filter(m => m.role !== "assistant" || m.content !== ""), userMessage] }),
      });
      if (!response.ok || !response.body) return false;
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "" || !line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              setMessages(prev => { const n = [...prev]; n[n.length - 1] = { role: "assistant", content: assistantContent }; return n; });
            }
          } catch { textBuffer = line + "\n" + textBuffer; break; }
        }
      }
      return true;
    } catch { return false; }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const q = input.trim();
    setInput("");
    setIsLoading(true);
    const preAnswered = getPreAnsweredResponse(q);
    if (!aiAvailable && preAnswered) {
      setTimeout(() => { setMessages(prev => [...prev, { role: "assistant", content: preAnswered }]); setIsLoading(false); }, 300);
      return;
    }
    const success = await streamChat(userMessage);
    if (!success) {
      setAiAvailable(false);
      if (preAnswered) { setMessages(prev => [...prev, { role: "assistant", content: preAnswered }]); }
      else { setMessages(prev => [...prev, { role: "assistant", content: "I'm having trouble connecting. Try a suggested question below!" }]); }
    } else { setAiAvailable(true); }
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="gaming-title mb-3">AI FAQ Assistant</h1>
            <p className="text-muted-foreground text-sm">Get instant answers about our Minecraft content</p>
            {!aiAvailable && (
              <p className="text-xs mt-2 flex items-center justify-center gap-1.5" style={{ color: 'hsl(38 92% 60%)' }}>
                <MessageCircle className="w-3.5 h-3.5" /> Using offline mode
              </p>
            )}
          </div>

          <div className="card-gaming p-0 overflow-hidden animate-fade-in">
            <ScrollArea className="h-[450px] p-5" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
                    {message.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary/12 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 ${message.role === "user" ? "bg-primary text-primary-foreground" : "border border-border/50"}`} style={message.role === "assistant" ? { background: 'hsl(220 25% 11% / 0.5)' } : {}}>
                      <div className="text-sm whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>').replace(/\n/g, '<br/>') }} />
                    </div>
                    {message.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-2.5 animate-fade-in">
                    <div className="w-7 h-7 rounded-full bg-primary/12 flex items-center justify-center flex-shrink-0"><Bot className="w-4 h-4 text-primary" /></div>
                    <div className="border border-border/50 rounded-2xl px-3.5 py-2.5" style={{ background: 'hsl(220 25% 11% / 0.5)' }}>
                      <div className="flex items-center gap-1">
                        {[0, 150, 300].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t border-border/30" style={{ background: 'hsl(220 30% 8% / 0.5)' }}>
              <div className="flex gap-2">
                <Textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask about worlds, addons, shaders..." className="min-h-[50px] max-h-[100px] resize-none bg-muted/30 border-border/30 focus:border-primary text-sm" disabled={isLoading} />
                <Button onClick={handleSend} disabled={!input.trim() || isLoading} data-magnetic className="btn-gaming self-end px-3">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">Enter to send, Shift+Enter for new line</p>
            </div>
          </div>

          <div className="mt-6 animate-fade-in">
            <h2 className="text-base font-semibold mb-3 text-foreground flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" /> Suggested Questions
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <Button key={index} variant="outline" data-magnetic className="justify-start text-left h-auto py-2.5 px-3 hover:bg-primary/6 hover:border-primary/30 text-xs" onClick={() => setInput(question)} disabled={isLoading}>
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
