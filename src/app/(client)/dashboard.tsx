import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'


export default function ClientDashboard() {
  

   // renders
   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>

     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 12,
   },

 });