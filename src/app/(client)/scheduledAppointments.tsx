import { StyleSheet } from 'react-native'
import { View, Text } from '@/components/Themed'
import { FlashList } from '@shopify/flash-list';
import { useGetUsersPetList } from '@/api/pets';
import { useAuth } from '@/providers/AuthProvider';
import { useClientFutureEvents } from '@/api/events';
import LoadingComponent from '@/components/LoadingComponent';
import ClientFutureEventComponent, { FutureEventProps } from '@/components/Cards/ClientFutureEventComponent';

export default function ScheduledAppointments() {
  const { session } = useAuth();
  const { data: EventData, error: EventError, isLoading: EventIsLoading } = useClientFutureEvents({ clientID: session?.user.id!})

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
      <Text style={styles.headerText}>Next Visits</Text>
    </View>

  
    <View style={styles.listContainer}>
      <FlashList
        data={EventData}
        renderItem={({item}) => (
          <ClientFutureEventComponent Event={item as FutureEventProps} />
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