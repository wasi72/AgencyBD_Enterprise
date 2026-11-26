import { useState } from 'react';
import type { FC } from 'react';
import { ChevronDown, ChevronRight, Compass } from 'lucide-react';

export const TabGuide: FC<{
  id: string;
  title: string;
  steps: [string, string, string];
  note?: string;
}> = ({ id, title, steps, note }) => {
  const key = `agencybd.find.guide.${id}`;
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(key) === '1'; } catch { return false; }
  });

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    try { localStorage.setItem(key, next ? '1' : '0'); } catch { /* ignore */ }
  };

  return (
    <div className="rounded-2xl border border-teal-500/25 bg-teal-50/70 dark:bg-teal-950/20 dark:border-teal-500/30 px-4 py-3 text-xs shadow-xs transition-colors">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={toggle}
          className="flex items-center gap-2 font-semibold text-teal-950 dark:text-teal-200 hover:text-teal-700 dark:hover:text-white transition text-left cursor-pointer"
        >
          <Compass className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <span className="text-sm font-semibold tracking-tight">How {title} works</span>
          {collapsed ? (
            <ChevronRight className="h-4 w-4 text-teal-700/60 dark:text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-teal-700/60 dark:text-slate-400" />
          )}
        </button>
        {note && (
          <span className="hidden sm:inline text-[11px] font-medium text-teal-900/70 dark:text-slate-400">
            {note}
          </span>
        )}
      </div>
      {!collapsed && (
        <div className="mt-2.5 grid gap-2.5 sm:grid-cols-3 text-xs">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl bg-white/90 dark:bg-slate-900/70 border border-teal-900/10 dark:border-slate-800 p-3 shadow-xs text-slate-800 dark:text-slate-200 leading-relaxed font-normal"
            >
              <span className="h-5 w-5 rounded-full bg-teal-600 dark:bg-teal-500 text-white dark:text-slate-950 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                {idx + 1}
              </span>
              <span className="text-[12px] text-slate-700 dark:text-slate-200">{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
