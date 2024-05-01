import { View, StyleSheet, Platform, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'


import { useColorScheme } from '@/components/useColorScheme';
import { DrawerToggleButton } from '@react-navigation/drawer'

export default function ClientHeader() {
  const colorScheme = useColorScheme(); 

  return (
    <SafeAreaView style={{backgroundColor: colorScheme === 'light' ? Colors.brand[500] :Colors.brand[700] }}>
      <View style={styles.mainContianer}>
        
        <View style={styles.left}>
          <DrawerToggleButton tintColor={Colors.dark.text}  />
        </View>
        
        <View style={styles.right}>
          <View style={styles.linkContainer}>
            <Link href={'/(client)/createEvent'} asChild>
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
    height: Platform.OS === 'web' ? 50 : Platform.OS === 'android' ? 50 : 40,
    marginTop: Platform.OS === 'android' ? 45 : 0,
    marginBottom: 4,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginHorizontal: 6,

  },
  left:{
    marginHorizontal: Platform.OS === 'web' ? 5 : -3,
    justifyContent: 'center',
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


