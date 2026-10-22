import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DemoProvider } from '../providers/demo-provider';
import { theme } from '@financeiro/design-tokens';

export default function Layout() {
  return (
    <DemoProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.color.background },
          headerTintColor: theme.color.text,
          contentStyle: { backgroundColor: theme.color.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="vault/[id]"
          options={{ title: 'Detalhes do cofre', presentation: 'modal' }}
        />
      </Stack>
    </DemoProvider>
  );
}
