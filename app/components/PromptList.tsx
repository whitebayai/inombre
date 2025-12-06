'use client';

import { Prompt } from '../types';
import PromptCard from './PromptCard';

interface PromptListProps {
  prompts: Prompt[];
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
}

export default function PromptList({ prompts, onEdit, onDelete, onCopy }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center rounded-3xl bg-white/50 p-12 text-center backdrop-blur-sm dark:bg-zinc-900/50">
        <div className="mb-4 rounded-full bg-slate-100 p-4 dark:bg-zinc-800">
          <svg
            className="h-8 w-8 text-slate-400 dark:text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-zinc-200">
          No hay prompts
        </h3>
        <p className="mt-2 max-w-sm text-slate-500 dark:text-zinc-400">
          Comienza creando tu primer prompt usando el botón "Nuevo Prompt".
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {prompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
          onEdit={onEdit}
          onDelete={onDelete}
          onCopy={onCopy}
        />
      ))}
    </div>
  );
}
