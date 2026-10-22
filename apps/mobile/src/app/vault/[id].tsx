import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { formatMoney } from '@financeiro/contracts';
import { useDemo } from '../../providers/demo-provider';
import { Card, Heading, Label, Screen } from '../../components/primitives';
export default function Vault() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, hidden } = useDemo();
  const vault = data?.vaults.find((vault) => vault.id === id);
  return (
    <Screen>
      {vault ? (
        <Card>
          <Heading>{vault.name}</Heading>
          <Text>
            Saldo fictício: {hidden ? '••••' : formatMoney(vault.balance)}
          </Text>
          <Label>
            Meta:{' '}
            {hidden
              ? '••••'
              : vault.goal
                ? formatMoney(vault.goal)
                : 'Sem meta'}
          </Label>
          <Label>
            Exemplo de interface. Não representa produto ou bloqueio contratual
            real.
          </Label>
        </Card>
      ) : (
        <Label>Cofre não encontrado neste cenário.</Label>
      )}
    </Screen>
  );
}
