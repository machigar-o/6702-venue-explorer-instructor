import { useEffect, useState } from 'react';
import { ThemedText } from './ThemedText';

export default function VenueCatalog() 
{
    const [venueData, setVenueData] = useState<VenueItem[]>([]);
    useEffect(() => {
          fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
          const response = await fetch("https://079b-34-106-116-149.ngrok-free.app/get_venues", {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            }
          })
          if(response.ok) {
            console.log("Response ok")
            const json:VenueJson = await response.json();
            setVenueData(json.all_venues);
          }
          else {
            console.log("Response not ok")
          }
        } 
        catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    return (
        <ThemedText>There are {venueData.length} venues.</ThemedText>
    )
}