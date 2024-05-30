import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import { Stack, useRouter } from 'expo-router'
import ServiceSelectionButton from '@/components/Buttons/ServiceSelectionButton';

const serviceOptions= ['Dog Walk', 'Home Visit', 'Boarding' ]

export default function CreateAppointment() {
  const router = useRouter();

  const handleServiceSelection = (service: string) => {
    console.log(service);
    
    // setEventType(service)
    // router.push('/(client)/(events)/createEvent',)
    router.push({ pathname: '/(client)/(events)/createEvent', params: {eventType: service} }); // Remove the braces in params

    console.log('pressed');
    
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Schedule Appointment'}} />

      {serviceOptions.map((item, _idx) => (
        <View key={_idx} style={styles.serviceType}>
          <ServiceSelectionButton service={item} onPress={() => handleServiceSelection(item)} />
        </View>
      ))}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: 12,
    paddingHorizontal: 16,
  },

  serviceType: {
    marginVertical: 12,
  },
})
