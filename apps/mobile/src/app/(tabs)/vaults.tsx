import { Screen, Heading } from '../../components/primitives';
import { Vaults } from '../../screens/vaults';
export default function VaultsScreen() {
  return (
    <Screen>
      <Heading>Meus cofres</Heading>
      <Vaults />
    </Screen>
  );
}
