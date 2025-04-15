export default function addBooking({venueId, bookItem, setResponse}: 
  {venueId:string, bookItem:bookingItem, setResponse:Function}) 
{
    const postBooking = async () => {
        try {
          const response = await fetch("https://7bb6-35-230-176-130.ngrok-free.app/add_booking", {
            method: 'POST',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              venue_id: venueId,
              booking_date: bookItem.booking_date,
              email: bookItem.email,
              name_lastname: bookItem.name_lastname
            }),
          })
          if(response.ok) {
            const json:BookResponseJson = await response.json();
            setResponse(json)
          }
        } 
        catch (error) { console.error('Error posting data:', error); }
    };

    postBooking()
}