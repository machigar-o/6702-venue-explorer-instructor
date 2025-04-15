import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from './_layout';
import Animated from 'react-native-reanimated';
import VenueBookForm from '@/components/VenueBookForm';
import venueBookStyles from '@/components/VenueBookStyles';

export default function TabTwoScreen() {
  const {selectedVenue, setSelectedVenue} = useAppContext()
 
  return (
    <ThemedView style={venueBookStyles.mainContainer}>
    <Animated.ScrollView>
      <ThemedView style={venueBookStyles.content}>
        <VenueBookForm preSelectedVenueId={selectedVenue}/>
      </ThemedView>
    </Animated.ScrollView>
    </ThemedView>
  );
}
