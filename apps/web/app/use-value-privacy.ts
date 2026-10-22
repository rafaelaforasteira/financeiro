'use client';
import { useSyncExternalStore } from 'react';
const key = 'financeiro.hideValues';
let memoryHidden = true;
function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('financeiro-privacy', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('financeiro-privacy', callback);
  };
}
function snapshot() {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? memoryHidden : stored !== 'false';
  } catch {
    return memoryHidden;
  }
}
export function useValuePrivacy() {
  const hidden = useSyncExternalStore(subscribe, snapshot, () => true);
  function toggleHidden() {
    memoryHidden = !hidden;
    try {
      localStorage.setItem(key, String(memoryHidden));
    } catch {
      /* Manter preferência nesta sessão se o navegador proibir storage. */
    }
    window.dispatchEvent(new Event('financeiro-privacy'));
  }
  return { hidden, toggleHidden };
}
