import { Pressable, StyleSheet } from 'react-native'
import { Text, CardView } from '../Themed'
import { Tables } from '@/database.types';
import dayjs from 'dayjs';
import RemoteImage from '../RemoteImage';
import { Entypo } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from '../useColorScheme';
import { InteractiveStyles } from '@/constants/Styles';

export interface PetQuickData {
  id: number;
  name: string | null;
  age: string | null;
  type: string | null;
  photo_url: string | null;
}

export interface EventProps extends Tables<'events'> {
  employee: EmployeeProps
}

type EmployeeProps = {
  first_name: string;
  last_name: string;
  avatar_url: string;
}


export default function ClientEventComponent({ Event }: {Event: EventProps}) {
  // console.log('Client Event Component', {Event});
  const colorScheme = useColorScheme();

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
            <Text style={styles.headerText}>Checked in at { dayjs(Event.checked_in_at).format('h:m a') }</Text>
          </CardView>

          <CardView style={styles.mainContent}>
            <CardView style={styles.imagesContainer}>
                { Event.photo_urls?.length 
                  ? (
                    <CardView style={styles.imageOuterContainer}>
                      <CardView style={styles.imageMainContainer}>
                        <RemoteImage style={styles.mainImage} path={Event.photo_urls[0]} />
                      </CardView>
                      <CardView style={styles.imageInnerContainer}>
                        <RemoteImage style={[styles.secondaryImage, { marginBottom: 1}]} path={Event.photo_urls[1]} />
                        <RemoteImage style={styles.secondaryImage} path={Event.photo_urls[2]} />
                      </CardView>

                    </CardView>
                  )
                  : (
                    <CardView style={[styles.imageOuterContainer, { }]}>
                      <RemoteImage style={[styles.mainImage, { }]} />
                    </CardView>
                  )
                }

            </CardView>
            
            <CardView style={styles.container}>
              <CardView style={styles.topContainer}>
                
                { Event.employee 
                ? (
                    <CardView style={styles.employeeData}>
                      <CardView style={[styles.employeImageContainer, {shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow}]}>
                        <RemoteImage style={styles.employeeImage} path={Event.employee.avatar_url} />
                      </CardView>
                      <Text style={styles.mainText}>{Event.employee.first_name}</Text>
                    </CardView>
                  )
                  : null
                }
                
                <CardView style={styles.eventContainer}>
                  <Text style={styles.mainText}>{Event.event_type}</Text>
                </CardView>

              </CardView>

              <CardView style={styles.visitNotesContainer}>
                <Text style={styles.visitNotesText} numberOfLines={4}>{Event.notes}</Text>
              </CardView>

              <CardView style={styles.quickActions}>
                <CardView style={styles.checklistItem}>
                  <Entypo 
                    name='check' 
                    size={14} 
                    color={
                      Event.checked_in_at ? Colors.green[500] : 
                      colorScheme === 'light' ? Colors.light.disabled : Colors.dark.disabled
                    } 
                  />
                  <Text 
                    style={[
                      styles.checklistItemText,
                      Event.checked_in_at ? { color: undefined} : { color: Colors.placeholderText}
                    ]}
                  >
                    Checked In
                  </Text>
                </CardView>
                <CardView style={styles.checklistItem}>
                  <Entypo 
                    name='check' 
                    size={14} 
                    color={
                      Event.completed_at ? Colors.green[500] : 
                      colorScheme === 'light' ? Colors.light.disabled : Colors.dark.disabled
                    } 
                  />
                  <Text 
                    style={[
                      styles.checklistItemText, 
                      Event.completed_at ? { color: undefined} : { color: Colors.placeholderText}
                    ]}
                  >
                    Completed
                  </Text>
                </CardView>

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
    paddingHorizontal: 6,
  },
  container:{
    flex: 2,
  },
  headerText:{
    fontSize: 18,
  },
  imagesContainer:{
    flex: 1.5,
  },
  imageOuterContainer:{
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 0.5,
  },
  imageMainContainer:{
    flex: 1,
  },
  imageInnerContainer:{
    flex: 0.5,
    marginLeft: 1,
  },

  mainImage:{
    height: '100%',
    aspectRatio: '1',
    objectFit: 'cover',
  },
  secondaryImage:{
    height: '50%',
    aspectRatio: '1',
    objectFit: 'cover',
  },

  topContainer:{
    flex: 3,
    marginLeft: 6,
    paddingBottom: 3,
    marginBottom: 3,
    flexDirection: 'row',
    borderBottomWidth: 0.5,

  },
  
  employeeData:{
    flex: 1,
    alignItems: 'center',
    gap: 6,
    flexDirection: 'row',
  },
  employeImageContainer:{
    borderRadius: 35,
    elevation: 1,
    shadowOffset: {height: 0.75, width: 0.75},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
  employeeImage:{
    height: 33,
    aspectRatio: '1',
    borderRadius: 25,
  },
  mainText:{
    fontSize: 15,
  },
  eventContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitNotesContainer:{
    flex: 1,
    height: '50%',
    paddingLeft: 8,
    paddingBottom: 4,
  },
  visitNotesText:{
    fontSize: 12,
  },

  quickActions:{
    flex: 0.5,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    marginLeft: 6,
    paddingVertical: 4
  },
   checklistItem:{
    flex: 1,
    flexDirection: 'row',
    gap: 6,
  },
  checklistItemText:{
    fontSize: 12,
  },
})