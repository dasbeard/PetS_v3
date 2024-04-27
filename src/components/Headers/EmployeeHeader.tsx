import { View, StyleSheet, Platform, Pressable, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'


import { useColorScheme } from '@/components/useColorScheme';

export default function EmployeeHeader() {
  const colorScheme = useColorScheme(); 

  return (
    <SafeAreaView style={{backgroundColor: Colors.brand[500] }}>
      <View style={styles.mainContianer}>
        <View style={styles.left}>

        <Link href={'/(employee)/dashboard'} asChild>
            <Pressable>
              {({ pressed }) => (
                <Image 
                source={require( '../../../assets/icons/Logo_Alt.png')} 
                style={[styles.image, {opacity: pressed ? 0.5 : 1}]}
                />
              )}
            </Pressable>
          </Link>
        </View>
        
        <View style={styles.right}>
          <View style={styles.linkContainer}>
            <Link href={'/(employee)/calendar'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons 
                  name='calendar-outline' 
                  color={Colors.dark.text}
                  size={26}
                  style={{ opacity: pressed ? 0.5 : 1}}
                  />
                  )}
              </Pressable>
            </Link>
          </View>

          <View style={styles.linkContainer}>
            <Link href={'/(employee)/profile'} asChild>
              <Pressable>
                {({ pressed }) => (
                  <Ionicons
                    name='person-circle-outline'
                    size={28}
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
    height: Platform.OS === 'web' ? 65 : Platform.OS === 'android' ? 50 : 50,
    marginTop: Platform.OS === 'android' ? 45 : 0,
    marginBottom: 4,
    flexDirection: 'row',
    alignContent: 'space-between',
    marginHorizontal: 6,

  },
  left:{
    marginHorizontal: Platform.OS === 'web' ? 20 : 10,
    marginVertical: Platform.OS === 'web' ? 15 : 10,
    justifyContent: 'center',
    flex: 1,
  },
  image:{
    height: Platform.OS === 'web' ? 50 : 40,
    width: Platform.OS === 'web' ? 50 : 40,
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


