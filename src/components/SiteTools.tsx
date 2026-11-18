"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { AssistantSettings } from "@/lib/types";
import { AccessibilityIcon, ChatIcon, CloseIcon } from "@/components/ui/icons";

type TextSize = "default" | "large" | "larger";

type AssistantAnswer = {
  text: string;
  href?: string;
  linkLabel?: string;
};

const STORAGE_KEY = "daniella-accessibility-preferences";

function applyAccessibilityPreferences(textSize: TextSize, contrast: boolean, underlineLinks: boolean, reduceMotion: boolean) {
  const root = document.documentElement;
  root.dataset.textSize = textSize;
  root.dataset.contrast = contrast ? "high" : "default";
  root.dataset.underlineLinks = underlineLinks ? "true" : "false";
  root.dataset.reduceMotion = reduceMotion ? "true" : "false";
}

function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const [textSize, setTextSize] = useState<TextSize>("default");
  const [contrast, setContrast] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const firstControlRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const preferences = JSON.parse(saved) as {
          textSize?: TextSize;
          contrast?: boolean;
          underlineLinks?: boolean;
          reduceMotion?: boolean;
        };
        setTextSize(preferences.textSize ?? "default");
        setContrast(Boolean(preferences.contrast));
        setUnderlineLinks(Boolean(preferences.underlineLinks));
        setReduceMotion(Boolean(preferences.reduceMotion));
        applyAccessibilityPreferences(
          preferences.textSize ?? "default",
          Boolean(preferences.contrast),
          Boolean(preferences.underlineLinks),
          Boolean(preferences.reduceMotion),
        );
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setPreferencesLoaded(true);
    firstControlRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    applyAccessibilityPreferences(textSize, contrast, underlineLinks, reduceMotion);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ textSize, contrast, underlineLinks, reduceMotion }),
    );
  }, [preferencesLoaded, textSize, contrast, underlineLinks, reduceMotion]);

  const reset = () => {
    setTextSize("default");
    setContrast(false);
    setUnderlineLinks(false);
    setReduceMotion(false);
  };

  return (
    <section
      id="accessibility-panel"
      className="site-tool-panel"
      role="dialog"
      aria-modal="false"
      aria-labelledby="accessibility-panel-title"
      onKeyDown={(event) => event.key === "Escape" && onClose()}
    >
      <div className="site-tool-panel__header">
        <div>
          <h2 id="accessibility-panel-title" className="font-serif text-xl text-ink">
            התאמות תצוגה
          </h2>
          <p className="mt-1 text-sm text-ink/70">הבחירות נשמרות במכשיר הזה.</p>
        </div>
        <button type="button" className="site-tool-icon-button" onClick={onClose} aria-label="סגירת התאמות תצוגה">
          <CloseIcon width={20} height={20} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <p className="mb-2 text-sm font-semibold text-ink">גודל טקסט</p>
          <div className="grid grid-cols-3 gap-2">
            {([
              ["default", "רגיל"],
              ["large", "גדול"],
              ["larger", "גדול מאוד"],
            ] as const).map(([value, label], index) => (
              <button
                ref={index === 0 ? firstControlRef : undefined}
                key={value}
                type="button"
                className="site-tool-option"
                aria-pressed={textSize === value}
                onClick={() => setTextSize(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="site-tool-toggle" aria-pressed={contrast} onClick={() => setContrast((value) => !value)}>
          <span>ניגודיות מוגברת</span>
          <span aria-hidden="true" className="site-tool-switch" />
        </button>
        <button
          type="button"
          className="site-tool-toggle"
          aria-pressed={underlineLinks}
          onClick={() => setUnderlineLinks((value) => !value)}
        >
          <span>הדגשת קישורים</span>
          <span aria-hidden="true" className="site-tool-switch" />
        </button>
        <button
          type="button"
          className="site-tool-toggle"
          aria-pressed={reduceMotion}
          onClick={() => setReduceMotion((value) => !value)}
        >
          <span>הפחתת תנועה</span>
          <span aria-hidden="true" className="site-tool-switch" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
        <button type="button" className="text-sm font-semibold text-smoked-blue underline underline-offset-4" onClick={reset}>
          איפוס התאמות
        </button>
        <Link href="/accessibility-statement" className="text-sm font-semibold text-smoked-blue underline underline-offset-4" onClick={onClose}>
          הצהרת נגישות
        </Link>
      </div>
    </section>
  );
}

function createAssistantAnswer(input: string, fallbackMessage: string): AssistantAnswer {
  const normalized = input.trim().toLowerCase();

  if (/זכאות|מגיע לי|אבחון|רפוא|משפט|עורך דין|קצבה/.test(normalized)) {
    return {
      text: "אני לא יכולה לקבוע זכאות או לתת ייעוץ רפואי או משפטי. אפשר לקרוא מידע כללי במרכז הידע, ובמקרה אישי לפנות ישירות לדניאלה.",
      href: "/contact",
      linkLabel: "ליצירת קשר",
    };
  }
  if (/קורס|ללמוד|דיגיטל/.test(normalized)) {
    return { text: "מידע על הקורסים הדיגיטליים נמצא בעמוד הקורסים.", href: "/courses", linkLabel: "לעמוד הקורסים" };
  }
  if (/מאמר|ידע|מידע|מדריך/.test(normalized)) {
    return { text: "מרכז הידע מרכז מאמרים מקצועיים ומקורות לקריאה נוספת.", href: "/knowledge", linkLabel: "למרכז הידע" };
  }
  if (/זום|פגישה|ייעוץ|שירות|ליווי/.test(normalized)) {
    return {
      text: "באתר מוצגים מסלולי ליווי דיגיטלי, פגישת זום ופגישה פרונטלית. לפרטים שמתאימים למקרה האישי כדאי לפנות לדניאלה.",
      href: "/contact",
      linkLabel: "לפרטי יצירת קשר",
    };
  }
  if (/דניאלה|מי את|אודות|ניסיון/.test(normalized)) {
    return { text: "בעמוד האודות אפשר לקרוא על דניאלה ועל דרך העבודה שלה.", href: "/about", linkLabel: "לעמוד האודות" };
  }
  if (/קשר|טלפון|מייל|וואטסאפ|לתאם/.test(normalized)) {
    return { text: "כל דרכי הפנייה מרוכזות בעמוד יצירת הקשר.", href: "/contact", linkLabel: "ליצירת קשר" };
  }

  return { text: fallbackMessage, href: "/contact", linkLabel: "ליצירת קשר" };
}

function NavigationAssistant({ settings, onClose }: { settings: AssistantSettings; onClose: () => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AssistantAnswer | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submitQuestion = (value: string) => {
    const cleanValue = value.trim();
    if (!cleanValue) return;
    setQuestion(cleanValue);
    setAnswer(createAssistantAnswer(cleanValue, settings.fallbackMessage));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion(question);
  };

  return (
    <section
      id="assistant-panel"
      className="site-tool-panel site-tool-panel--assistant"
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-panel-title"
      onKeyDown={(event) => event.key === "Escape" && onClose()}
    >
      <div className="site-tool-panel__header">
        <div>
          <p className="text-xs font-bold text-smoked-blue">הדגמה מקומית</p>
          <h2 id="assistant-panel-title" className="mt-1 font-serif text-xl text-ink">
            עוזר הניווט
          </h2>
        </div>
        <button type="button" className="site-tool-icon-button" onClick={onClose} aria-label="סגירת עוזר הניווט">
          <CloseIcon width={20} height={20} />
        </button>
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{settings.welcomeMessage}</p>
      <p className="mt-2 rounded-xl bg-[#efe7d9] px-3 py-2.5 text-xs leading-relaxed text-ink">{settings.disclaimer}</p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="שאלות מוצעות">
        {settings.suggestedQuestions.map((suggestion) => (
          <button key={suggestion} type="button" className="site-tool-suggestion" onClick={() => submitQuestion(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>

      <form className="mt-4" onSubmit={handleSubmit}>
        <label htmlFor="assistant-question" className="text-sm font-semibold text-ink">
          מה תרצו למצוא?
        </label>
        <div className="mt-2 flex gap-2">
          <input
            ref={inputRef}
            id="assistant-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            maxLength={180}
            className="min-w-0 flex-1 rounded-xl border border-ink/20 bg-white px-3 py-2.5 text-base text-ink placeholder:text-ink/55"
            placeholder="לדוגמה: איפה המאמרים?"
          />
          <button type="submit" className="rounded-xl bg-smoked-blue px-4 py-2.5 font-semibold text-white hover:bg-ink">
            חיפוש
          </button>
        </div>
      </form>

      <div className="mt-4 min-h-16" aria-live="polite">
        {answer && (
          <div className="rounded-xl border border-sage/70 bg-sage/15 p-3.5 text-sm leading-relaxed text-ink">
            <p>{answer.text}</p>
            {answer.href && answer.linkLabel && (
              <Link href={answer.href} className="mt-2 inline-block font-bold text-smoked-blue underline underline-offset-4" onClick={onClose}>
                {answer.linkLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SiteTools({ assistantSettings }: { assistantSettings: AssistantSettings }) {
  const [activePanel, setActivePanel] = useState<"accessibility" | "assistant" | null>(null);
  const accessibilityButtonRef = useRef<HTMLButtonElement>(null);
  const assistantButtonRef = useRef<HTMLButtonElement>(null);

  const closePanel = () => {
    const panelToRestore = activePanel;
    setActivePanel(null);
    requestAnimationFrame(() => {
      if (panelToRestore === "assistant") assistantButtonRef.current?.focus();
      if (panelToRestore === "accessibility") accessibilityButtonRef.current?.focus();
    });
  };

  const togglePanel = (panel: "accessibility" | "assistant") => {
    if (activePanel === panel) {
      closePanel();
      return;
    }
    setActivePanel(panel);
  };

  return (
    <aside className="site-tools" data-open={activePanel ?? "none"} aria-label="כלי עזר באתר">
      {activePanel === "accessibility" && <AccessibilityPanel onClose={closePanel} />}
      {activePanel === "assistant" && assistantSettings.enabled && (
        <NavigationAssistant settings={assistantSettings} onClose={closePanel} />
      )}

      <div className="site-tools__actions" role="group" aria-label="פתיחת כלי עזר">
        {assistantSettings.enabled && (
          <button
            ref={assistantButtonRef}
            type="button"
            className="site-tool-launcher site-tool-launcher--assistant"
            aria-haspopup="dialog"
            aria-expanded={activePanel === "assistant"}
            aria-controls="assistant-panel"
            onClick={() => togglePanel("assistant")}
          >
            <ChatIcon width={21} height={21} />
            <span>עוזר ניווט</span>
          </button>
        )}
        <button
          ref={accessibilityButtonRef}
          type="button"
          className="site-tool-launcher"
          aria-haspopup="dialog"
          aria-expanded={activePanel === "accessibility"}
          aria-controls="accessibility-panel"
          onClick={() => togglePanel("accessibility")}
        >
          <AccessibilityIcon width={21} height={21} />
          <span>נגישות</span>
        </button>
      </div>
    </aside>
  );
}
