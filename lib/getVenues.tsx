export default function getVenues({setVenueData}:{setVenueData:Function}) {
    const fetchVenues = async () => {
        try {
          const response = await fetch("https://7bb6-35-230-176-130.ngrok-free.app/get_venues", {
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

    fetchVenues();
}