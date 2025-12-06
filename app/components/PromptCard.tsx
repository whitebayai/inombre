'use client';

import { Prompt } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  onCopy: (content: string) => void;
}

export default function PromptCard({ prompt, onEdit, onDelete, onCopy }: PromptCardProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    onCopy(prompt.content);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:bg-[#1C1C1E] dark:shadow-none dark:hover:bg-[#2C2C2E]">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            {prompt.name}
          </h3>
          <div className="flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={() => onEdit(prompt)}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#007AFF] dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-blue-400"
              aria-label="Editar prompt"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <button
              onClick={() => onDelete(prompt.id)}
              className="rounded-full p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-zinc-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
              aria-label="Eliminar prompt"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute -inset-2 rounded-xl bg-slate-50 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-800/50" />
          <p className="relative line-clamp-4 text-[15px] leading-relaxed text-slate-600 dark:text-zinc-400">
            {prompt.content}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800">
        <span className="text-xs font-medium text-slate-400 dark:text-zinc-600">
          {formatDate(prompt.createdAt)}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-all active:scale-95 hover:bg-[#007AFF] hover:text-white dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-blue-600 dark:hover:text-white"
        >
          <span>Copiar</span>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
