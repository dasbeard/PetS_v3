import { View, StyleSheet, Platform, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'


import { useColorScheme } from '@/components/useColorScheme';
import { DrawerToggleButton } from '@react-navigation/drawer'

export default function ClientHeader() {
  const colorScheme = useColorScheme(); 

  return (
    <SafeAreaView style={{backgroundColor: colorScheme === 'light' ? Colors.brand[400] :Colors.brand[700] }}>
      <View style={styles.mainContianer}>
        
        <View style={styles.left}>
          <DrawerToggleButton tintColor={Colors.dark.text}  />
        </View>
        
        <View style={styles.right}>
          <View style={styles.linkContainer}>
            <Link href={'/(client)/dashboard'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome 
                  name='calendar-plus-o' 
                  color={Colors.dark.text}
                  size={22}
                  style={{ opacity: pressed ? 0.5 : 1}}
                  />
                  )}
              </Pressable>
            </Link>
          </View>

          <View style={styles.linkContainer}>
            <Link href={'/(client)/profile'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name='person-circle-outline'
                    size={27}
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
    height: Platform.OS === 'web' ? 65 : Platform.OS === 'android' ? 50 : 40,
    marginTop: Platform.OS === 'android' ? 45 : 0,
    marginBottom: 4,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginHorizontal: 6,

  },
  left:{
    marginHorizontal: Platform.OS === 'web' ? 20 : -3,
    justifyContent: 'center',
  },
  right:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  linkContainer: {
    marginHorizontal: Platform.OS === 'web' ? 10 : 8,
  }
})


