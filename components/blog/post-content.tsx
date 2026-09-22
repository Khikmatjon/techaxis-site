import React from "react";

// Blog matnini ko'rsatadi. Qo'llab-quvvatlanadigan yozuv (Markdown'ning kichik qismi):
//   ## Sarlavha   ### Kichik sarlavha   - ro'yxat   1. tartibli ro'yxat   > iqtibos   ---
//   **qalin**   *qiyshiq*   `kod`   [matn](https://havola)
// Matn React orqali chiqariladi (xom HTML yo'q), havolalar faqat http(s), mailto yoki "/" bilan boshlanadi.

type Block =
  | { t: "h"; level: 2 | 3 | 4; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "hr" };

function parseBlocks(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: Block[] = [];
  let para: string[] = [];
  let quote: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) blocks.push({ t: "p", text: para.join(" ") });
    para = [];
  };
  const flushQuote = () => {
    if (quote.length) blocks.push({ t: "quote", text: quote.join(" ") });
    quote = [];
  };
  const flushList = () => {
    if (list) blocks.push({ t: list.ordered ? "ol" : "ul", items: list.items });
    list = null;
  };
  const flushAll = () => {
    flushPara();
    flushQuote();
    flushList();
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }

    let m: RegExpExecArray | null;
    if ((m = /^(#{1,4})\s+(.+)$/.exec(line))) {
      flushAll();
      const hashes = m[1].length;
      blocks.push({ t: "h", level: hashes <= 2 ? 2 : (hashes as 3 | 4), text: m[2].trim() });
      continue;
    }
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushAll();
      blocks.push({ t: "hr" });
      continue;
    }
    if ((m = /^\s*>\s?(.*)$/.exec(line))) {
      flushPara();
      flushList();
      quote.push(m[1]);
      continue;
    }
    if ((m = /^\s*[-*]\s+(.+)$/.exec(line))) {
      flushPara();
      flushQuote();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(m[1]);
      continue;
    }
    if ((m = /^\s*\d+[.)]\s+(.+)$/.exec(line))) {
      flushPara();
      flushQuote();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(m[1]);
      continue;
    }
    if (list && /^\s{2,}\S/.test(raw)) {
      // ro'yxat bandining davomi (chekinish bilan yozilgan qator)
      list.items[list.items.length - 1] += " " + line.trim();
      continue;
    }
    flushList();
    flushQuote();
    para.push(line.trim());
  }
  flushAll();
  return blocks;
}

const INLINE_TOKEN = /(\*\*[^*\n]+\*\*|`[^`\n]+`|\*[^*\s][^*\n]*\*|\[[^\]\n]+\]\([^)\s]+\))/g;

function safeHref(url: string): string | null {
  if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  return null;
}

function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  return text
    .split(INLINE_TOKEN)
    .filter((part) => part !== "")
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;
      if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={key} className="font-semibold text-white">
            {renderInline(part.slice(2, -2), key)}
          </strong>
        );
      }
      if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={key} className="bg-slate-800 px-1.5 py-0.5 rounded text-[0.9em] text-cyan-300">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={key} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
      if (link) {
        const href = safeHref(link[2]);
        if (!href) return <span key={key}>{link[1]}</span>;
        const external = /^https?:\/\//i.test(href);
        return (
          <a
            key={key}
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300 break-words"
          >
            {link[1]}
          </a>
        );
      }
      return <React.Fragment key={key}>{part}</React.Fragment>;
    });
}

export function PostContent({ content, className = "" }: { content: string; className?: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className={`text-slate-300 leading-relaxed ${className}`}>
      {blocks.map((block, i) => {
        const key = `b${i}`;
        switch (block.t) {
          case "h":
            if (block.level === 2)
              return (
                <h2 key={key} className="text-2xl font-black text-white mt-10 mb-4">
                  {renderInline(block.text, key)}
                </h2>
              );
            if (block.level === 3)
              return (
                <h3 key={key} className="text-xl font-bold text-white mt-8 mb-3">
                  {renderInline(block.text, key)}
                </h3>
              );
            return (
              <h4 key={key} className="text-lg font-bold text-slate-200 mt-6 mb-2">
                {renderInline(block.text, key)}
              </h4>
            );
          case "p":
            return (
              <p key={key} className="mb-5">
                {renderInline(block.text, key)}
              </p>
            );
          case "ul":
            return (
              <ul key={key} className="list-disc pl-6 space-y-2 mb-5 marker:text-slate-500">
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="list-decimal pl-6 space-y-2 mb-5 marker:text-slate-500">
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{renderInline(item, `${key}-${j}`)}</li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={key} className="border-l-4 border-blue-500/60 pl-4 italic text-slate-400 mb-5">
                {renderInline(block.text, key)}
              </blockquote>
            );
          case "hr":
            return <hr key={key} className="border-slate-800 my-8" />;
        }
      })}
    </div>
  );
}
