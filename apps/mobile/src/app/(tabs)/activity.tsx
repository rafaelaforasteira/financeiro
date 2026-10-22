import { Text } from 'react-native';
import { formatMoney } from '@financeiro/contracts';
import { useDemo } from '../../providers/demo-provider';
import { Card, Heading, Label, Screen } from '../../components/primitives';
export default function Activity() {
  const { data, hidden } = useDemo();
  return (
    <Screen>
      <Heading>Sua atividade</Heading>
      {data &&
        (data.activity.length ? (
          data.activity.map((item) => (
            <Card key={item.id}>
              <Text>{item.label}</Text>
              <Text>{hidden ? '••••' : formatMoney(item.amount)}</Text>
              <Label>
                {item.state === 'PENDING'
                  ? 'Aguardando confirmação fictícia'
                  : 'Concluído · fictício'}
              </Label>
            </Card>
          ))
        ) : (
          <Label>Nenhuma movimentação neste cenário.</Label>
        ))}
    </Screen>
  );
}
