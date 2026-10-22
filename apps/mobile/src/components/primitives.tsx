import { ScrollView, Text, View, StyleSheet } from 'react-native';
import type { ReactNode } from 'react';
import { Host, Button } from '@expo/ui';
import { theme } from '@financeiro/design-tokens';
import { useDemo } from '../providers/demo-provider';

export function NativeButton({
  children,
  onPress,
}: {
  children: string;
  onPress: () => void;
}) {
  return (
    <Host matchContents>
      <Button onPress={onPress}>{children}</Button>
    </Host>
  );
}
export function Card({ children }: { children: ReactNode }) {
  return <View style={styles.card}>{children}</View>;
}
export function Label({ children }: { children: ReactNode }) {
  return <Text style={styles.label}>{children}</Text>;
}
export function Heading({ children }: { children: ReactNode }) {
  return (
    <Text accessibilityRole="header" style={styles.heading}>
      {children}
    </Text>
  );
}
export function Screen({ children }: { children: ReactNode }) {
  const { loading, error, data, refresh } = useDemo();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.screen}
    >
      <Text style={styles.demo}>DEMO · DADOS FICTÍCIOS</Text>
      {error ? (
        <Card>
          <Text accessibilityRole="alert" style={styles.error}>
            {error}
          </Text>
          <NativeButton onPress={refresh}>Tentar novamente</NativeButton>
        </Card>
      ) : null}
      {loading && !data ? (
        <Text accessibilityRole="alert">Carregando demonstração…</Text>
      ) : (
        children
      )}
      <Label>
        Prévia demonstrativa. Sem dinheiro real e sem validade bancária.
      </Label>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.color.surface,
    padding: theme.space.xxl,
    borderRadius: theme.radius.card,
    borderColor: theme.color.border,
    borderWidth: 1,
    gap: theme.space.md,
  },
  screen: {
    padding: theme.space.xxl,
    gap: theme.space.xxl,
    backgroundColor: theme.color.background,
    flexGrow: 1,
  },
  label: {
    fontSize: theme.typography.small,
    color: theme.color.secondary,
    lineHeight: 22,
  },
  heading: {
    fontSize: theme.typography.title,
    color: theme.color.text,
    fontWeight: '600',
  },
  demo: {
    fontSize: theme.typography.small,
    fontWeight: '700',
    color: theme.color.primary,
  },
  error: { color: theme.color.error },
});
