
import { GuestEntry } from '../types';

const STORAGE_KEY = 'baby_shower_guest_data';

export const saveGuestEntry = (entry: GuestEntry): void => {
  const existing = getGuestEntries();
  existing.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
};

export const getGuestEntries = (): GuestEntry[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const clearAllEntries = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const exportToJsonFile = (): void => {
  const data = getGuestEntries();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'baby_shower_data.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
