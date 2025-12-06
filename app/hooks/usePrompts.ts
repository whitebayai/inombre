'use client';

import { useState, useEffect } from 'react';
import { Prompt } from '../types';
import { getPrompts, savePrompts, exportPrompts, importPrompts } from '../lib/storage';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedPrompts = getPrompts();
    setPrompts(loadedPrompts);
    setIsLoading(false);
  }, []);

  const createPrompt = (name: string, content: string) => {
    const newPrompt: Prompt = {
      id: crypto.randomUUID(),
      name,
      content,
      createdAt: Date.now(),
    };
    const updatedPrompts = [...prompts, newPrompt];
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
    return newPrompt;
  };

  const updatePrompt = (id: string, name: string, content: string) => {
    const updatedPrompts = prompts.map((prompt) =>
      prompt.id === id ? { ...prompt, name, content } : prompt
    );
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
  };

  const deletePrompt = (id: string) => {
    const updatedPrompts = prompts.filter((prompt) => prompt.id !== id);
    setPrompts(updatedPrompts);
    savePrompts(updatedPrompts);
  };

  const handleExport = () => {
    const json = exportPrompts();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompts-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (json: string) => {
    const importedPrompts = importPrompts(json);
    if (importedPrompts.length > 0) {
      const updatedPrompts = [...prompts, ...importedPrompts];
      setPrompts(updatedPrompts);
      savePrompts(updatedPrompts);
      return true;
    }
    return false;
  };

  return {
    prompts,
    isLoading,
    createPrompt,
    updatePrompt,
    deletePrompt,
    handleExport,
    handleImport,
  };
};

