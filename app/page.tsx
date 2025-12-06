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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-zinc-600 dark:text-zinc-400">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Gestor de Prompts para IA
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Administra y organiza tus prompts para agentes de inteligencia artificial
          </p>
        </header>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={handleNewPrompt}
            className="flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Prompt
          </button>
          <button
            onClick={handleExport}
            disabled={prompts.length === 0}
            className="flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Exportar
          </button>
          <button
            onClick={handleImportClick}
            className="flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Importar
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {prompts.length > 0 && (
          <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            {prompts.length} {prompts.length === 1 ? 'prompt guardado' : 'prompts guardados'}
          </div>
        )}

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

      {showCopyNotification && (
        <div className="fixed bottom-4 right-4 rounded-md bg-zinc-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
          Prompt copiado al portapapeles
        </div>
      )}
    </div>
  );
}
