import { View, Text, StyleSheet, Platform, Pressable, SafeAreaView, Keyboard } from 'react-native'
import React from 'react'
import { Link, useNavigation } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme';
import { DrawerActions } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'


export default function ClientHeader( {title}: any) {
  const colorScheme = useColorScheme(); 
  const navigation = useNavigation()

  const toggleDrawer = () => {
    Keyboard.dismiss();
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  return (
    <SafeAreaView style={{backgroundColor: colorScheme === 'light' ? Colors.brand[500] :Colors.brand[700] }}>
      <View style={styles.mainContianer}>
        
        <View style={styles.left}>
          
          <TouchableOpacity onPress={toggleDrawer} style={{paddingLeft: 8}}>
            <Ionicons name='menu-sharp' size={23} color={Colors.dark.text} />
          </TouchableOpacity>
          
        </View>

        <Text style={styles.title}>{title}</Text>
        
        <View style={styles.right}>
          <View style={styles.linkContainer}>
            <Link href={'/(client)/createAppointment'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialCommunityIcons 
                  name='plus-circle-outline' 
                  color={Colors.dark.text}
                  size={23}
                  style={{ opacity: pressed ? 0.5 : 1}}
                  />
                  )}
              </Pressable>
            </Link>
          </View>

          <View style={styles.linkContainer}>
            <Link href={'/(client)/messages'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <MaterialCommunityIcons
                    name='message-text-outline'
                    size={23}
                    color={Colors.dark.text}
                    style={{ opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          </View>
        </View>


      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContianer: {
    height: Platform.OS === 'web' ? 50 : Platform.OS === 'android' ? 38 : 40,
    marginTop: Platform.OS === 'android' ? 45 : 0,
    marginBottom: 4,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginHorizontal: 6,

  },
  left:{
    flex: 1,
    marginHorizontal: Platform.OS === 'web' ? 5 : -3,
    justifyContent: 'center',
  },

  title:{
    flexGrow: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    color: Colors.dark.text
  },

  right:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: Platform.OS === 'web' ? 20 : undefined,
    gap: Platform.OS === 'web' ? 15 : undefined,
  },
  linkContainer: {
    marginHorizontal: Platform.OS === 'web' ? 10 : 8,
  }
})


