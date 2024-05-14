import { StyleSheet, Platform, Pressable } from 'react-native'
import React from 'react'
// import { router } from 'expo-router'
import { FontAwesome6 } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { View, Text } from '@/components/Themed'
import { useColorScheme } from '@/components/useColorScheme';
import { useRouter } from 'expo-router'
import Button from '../Buttons/StyledButton'

export default function BackHeader({ 
  HeaderText, 
  BackTo, 
  BackTitle,
  RightButtonText,
  RightButtonOnPress,
}:{
  HeaderText?: string, 
  BackTo?: string, 
  BackTitle?: string,
  RightButtonText?: string,
  RightButtonOnPress?: any,
}) 
  {
  
  const colorScheme = useColorScheme();
  const router = useRouter(); 

  const handleBackPress = () => {
    BackTo ? router.navigate(`${BackTo}`) : router.back();
  }

  return (
      <View style={[styles.container, {borderColor: colorScheme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(251, 251, 251, 0.1)'}]}>
        <Pressable style={{flex:1}} onPress={handleBackPress}>
          {({ pressed }) => (
            <View style={[styles.left, { opacity: pressed ? 0.5 : 1}]}>
              <FontAwesome6 name="arrow-left" size={20} color={colorScheme=== 'light' ? Colors.light.text : Colors.dark.text}  />
              <Text style={styles.backText}>{BackTitle ? BackTitle : 'Back'}</Text>
            </View>
            )}
        </Pressable>
        
        <View style={styles.center}>
            <Text style={styles.headerText}>{HeaderText}</Text>
        </View>

        <View style={styles.right}>
          { RightButtonText && 
            <Button 
              Text={RightButtonText} 
              onPress={RightButtonOnPress}  
            />
          }
        </View>

      </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'row',
    maxHeight: 55,
    borderBottomWidth: 1,
  },
  left:{
    flex: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'web'? 20 : 9,
    gap: 10,
  },
  backText:{
    fontSize: 14,
    fontWeight: '300',
  },
  center:{
    flexGrow: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText:{
    fontSize: 18,
    fontWeight: '600',
  },
  right:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingRight: Platform.OS === 'web'? 20 : 9,
  },

})
