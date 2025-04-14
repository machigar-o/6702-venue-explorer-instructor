import { ScrollView } from 'react-native'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from './_layout';

export default function TabTwoScreen() {

  const {selectedVenue, setSelectedVenue} = useAppContext()

  return (
    <ScrollView style={{marginTop:25}}>
      <ThemedView>
        <ThemedText>Selected Venue is : {selectedVenue}</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}
