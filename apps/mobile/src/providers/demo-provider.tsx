import { createContext, use, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDemoSnapshot } from '@financeiro/api-client';
import type { DemoProfile, DemoSnapshot } from '@financeiro/contracts';

type Context = {
  data: DemoSnapshot | null;
  loading: boolean;
  error: string;
  profile: DemoProfile['id'];
  setProfile: (profile: DemoProfile['id']) => void;
  hidden: boolean;
  toggleHidden: () => void;
  refresh: () => void;
};
const DemoContext = createContext<Context | null>(null);
export function DemoProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<DemoProfile['id']>('pessoal');
  const [data, setData] = useState<DemoSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hidden, setHidden] = useState(true);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    void AsyncStorage.getItem('hide-values')
      .then((value) => setHidden(value !== 'false'))
      .catch(() => setHidden(true));
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const next = await getDemoSnapshot(
          process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:4000',
          profile,
          controller.signal,
        );
        if (!controller.signal.aborted) setData(next);
      } catch {
        if (!controller.signal.aborted)
          setError(
            'Não conseguimos atualizar os dados. Verifique a conexão com a API e tente novamente.',
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, [profile, revision]);
  function toggleHidden() {
    const next = !hidden;
    setHidden(next);
    void AsyncStorage.setItem('hide-values', String(next)).catch(() =>
      setError('Não foi possível salvar a preferência de privacidade.'),
    );
  }
  return (
    <DemoContext
      value={{
        data: data?.profile.id === profile ? data : null,
        loading,
        error,
        profile,
        setProfile,
        hidden,
        toggleHidden,
        refresh: () => setRevision((value) => value + 1),
      }}
    >
      {children}
    </DemoContext>
  );
}
export function useDemo() {
  const context = use(DemoContext);
  if (!context) throw new Error('DemoProvider ausente');
  return context;
}
