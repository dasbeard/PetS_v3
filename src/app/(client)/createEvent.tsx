import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import { useRouter } from 'expo-router'
import ServiceSelectionButton from '@/components/Buttons/ServiceSelectionButton';

const serviceOptions= ['Dog Walk', 'Home Visit', 'Boarding' ]

export default function ClientScheduledAppointmentsScreen() {
  const router = useRouter();

  const handleServiceSelection = (service: string) => {
    // setEventType(service)
    // router.push('/(client)/NewServiceRequest/Details')
    console.log('pressed');
    
  }

  return (
    <View style={styles.container}>
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
