import { useTheme } from "../styles/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="
        px-3 py-2 rounded-md border text-sm font-medium
        bg-white text-slate-900 border-slate-200
        hover:bg-slate-50
        dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700
        dark:hover:bg-slate-700
      "
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
