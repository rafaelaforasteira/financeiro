import { Text } from 'react-native';
import { useDemo } from '../../providers/demo-provider';
import {
  Card,
  Heading,
  Label,
  NativeButton,
  Screen,
} from '../../components/primitives';
export default function Profile() {
  const { data, profile, setProfile } = useDemo();
  return (
    <Screen>
      <Heading>Seu perfil demonstrativo</Heading>
      <Card>
        <Text>{data?.profile.name ?? 'Carregando perfil'}</Text>
        <Label>
          Este é um cenário público sintético. Não cria uma conta nem verifica
          identidade.
        </Label>
        <NativeButton
          onPress={() =>
            setProfile(profile === 'pessoal' ? 'empresa' : 'pessoal')
          }
        >
          {profile === 'pessoal'
            ? 'Explorar cenário CNPJ'
            : 'Explorar cenário CPF'}
        </NativeButton>
      </Card>
    </Screen>
  );
}
