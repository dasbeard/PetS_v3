import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Redirect } from 'expo-router'
import { Drawer } from 'expo-router/drawer'
import { useAuth } from '@/providers/AuthProvider'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useWindowDimensions } from 'react-native'
import ClientHeader from '@/components/Headers/ClientHeader'
import { StatusBar } from 'expo-status-bar'
import ClientDrawerContent from '@/components/Drawers/ClientDrawerContent'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getHeaderTitle } from '@react-navigation/elements'


export default function ClientStack() {
  const { session } = useAuth()
  const colorScheme = useColorScheme();
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;
  const { bottom } = useSafeAreaInsets();

  if(!session){
    return <Redirect href={'/'} />
  }

  return (
    <GestureHandlerRootView style={{flex: 1, paddingBottom: bottom + 10}}>
      <StatusBar style='light'/>

      {/* <Drawer 
        initialRouteName='dashboard' 
        drawerContent={ClientDrawerContent}
        screenOptions={{
          drawerActiveBackgroundColor: colorScheme === 'light' ? Colors.brand[100]: Colors.brand[300],
          drawerActiveTintColor: Colors.light.text,
          drawerInactiveTintColor: Colors.placeholderText,
          // drawerType: isLargeScreen ? 'permanent' : 'front',       // for web - not fully setup at this time
          drawerStyle: isLargeScreen ? {width: 250} : {width: '65%'},
          header: ({route, options}) => {
            // Get and pass the current screens title to the custom header component
            const title = getHeaderTitle(options, route.name)
            return <ClientHeader title={title} /> 
          }         
        }}
      />    */}


      <Drawer 
        initialRouteName='dashboard' 
        drawerContent={ClientDrawerContent}
        screenOptions={{
          drawerActiveBackgroundColor: colorScheme === 'light' ? Colors.brand[100]: Colors.brand[300],
          drawerActiveTintColor: Colors.light.text,
          drawerInactiveTintColor: Colors.placeholderText,
          // drawerType: isLargeScreen ? 'permanent' : 'front',       // for web - not fully setup at this time
          drawerStyle: isLargeScreen ? {width: 250} : {width: '65%'},
          header: ({route, options}) => {
            // Get and pass the current screens title to the custom header component
            const title = getHeaderTitle(options, route.name)
            return <ClientHeader title={title} /> 
          }         
        }}
      >        
        <Drawer.Screen 
          name='dashboard' 
          options={{
            drawerLabel: 'Dashboard', 
            title: 'Dashboard',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='home-outline' size={size} color={color} />
            )
          }} 
        />

        <Drawer.Screen 
          name='scheduledAppointments' 
          options={{
            drawerLabel: 'My Schedule', 
            title: 'Scheduled Events',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='calendar-outline' size={size} color={color} />
            )
          }} 
        />

        <Drawer.Screen 
          name='profile' 
          options={{
            drawerLabel: 'My Profile', 
            title: 'My Profile',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='person-circle-outline' size={size} color={color} />
            )
          }} 
        />

        <Drawer.Screen 
          name='pets' 
          options={{
            drawerLabel: 'My Pets', 
            title: 'My Pets',
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name='pets' size={size} color={color} />
            )
          }} 
        />

        <Drawer.Screen 
          name='messages' 
          options={{
            drawerLabel: 'Messages', 
            title: 'Messages',
            drawerIcon: ({ size, color }) => (
              <FontAwesome name='envelope-o' size={size -3} color={color} />
            )
          }} 
        />



        {/* Hidden Screens */}

        <Drawer.Screen 
          name='createAppointment' 
          options={{ 
            drawerItemStyle: {display: 'none'}
          }} 
        />
        <Drawer.Screen 
          name='(events)/editEvent' 
          options={{ 
            drawerItemStyle: {display: 'none'}
          }} 
        />
        <Drawer.Screen 
          name='(events)/[eventID]' 
          options={{ 
            drawerItemStyle: {display: 'none'}
          }} 
        />
        <Drawer.Screen 
          name='(events)/createEvent' 
          options={{ 
            drawerItemStyle: {display: 'none'}
          }} 
        />
        <Drawer.Screen 
          name='(events)/confirmEvent' 
          options={{ 
            drawerItemStyle: {display: 'none'}
          }} 
        />

        <Drawer.Screen 
          name='(pets)/[petID]' 
          options={{ 
            title: 'Pet Details',
            drawerItemStyle: {display: 'none'}
          }} 
        />

      </Drawer>


    </GestureHandlerRootView>
    
  )
}
