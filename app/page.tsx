'use client';

import { useState, useRef } from 'react';
import { usePrompts } from './hooks/usePrompts';
import { Prompt } from './types';
import PromptList from './components/PromptList';
import PromptForm from './components/PromptForm';

export default function Home() {
  const {
    prompts,
    isLoading,
    createPrompt,
    updatePrompt,
    deletePrompt,
    handleExport,
    handleImport,
  } = usePrompts();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewPrompt = () => {
    setEditingPrompt(null);
    setIsFormOpen(true);
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (name: string, content: string) => {
    if (editingPrompt) {
      updatePrompt(editingPrompt.id, name, content);
    } else {
      createPrompt(name, content);
    }
    setIsFormOpen(false);
    setEditingPrompt(null);
  };

  const handleDeletePrompt = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este prompt?')) {
      deletePrompt(id);
    }
  };

  const handleCopy = (content: string) => {
    setShowCopyNotification(true);
    setTimeout(() => setShowCopyNotification(false), 2000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const json = event.target?.result as string;
        if (handleImport(json)) {
          alert('Prompts importados correctamente');
        } else {
          alert('Error al importar prompts. Verifica que el archivo sea válido.');
        }
      };
      reader.readAsText(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F2F2F7] dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#007AFF] border-t-transparent"></div>
          <div className="text-sm font-medium text-slate-500">Cargando...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-slate-900 transition-colors duration-300 dark:bg-black dark:text-white">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Prompts
            </h1>
            <p className="mt-2 text-lg text-slate-500 dark:text-slate-400">
              Organiza tus ideas para IA
            </p>
          </div>
          
          <button
            onClick={handleNewPrompt}
            className="group flex items-center justify-center gap-2 rounded-full bg-[#007AFF] px-6 py-3 text-[15px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 active:scale-95 hover:bg-[#0062cc] hover:shadow-blue-500/30 dark:shadow-blue-900/20"
          >
            <svg
              className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Prompt
          </button>
        </header>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/60 p-2 backdrop-blur-xl dark:bg-zinc-900/60">
          <div className="px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            {prompts.length} {prompts.length === 1 ? 'elemento' : 'elementos'}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleExport}
              disabled={prompts.length === 0}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#007AFF] shadow-sm transition-all duration-200 active:scale-95 hover:bg-slate-50 disabled:opacity-50 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Exportar
            </button>
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#007AFF] shadow-sm transition-all duration-200 active:scale-95 hover:bg-slate-50 dark:bg-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Importar
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <PromptList
          prompts={prompts}
          onEdit={handleEditPrompt}
          onDelete={handleDeletePrompt}
          onCopy={handleCopy}
        />
      </div>

      <PromptForm
        prompt={editingPrompt}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPrompt(null);
        }}
        onSubmit={handleFormSubmit}
      />

      {/* Notificación estilo iOS Dynamic Island / Toast */}
      <div 
        className={`fixed left-1/2 top-6 z-50 -translate-x-1/2 transform transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${
          showCopyNotification 
            ? 'translate-y-0 opacity-100 scale-100' 
            : '-translate-y-8 opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3 rounded-full bg-black/80 px-6 py-3 text-white backdrop-blur-md shadow-2xl dark:bg-white/90 dark:text-black">
          <svg className="h-5 w-5 text-green-400 dark:text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[15px] font-medium">Copiado al portapapeles</span>
        </div>
      </div>
    </div>
  );
}
