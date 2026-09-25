"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      if (stored === "dark") {
        setTheme("dark");
        document.documentElement.classList.add("dark");
        document.documentElement.setAttribute("data-theme", "dark");
      } else if (stored === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      } else {
        // Default to light mode
        setTheme("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.setAttribute("data-theme", "light");
      }
    } catch (e) {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    if (next === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-sm bg-ground-elevated border border-rule" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="p-2 text-charcoal hover:text-gold-400 bg-ground-elevated hover:bg-rule border border-rule rounded-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 flex items-center justify-center shrink-0 cursor-pointer"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-charcoal" aria-hidden="true" />
      ) : (
        <Sun className="w-4 h-4 text-gold-400" aria-hidden="true" />
      )}
    </button>
  );
}
