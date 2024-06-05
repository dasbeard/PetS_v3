import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import { FlashList } from '@shopify/flash-list';
import { useAuth } from '@/providers/AuthProvider';
import { useClientPastEvents } from '@/api/events';
import ClientEventComponent, { EventProps } from '@/components/Cards/ClientEventComponent';
import LoadingComponent from '@/components/LoadingComponent';

export default function ClientDashboard() {
  const { session } = useAuth();
  const { data: EventData, error: EventError, isLoading: EventIsLoading } = useClientPastEvents({ clientID: session?.user.id!})

  // console.log('App render');

    if (EventError){
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text>Somethign went wrong</Text>
        </View>
      )
    }

    if (EventIsLoading) {
      return <LoadingComponent />
    }


   return (
     <View style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Recent Activity</Text>
      </View>

    
      <View style={styles.listContainer}>
        <FlashList
          data={EventData}
          renderItem={({item}) => (
            <ClientEventComponent Event={item as EventProps} />
          )}
          estimatedItemSize={360}
        />
      </View>
      

     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: { 
     flex: 1,
     padding: 12,
   },

   headerContainer:{
     alignItems: 'center',
     borderBottomWidth: 0.5,
     marginBottom: 8,
   },
   headerText:{
    fontSize: 20,
   },
   listContainer:{
    flex: 1,
   
   },

 });