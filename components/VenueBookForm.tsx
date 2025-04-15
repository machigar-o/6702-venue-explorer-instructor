import { ThemedView } from "./ThemedView"
import { useEffect, useState } from 'react';
import getVenues from "@/lib/getVenues";
import { Picker } from "@react-native-picker/picker";
import venueBookStyles from "./VenueBookStyles";
import { useWindowDimensions, TextInput, Button, Platform } from 'react-native';
import { ThemedText } from "./ThemedText"; 
import { DatePickerModal } from "react-native-paper-dates"; 

export default function VenueBookForm({preSelectedVenueId} : {preSelectedVenueId:string}) 
{
    const SM_SCREEN = 576
    const {height, width} = useWindowDimensions();
    const [venueData, setVenueData] = useState<VenueItem[]>([]);
    const [venueId, setVenueId] = useState(preSelectedVenueId);
    const [email, setEmail] = useState('');
    const [nameLastname, setNameLastname] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [bookingDate, setBookingDate] = useState<Date | undefined>(undefined);
    const [isValidEmail, setIsValidEmail] = useState(false)
    const [invalidMsg, setInvalidMsg] = useState('')
    
    useEffect(()=>{
        setVenueId(preSelectedVenueId)
    }, [preSelectedVenueId])

    useEffect(() => {
        getVenues({setVenueData: setVenueData});
    }, []);
    
    const validateEmail = (email: string) => {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    };

    const handleBookingSubmit = () => {
        const today = new Date();
        today.setHours(23, 59, 59, 0);
        if(venueId.trim()==='') {
            setInvalidMsg("Please select venue")
        }
        else if(email.trim()==='' || !isValidEmail) {
            setInvalidMsg("Please enter invalid email address")
        }
        else if(nameLastname.trim()==='') {
            setInvalidMsg("Please enter name-lastname")
        }
        else if(!bookingDate || bookingDate==undefined) {
            setInvalidMsg("Please select booking date")
        }
        else if(bookingDate<=today) {
            setInvalidMsg("Booking date must be later than today.")
        }
        else {
            setInvalidMsg("")
        }
    }
    
    const onDatePickerConfirm = (params: {date:Date|undefined}) => {
        setShowDatePicker(false);
        setBookingDate(params.date);
    };

    return(
        <ThemedView style={{width: (width>SM_SCREEN)? "50%":"auto"}}>
            <Picker selectedValue={venueId} onValueChange={(value) => setVenueId(value)}
                dropdownIconColor="#4654eb"
                style={venueBookStyles.picker}>
            {
                venueData.map((venueItem)=>(
                    <Picker.Item label={venueItem.name} value={venueItem._id} key={venueItem._id}/>))
            }
            </Picker>
            <ThemedText style={venueBookStyles.label}>Email: </ThemedText>
            <TextInput
                value={email}
                onChangeText={(inputText:string)=>{ setEmail(inputText)
                    setIsValidEmail(validateEmail(inputText))
                }}
                placeholder="enter email address"
                style={venueBookStyles.input}
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            {
                (email && !isValidEmail)? 
                <ThemedText style={venueBookStyles.invalidWarn}>Please enter valid email</ThemedText>
                :<ThemedText></ThemedText>
            }
            <ThemedText style={venueBookStyles.label}>Name-Lastname: </ThemedText>
            <TextInput
                value={nameLastname}
                onChangeText={setNameLastname}
                placeholder="enter name-lastname"
                style={venueBookStyles.input}
                placeholderTextColor="#999"
            />
            <ThemedView style={{marginVertical:20, width:"50%"}}>
                <Button title="Select Booking Date" color="#8d97fc" 
                onPress={()=>{setShowDatePicker(true)}}/>
            </ThemedView>
            <DatePickerModal
                locale="en"
                mode="single"
                visible={showDatePicker}
                onDismiss={() => setShowDatePicker(false)}
                date={bookingDate}
                onConfirm={onDatePickerConfirm}
            />
            <ThemedText>
                Booking Date: {bookingDate ? bookingDate.toDateString() : "None"}
            </ThemedText>
            <ThemedView style={{marginVertical:20}}>
                <Button title="Book this Venue" color="#4654eb" onPress={handleBookingSubmit}/>
            </ThemedView>
            <ThemedText style={venueBookStyles.invalidWarn}>{invalidMsg}</ThemedText>
        </ThemedView>
    )
}