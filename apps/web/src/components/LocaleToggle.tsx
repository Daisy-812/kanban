import { twMerge } from "tailwind-merge";

import type { Locale } from "~/locales";
import { useLocalisation } from "~/hooks/useLocalisation";

const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "zh", label: "中文" },
];

interface LocaleToggleProps {
  isCollapsed?: boolean;
}

export function LocaleToggle({ isCollapsed = false }: LocaleToggleProps) {
  const { locale, setLocale } = useLocalisation();

  // Treat any non-Chinese locale as "English" for the purposes of this toggle.
  const active: Locale = locale === "zh" ? "zh" : "en";

  if (isCollapsed) {
    const next: Locale = active === "zh" ? "en" : "zh";
    return (
      <button
        onClick={() => void setLocale(next)}
        aria-label={`Switch language to ${next === "zh" ? "中文" : "English"}`}
        className="flex h-8 w-full items-center justify-center rounded-md text-xs font-medium text-light-900 hover:bg-light-200 dark:text-dark-900 dark:hover:bg-dark-200"
      >
        {active === "zh" ? "中" : "EN"}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex w-full items-center rounded-md bg-light-200 p-0.5 dark:bg-dark-200"
    >
      {OPTIONS.map((option) => {
        const isActive = active === option.value;
        return (
          <button
            key={option.value}
            onClick={() => void setLocale(option.value)}
            aria-pressed={isActive}
            className={twMerge(
              "flex-1 rounded px-2 py-1 text-xs font-medium transition-colors",
              isActive
                ? "bg-light-50 text-neutral-900 shadow-sm dark:bg-dark-50 dark:text-dark-1000"
                : "text-light-900 hover:text-neutral-900 dark:text-dark-900 dark:hover:text-dark-1000",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default LocaleToggle;
