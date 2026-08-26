import { useEffect, useState } from "react";

const KEY = "portfolio-theme";

function initial() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    return "dark";
  }
  return "dark";
}

export default function useTheme() {
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {
      return;
    }
  }, [theme]);

  const toggle = () => setTheme((now) => (now === "dark" ? "light" : "dark"));

  return { theme, toggle };
}
