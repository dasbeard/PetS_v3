import { StyleSheet, Image, Pressable } from 'react-native'
import { View, Text, CardView } from '../Themed'
import { Tables } from '@/database.types';
import dayjs from 'dayjs';
import RemoteImage from '../RemoteImage';
import { Entypo } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '../useColorScheme';
import { allImagesArray } from '../Buttons/ServiceSelectionButton';
import { InteractiveStyles } from '@/constants/Styles';

export interface PetQuickData {
  id: number;
  name: string | null;
  age: string | null;
  type: string | null;
  photo_url: string | null;
}

export interface FutureEventProps extends Tables<'events'> {
  employee?: EmployeeProps
}

type EmployeeProps = {
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export default function ClientFutureEventComponent( {Event} : {Event: FutureEventProps}) {
  const colorScheme = useColorScheme();
  const Icon = allImagesArray.find(ob => ob.id === Event.event_type!.replace(' ','').toLowerCase() )

  const handleOnPress = () => {
    console.log('Selected', Event.id);
  }

  return (
    <Pressable onPress={ handleOnPress }>
      {({ pressed }) => (
        <CardView 
          style={[
            InteractiveStyles({pressed: pressed, colorScheme: colorScheme!}).Shadow,
            styles.rootContainer,
          ]}
        >
          <CardView 
            style={[
              styles.headerContainer,
              colorScheme === 'light' ? {backgroundColor: Colors.brand[50]} : {backgroundColor: 'rgba(255,255,255, 0.05)'},
            ]}
          >
            <Text style={styles.headerText}>{ dayjs(Event.event_date).format('ddd MM/DD/YYYY') }</Text>
            <Text style={styles.headerText}>{ Event.event_time }</Text>
          </CardView>

          <CardView style={styles.mainContent}>
            <CardView style={styles.imagesContainer}>
            <Image 
                source={ colorScheme === 'light' ? Icon?.light : Icon?.dark } 
                style={styles.noImage}
              />

            </CardView>
            
            <CardView style={styles.container}>
              <CardView style={styles.topContainer}>
                
                { Event.employee 
                ? (
                    <CardView style={styles.hasEmployee}>
                      <Text style={styles.headerText}>{Event.event_type}</Text>

                      <CardView style={styles.employeeData}>
                        <CardView style={[styles.employeImageContainer, {shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow}]}>
                          <RemoteImage style={styles.employeeImage} path={Event.employee.avatar_url} />
                        </CardView>
                        <Text style={styles.mainText}>{Event.employee.first_name} is scheduled</Text>
                      </CardView>

                    </CardView>
                  )
                  : 
                
                  <CardView style={styles.eventContainer}>
                    <Text style={styles.headerText}>{Event.event_type}</Text>
                  </CardView>
                }

              </CardView>


            </CardView>
          </CardView>

        </CardView>
      )}
    </Pressable>
  )
}


const styles = StyleSheet.create({
  rootContainer:{
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 8,
    overflow: 'hidden',
    paddingBottom: 6,
    marginBottom: 12,
  },
  headerContainer:{
    borderBottomWidth: 0.75,
    height: 30,
    flexDirection: 'row',
    marginBottom: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  mainContent:{
    flex: 1,
    flexDirection:'row',
    paddingHorizontal: 20,
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  container:{
    flex: 2,
  },
  headerText:{
    fontSize: 18,
    textTransform: 'capitalize'
  },
  imagesContainer:{
    flex: 1.5,
  },
  noImage:{
    height: 90,
    aspectRatio: '1',
    objectFit: 'cover',
  },

  topContainer:{
    flex: 3,
    marginLeft: 6,
  },

  hasEmployee:{
    flex: 1,
    alignItems: 'center',
  },
  
  employeeData:{
    flex: 1,
    alignItems: 'center',
    gap: 6,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  employeImageContainer:{
    borderRadius: 35,
    elevation: 1,
    shadowOffset: {height: 0.75, width: 0.75},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  employeeImage:{
    height: 43,
    aspectRatio: '1',
    borderRadius: 35,
  },
  mainText:{
    fontSize: 16,
  },
  eventContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})