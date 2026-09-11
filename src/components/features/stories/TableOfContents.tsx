"use client";

import React, { useEffect, useState } from "react";
import { BookOpenIcon } from "@/components/icons";

interface TableOfContentsProps {
  headings: Array<{ id: string; text: string }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.isIntersecting && entry?.target?.id) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    headings.forEach((heading) => {
      if (heading?.id) {
        const el = document.getElementById(heading.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="p-5 rounded-2xl bg-white/80 dark:bg-[#1D0F0A]/90 backdrop-blur-md border border-brand-gold/30 dark:border-brand-gold/40 shadow-tactile space-y-3"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-brand-border/60 dark:border-brand-gold/20">
        <BookOpenIcon className="w-4 h-4 text-brand-gold" />
        <span className="text-xs font-bold uppercase tracking-wider text-brand-chocolate dark:text-brand-cream">
          In This Story
        </span>
      </div>

      <ol className="space-y-2 text-xs">
        {headings.map(({ id, text }, idx) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(id);
                  }
                }}
                className={`block py-1 pl-2.5 rounded-lg border-l-2 transition-all leading-snug ${
                  isActive
                    ? "border-brand-gold bg-brand-gold/15 text-brand-chocolate dark:text-brand-gold-sparkle font-bold"
                    : "border-transparent text-brand-chocolate/75 dark:text-brand-cream/70 hover:text-brand-crimson dark:hover:text-brand-gold hover:border-brand-gold/50"
                }`}
              >
                <span className="text-brand-gold/80 font-mono text-[10px] mr-1.5">
                  {String(idx + 1).padStart(2, "0")}.
                </span>
                {text.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
