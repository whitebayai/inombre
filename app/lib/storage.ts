import { Prompt } from '../types';

const STORAGE_KEY = 'ai-prompts';

export const getPrompts = (): Prompt[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading prompts from localStorage:', error);
    return [];
  }
};

export const savePrompts = (prompts: Prompt[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  } catch (error) {
    console.error('Error saving prompts to localStorage:', error);
  }
};

export const exportPrompts = (): string => {
  const prompts = getPrompts();
  return JSON.stringify(prompts, null, 2);
};

export const importPrompts = (json: string): Prompt[] => {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Error parsing imported prompts:', error);
    return [];
  }
};

