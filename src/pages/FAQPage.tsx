import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import Layout from "@/components/Layout";
import PageHead from "@/components/PageHead";
import McButton from "@/components/McButton";
import { BETA, RELEASE, SOCIAL } from "@/data/content";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const FAQ_ANSWERS: Record<string, string> = {
  "What Minecraft worlds are available?":
    "**Nextup Studio offers:**\n- Techno Gamerz World: the famous survival world\n- Waterfall & Villager Map: our own custom world\nAll worlds work on Minecraft Bedrock Edition!",
  "How do I install addons?":
    "**Installing addons is easy!**\n1. Download the .mcaddon or .mcpack file\n2. Tap the file; it auto-opens Minecraft\n3. Wait for \"Import successful\"\n4. Apply the addon to your world",
  "Which shader works best on mobile?":
    "**For mobile devices:**\n- Newb X Legacy: lightweight, minimal FPS drop\n- Solar Shader: good balance of visuals and performance\n**High-end phones:** Prizma Visuals offers cinematic lighting.",
  "Are the downloads safe?":
    "**We only link to well-known community archives and official project pages.** Still, scan any file you download, keep backups, and buy the game from Google Play or minecraft.net if you can.",
  "What is the latest Minecraft version?": `**Stable release: Minecraft ${RELEASE.version}**\n**Latest beta/preview: ${BETA.version}**\nBoth are on the Downloads and Beta pages.`,
  "How do I contact support?": `**Contact Nextup Studio:**\n- Email: ${SOCIAL.email}\n- YouTube: @nextupstudioyt\n- Instagram: @vanshu_ag_72`,
  "What is Nextup Studio?":
    "**Nextup Studio is a Minecraft content hub** created by Vanshu Agarwal: worlds, addons, shaders and the newest Bedrock builds.",
};

const SUGGESTED = Object.keys(FAQ_ANSWERS).filter((q) => q !== "What is Nextup Studio?");

const offlineAnswer = (question: string): string | null => {
  const q = question.trim().toLowerCase();
  for (const [key, value] of Object.entries(FAQ_ANSWERS)) {
    if (key.toLowerCase() === q) return value;
  }
  if (q.includes("world") || q.includes("map")) return FAQ_ANSWERS["What Minecraft worlds are available?"];
  if (q.includes("install") || q.includes("addon")) return FAQ_ANSWERS["How do I install addons?"];
  if (q.includes("shader") || q.includes("mobile")) return FAQ_ANSWERS["Which shader works best on mobile?"];
  if (q.includes("safe") || q.includes("virus")) return FAQ_ANSWERS["Are the downloads safe?"];
  if (q.includes("version") || q.includes("latest") || q.includes("beta")) return FAQ_ANSWERS["What is the latest Minecraft version?"];
  if (q.includes("contact") || q.includes("support")) return FAQ_ANSWERS["How do I contact support?"];
  if (q.includes("nextup") || q.includes("about")) return FAQ_ANSWERS["What is Nextup Studio?"];
  return null;
};

/** Safe renderer for **bold** and newlines (no innerHTML). */
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split("\n").map((line, li) => {
      const parts: ReactNode[] = line.split(/(\*\*[^*]+\*\*)/g).map((part, pi) =>
        part.startsWith("**") && part.endsWith("**") ? <b key={pi}>{part.slice(2, -2)}</b> : <Fragment key={pi}>{part}</Fragment>,
      );
      return (
        <Fragment key={li}>
          {li > 0 && <br />}
          {parts}
        </Fragment>
      );
    })}
  </>
);

const FAQPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the Nextup Studio assistant. Ask me anything about our Minecraft content!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiAvailable, setAiAvailable] = useState(true);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const streamChat = async (history: Message[]): Promise<boolean> => {
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/faq-chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) return false;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      setMessages((p) => [...p, { role: "assistant", content: "" }]);
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const delta = JSON.parse(json).choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((p) => {
                const n = [...p];
                n[n.length - 1] = { role: "assistant", content: acc };
                return n;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
      return acc.length > 0;
    } catch {
      return false;
    }
  };

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const user: Message = { role: "user", content: q };
    const history = [...messages, user].filter((m) => m.content);
    setMessages((p) => [...p, user]);
    setInput("");
    setLoading(true);
    const fallback = offlineAnswer(q);
    let ok = false;
    if (aiAvailable) ok = await streamChat(history);
    if (!ok) {
      setAiAvailable(false);
      setMessages((p) => {
        const base = p[p.length - 1]?.role === "assistant" && p[p.length - 1].content === "" ? p.slice(0, -1) : p;
        return [...base, { role: "assistant", content: fallback ?? "I couldn't reach the server. Try one of the suggested questions below!" }];
      });
    }
    setLoading(false);
  };

  return (
    <Layout title="FAQ Assistant" background="deep">
      <div className="mc-container mc-container--narrow">
        <PageHead icon="lapis" title="Chat" subtitle="Get instant answers about our Minecraft content." />
        {!aiAvailable && <p className="mc-center t-gold" style={{ marginBottom: 12 }}>Offline mode: showing pre-written answers.</p>}

        <section className="mc-chat" aria-label="Chat with the Nextup Studio assistant">
          <div className="mc-chat__log" ref={logRef} role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div key={i} className="mc-chat__line">
                <span className={m.role === "assistant" ? "mc-chat__name mc-chat__name--ai" : "mc-chat__name"}>
                  {"<"}{m.role === "assistant" ? "Nextup AI" : "You"}{">"}
                </span>{" "}
                <Rich text={m.content} />
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="mc-chat__line">
                <span className="mc-chat__name mc-chat__name--ai">{"<Nextup AI>"}</span> <span className="mc-chat__typing">thinking</span>
              </div>
            )}
          </div>
          <form
            className="mc-chat__form"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <label className="mc-sr" htmlFor="chat-input">Your message</label>
            <textarea
              id="chat-input"
              ref={inputRef}
              className="mc-chat__input"
              rows={1}
              value={input}
              disabled={loading}
              placeholder="Ask about worlds, addons, shaders..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
            />
            <McButton type="submit" variant="green" disabled={!input.trim() || loading}>
              Send
            </McButton>
          </form>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 className="mc-h2 mc-h2--light">SUGGESTED QUESTIONS</h2>
          <div className="mc-grid mc-grid--2" style={{ gap: 10 }}>
            {SUGGESTED.map((q) => (
              <McButton
                key={q}
                size="sm"
                disabled={loading}
                onClick={() => {
                  setInput(q);
                  inputRef.current?.focus();
                }}
              >
                {q}
              </McButton>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQPage;
