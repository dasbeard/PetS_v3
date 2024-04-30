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

export default function ClientStack() {
  const { session } = useAuth()
  const colorScheme = useColorScheme();
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;


  if(!session){
    return <Redirect href={'/'} />
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar style='light'/>
      <Drawer 
        initialRouteName='dashboard' 
        drawerContent={ClientDrawerContent}
        screenOptions={{
          drawerActiveBackgroundColor: colorScheme === 'light' ? Colors.brand[100]: Colors.brand[300],
          drawerActiveTintColor: Colors.light.text,
          drawerInactiveTintColor: Colors.placeholderText,
          drawerType: isLargeScreen ? 'permanent' : 'front',
          drawerStyle: isLargeScreen ? null : {width: 225},
          header: () => <ClientHeader />          
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
          name='profile' 
          options={{
            drawerLabel: 'Profile', 
            title: 'My Profile',
            drawerIcon: ({ size, color }) => (
              <Ionicons name='person-circle-outline' size={size} color={color} />
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

      </Drawer>


    </GestureHandlerRootView>
    
  )
}


// <Tabs>
//   <Tabs.Screen name='dashboard' />
//   <Tabs.Screen name='profile' />
// </Tabs>