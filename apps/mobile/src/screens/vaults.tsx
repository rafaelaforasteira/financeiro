import { Text } from 'react-native';
import { router } from 'expo-router';
import { formatMoney } from '@financeiro/contracts';
import { useDemo } from '../providers/demo-provider';
import { Card, Label, NativeButton } from '../components/primitives';

export function Vaults() {
  const { data, hidden } = useDemo();
  if (!data) return null;
  if (!data.vaults.length)
    return (
      <Card>
        <Text>Seus próximos planos começam aqui.</Text>
        <Label>
          Este cenário ainda não tem cofres. Criação disponível em um próximo
          marco.
        </Label>
      </Card>
    );
  return (
    <>
      {data.vaults.map((vault) => (
        <Card key={vault.id}>
          <Text accessibilityRole="header">{vault.name}</Text>
          <Label>
            {vault.kind === 'FREE' ? 'Livre' : 'Com prazo · demonstração'}
          </Label>
          <Text selectable>{hidden ? '••••' : formatMoney(vault.balance)}</Text>
          <Label>
            {vault.unlockAt
              ? `Bloqueio simulado até ${new Date(vault.unlockAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`
              : 'Disponibilidade ilustrativa'}
          </Label>
          <NativeButton
            onPress={() =>
              router.push({ pathname: '/vault/[id]', params: { id: vault.id } })
            }
          >
            Ver detalhes
          </NativeButton>
        </Card>
      ))}
    </>
  );
}
