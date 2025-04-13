import { useEffect, useState } from 'react';
import { ThemedText } from './ThemedText';
import { Avatar, Card, Text } from 'react-native-paper';
import { Button, View, useWindowDimensions } from 'react-native';
import venueStyles from './VenueStyles';
import { FlatList } from 'react-native';

export default function VenueCatalog() 
{
    const [venueData, setVenueData] = useState<VenueItem[]>([]);
    
    const {height, width} = useWindowDimensions();
    const SM_SCREEN = 576
    const MD_SCREEN = 768
    const numColumns = width < SM_SCREEN ? 1 : width < MD_SCREEN ? 2 : 3
    
    useEffect(() => {
          fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
          const response = await fetch("https://6711-34-23-16-184.ngrok-free.app/get_venues", {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            }
          })
          if(response.ok) {
            const json:VenueJson = await response.json();
            setVenueData(json.all_venues);
          }
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const renderCardData = ({item}:{item: VenueItem})=>(
          <Card style={venueStyles.cardItem}>
          <Card.Title title={item.name} subtitle={`${item.dailyrate} Bath`}
            left={(props) => (
              <Avatar.Image
                {...props}
                source={require('@/assets/images/logo.png')}
              />
            )}
          />
          <Card.Content>
            <Text variant="bodyMedium">{item.address} {item.district} {item.province} {item.postalcode}</Text>
          </Card.Content>
          <Card.Cover source={{ uri: `data:image/jpeg;base64,${item.picture}` }} />
          <Card.Actions>
          <Button title="Book this Venue" color="#9b59b6"/>
          </Card.Actions>
        </Card>  
    )

    return (
        <View> 
        {
          (venueData.length>0) ?
          <FlatList
            data={venueData}
            keyExtractor={(item) => item._id}
            renderItem={renderCardData}
            numColumns={numColumns}
            key={numColumns}
            contentContainerStyle={venueStyles.cardContainer}
            scrollEnabled={false}
          />
          : <ThemedText>Venue Information is not available</ThemedText>
        }
        </View>
    )
}