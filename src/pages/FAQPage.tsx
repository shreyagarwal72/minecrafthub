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

// Pre-answered FAQ questions for fallback when AI is unavailable
const FAQ_ANSWERS: Record<string, string> = {
  "What Minecraft worlds are available?": 
    "**Nextup Studio offers several exciting Minecraft worlds:**\n\n• **Techno Gamerz World** - The famous YouTuber's survival world with custom builds\n• **Custom Survival Worlds** - Handcrafted adventure maps with unique challenges\n• **Creative Showcases** - Stunning architectural builds for inspiration\n\nAll worlds are optimized for Minecraft Bedrock Edition and work on mobile, PC, and consoles!",
  
  "How do I install addons?":
    "**Installing addons is easy! Follow these steps:**\n\n1. Download the .mcaddon or .mcpack file from our website\n2. Tap/click the downloaded file - it should auto-open Minecraft\n3. Wait for \"Import successful\" message\n4. Go to Settings → Storage → Resource/Behavior Packs\n5. Apply the addon to your world\n\n**Tip:** Make sure you have the latest Minecraft version installed!",
  
  "Which shader works best on mobile?":
    "**For mobile devices, we recommend:**\n\n• **Newb X Legacy** - Lightweight and optimized for low-end devices, minimal FPS drop\n• **Solar Shader** - Good balance of visuals and performance\n\n**For high-end phones:** Prizma Shader offers cinematic lighting but may reduce FPS.\n\n**Pro tip:** Start with Newb X Legacy if you're unsure - it works great on most devices!",
  
  "Are the downloads safe?":
    "**Yes, all downloads on Nextup Studio are 100% safe!**\n\n✓ All files are tested before upload\n✓ No viruses or malware\n✓ Direct download links (no sketchy redirects)\n✓ Regular updates and maintenance\n✓ Trusted by thousands of players\n\nWe take security seriously and never compromise on quality!",

  "What is the latest Minecraft version?":
    "**Current Version: Minecraft 1.21.132**\n\nThis is the latest release with all features and bug fixes. You can download it directly from our Downloads page!\n\n**Available versions:**\n• Music Version - Full experience with all soundtracks\n• No Music Version - Lighter download for limited storage",

  "How do I contact support?":
    "**You can reach Nextup Studio through:**\n\n• **Email:** sanjayvansu1973@gmail.com\n• **YouTube:** @nextupstudioyt\n• **Instagram:** @vanshu_ag_72\n• **GitHub:** shreyagarwal72\n\nWe typically respond within 24 hours!",

  "What is Nextup Studio?":
    "**Nextup Studio is your ultimate Minecraft content hub!**\n\nCreated by Vanshu Agarwal, a passionate video editor, gamer, and musician from India.\n\n**We offer:**\n• Premium Minecraft worlds (including Techno Gamerz World)\n• Quality addons for enhanced gameplay\n• Performance-optimized shaders\n• Safe, direct downloads\n\nAll content is free and regularly updated!"
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
    {
      role: "assistant",
      content: "Hi! I'm your Nextup Studio AI assistant. Ask me anything about our Minecraft worlds, addons, shaders, and downloads!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Check for pre-answered question
  const getPreAnsweredResponse = (question: string): string | null => {
    const normalizedQuestion = question.trim().toLowerCase();
    
    for (const [key, value] of Object.entries(FAQ_ANSWERS)) {
      if (key.toLowerCase() === normalizedQuestion || 
          normalizedQuestion.includes(key.toLowerCase().replace("?", "").trim())) {
        return value;
      }
    }
    
    // Fuzzy matching for common keywords
    if (normalizedQuestion.includes("world") || normalizedQuestion.includes("map")) {
      return FAQ_ANSWERS["What Minecraft worlds are available?"];
    }
    if (normalizedQuestion.includes("install") || normalizedQuestion.includes("addon")) {
      return FAQ_ANSWERS["How do I install addons?"];
    }
    if (normalizedQuestion.includes("shader") || normalizedQuestion.includes("mobile") || normalizedQuestion.includes("phone")) {
      return FAQ_ANSWERS["Which shader works best on mobile?"];
    }
    if (normalizedQuestion.includes("safe") || normalizedQuestion.includes("virus") || normalizedQuestion.includes("secure")) {
      return FAQ_ANSWERS["Are the downloads safe?"];
    }
    if (normalizedQuestion.includes("version") || normalizedQuestion.includes("latest") || normalizedQuestion.includes("update")) {
      return FAQ_ANSWERS["What is the latest Minecraft version?"];
    }
    if (normalizedQuestion.includes("contact") || normalizedQuestion.includes("support") || normalizedQuestion.includes("help")) {
      return FAQ_ANSWERS["How do I contact support?"];
    }
    if (normalizedQuestion.includes("nextup") || normalizedQuestion.includes("studio") || normalizedQuestion.includes("about")) {
      return FAQ_ANSWERS["What is Nextup Studio?"];
    }
    
    return null;
  };

  const streamChat = async (userMessage: Message): Promise<boolean> => {
    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/faq-chat`;
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [...messages.filter(m => m.role !== "assistant" || m.content !== ""), userMessage],
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          toast({
            title: "Rate Limit",
            description: "Too many requests. Please wait a moment.",
            variant: "destructive",
          });
          return false;
        }
        if (response.status === 402) {
          toast({
            title: "Service Unavailable",
            description: "AI service is temporarily unavailable.",
            variant: "destructive",
          });
          return false;
        }
        throw new Error("Failed to get response");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantContent = "";

      // Add empty assistant message
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
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            
            if (content) {
              assistantContent += content;
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = {
                  role: "assistant",
                  content: assistantContent,
                };
                return newMessages;
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
      
      return true;
    } catch (error) {
      console.error("Chat error:", error);
      return false;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    const questionText = input.trim();
    setInput("");
    setIsLoading(true);

    // First try pre-answered questions for instant response
    const preAnswered = getPreAnsweredResponse(questionText);
    
    if (!aiAvailable && preAnswered) {
      // Use pre-answered if AI is known to be unavailable
      setTimeout(() => {
        setMessages(prev => [...prev, { role: "assistant", content: preAnswered }]);
        setIsLoading(false);
      }, 300);
      return;
    }

    // Try AI first
    const success = await streamChat(userMessage);
    
    if (!success) {
      setAiAvailable(false);
      
      if (preAnswered) {
        // Fallback to pre-answered
        setMessages(prev => [...prev, { role: "assistant", content: preAnswered }]);
        toast({
          title: "Using Offline Mode",
          description: "Showing pre-saved answer. AI will be back soon!",
        });
      } else {
        // No pre-answered available
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "I'm having trouble connecting right now. Please try one of the suggested questions below, or check out our website sections for more information!\n\n**Quick Links:**\n• /worlds - Browse Minecraft worlds\n• /addons - Explore addons\n• /shaders - View shaders\n• /downloads - Get Minecraft" 
        }]);
        toast({
          title: "Connection Issue",
          description: "Try one of the suggested questions for instant answers.",
          variant: "destructive",
        });
      }
    } else {
      setAiAvailable(true);
    }
    
    setIsLoading(false);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gaming-bg flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="gaming-title mb-4">
              AI FAQ Assistant
            </h1>
            <p className="text-gaming-text-muted text-lg">
              Get instant answers about our Minecraft content, downloads, and more
            </p>
            {!aiAvailable && (
              <p className="text-amber-400 text-sm mt-2 flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Using offline mode - pre-saved answers available
              </p>
            )}
          </div>

          {/* Chat Container */}
          <div className="card-gaming p-0 overflow-hidden animate-fade-in">
            {/* Messages Area */}
            <ScrollArea className="h-[500px] p-6" ref={scrollRef}>
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    } animate-fade-in`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-gaming-elevated border border-border"
                      }`}
                    >
                      <div 
                        className="text-sm md:text-base whitespace-pre-wrap break-words"
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.+?)\*\*/g, '<strong class="text-primary">$1</strong>')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>

                    {message.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-accent-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3 animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div className="bg-gaming-elevated border border-border rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-gaming-surface">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about worlds, addons, shaders, or downloads..."
                  className="min-h-[60px] max-h-[120px] resize-none bg-gaming-elevated border-border focus:border-primary"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  data-magnetic
                  className="btn-gaming self-end"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="mt-8 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-gaming-text flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Suggested Questions
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  data-magnetic
                  className="justify-start text-left h-auto py-3 px-4 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  onClick={() => handleQuestionClick(question)}
                  disabled={isLoading}
                >
                  <span className="text-sm">{question}</span>
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
