import { Text, StyleSheet } from 'react-native';
import { theme } from '@financeiro/design-tokens';
import { formatMoney } from '@financeiro/contracts';
import { useDemo } from '../providers/demo-provider';
import {
  Card,
  Heading,
  Label,
  NativeButton,
  Screen,
} from '../components/primitives';
import { Vaults } from './vaults';

export function Home() {
  const { data, hidden, toggleHidden, refresh } = useDemo();
  return (
    <Screen>
      {data && (
        <>
          <Heading>Seus planos, com tranquilidade.</Heading>
          <Card>
            <Label>Meu patrimônio · valores fictícios</Label>
            <Text selectable style={styles.balance}>
              {hidden ? '••••' : formatMoney(data.balance.total)}
            </Text>
            <Label>
              Disponível para retirar:{' '}
              {hidden ? '••••' : formatMoney(data.balance.available)}
            </Label>
            <Label>
              Bloqueado na simulação:{' '}
              {hidden ? '••••' : formatMoney(data.balance.locked)}
            </Label>
            <NativeButton onPress={toggleHidden}>
              {hidden ? 'Exibir valores' : 'Ocultar valores'}
            </NativeButton>
          </Card>
          <Label>
            Guardar, retirar e criar cofres ainda estão indisponíveis neste
            marco.
          </Label>
          <Heading>Meus cofres</Heading>
          <Vaults />
          <Card>
            <Text>Ainda não há rendimentos confirmados.</Text>
            <Label>Nenhum produto remunerado contratado.</Label>
          </Card>
          <NativeButton onPress={refresh}>Atualizar dados</NativeButton>
        </>
      )}
    </Screen>
  );
}
const styles = StyleSheet.create({
  balance: {
    fontSize: theme.typography.balance,
    color: theme.color.text,
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
});
