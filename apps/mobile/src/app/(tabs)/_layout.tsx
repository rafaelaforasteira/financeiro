import { Tabs } from 'expo-router';
import { theme } from '@financeiro/design-tokens';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.color.primary,
        tabBarInactiveTintColor: theme.color.secondary,
        tabBarStyle: { backgroundColor: theme.color.surface },
        headerStyle: { backgroundColor: theme.color.background },
        headerTintColor: theme.color.text,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="vaults" options={{ title: 'Cofres' }} />
      <Tabs.Screen name="activity" options={{ title: 'Atividade' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
