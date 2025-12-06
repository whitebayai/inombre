'use client';

import { useState, useEffect } from 'react';
import { Prompt } from '../types';

interface PromptFormProps {
  prompt?: Prompt | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, content: string) => void;
}

export default function PromptForm({ prompt, isOpen, onClose, onSubmit }: PromptFormProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (prompt) {
      setName(prompt.name);
      setContent(prompt.content);
    } else {
      setName('');
      setContent('');
    }
  }, [prompt, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      onSubmit(name.trim(), content.trim());
      setName('');
      setContent('');
      onClose();
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setName('');
      setContent('');
      setIsClosing(false);
      onClose();
    }, 200); // Wait for animation
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Backdrop con Blur */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        className={`relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 dark:bg-[#1C1C1E] dark:ring-white/10 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100 animate-in fade-in zoom-in-95 duration-300'}`}
      >
        <div className="px-8 pt-8 pb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white text-center mb-1">
            {prompt ? 'Editar Prompt' : 'Nuevo Prompt'}
          </h2>
          <p className="text-center text-slate-500 dark:text-zinc-400 text-sm mb-8">
            {prompt ? 'Modifica los detalles de tu prompt' : 'Crea un nuevo prompt para tu colección'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="prompt-name"
                className="ml-1 block text-sm font-semibold text-slate-900 dark:text-zinc-300"
              >
                Nombre
              </label>
              <input
                id="prompt-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border-0 bg-slate-100 px-5 py-4 text-[17px] text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#007AFF] focus:bg-white transition-all dark:bg-[#2C2C2E] dark:text-white dark:placeholder-zinc-500 dark:focus:bg-[#3A3A3C]"
                placeholder="Ej: Asistente de Código"
                required
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="prompt-content"
                className="ml-1 block text-sm font-semibold text-slate-900 dark:text-zinc-300"
              >
                Contenido
              </label>
              <textarea
                id="prompt-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="w-full resize-none rounded-2xl border-0 bg-slate-100 px-5 py-4 text-[17px] leading-relaxed text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-[#007AFF] focus:bg-white transition-all dark:bg-[#2C2C2E] dark:text-white dark:placeholder-zinc-500 dark:focus:bg-[#3A3A3C]"
                placeholder="Escribe aquí las instrucciones del prompt..."
                required
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-xl bg-slate-100 px-4 py-3.5 text-[17px] font-semibold text-slate-600 transition-colors hover:bg-slate-200 active:bg-slate-300 dark:bg-[#2C2C2E] dark:text-zinc-400 dark:hover:bg-[#3A3A3C]"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#007AFF] px-4 py-3.5 text-[17px] font-semibold text-white shadow-lg shadow-blue-500/30 transition-all active:scale-95 hover:bg-[#0062cc]"
              >
                {prompt ? 'Guardar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
