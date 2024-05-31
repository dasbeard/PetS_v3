import { ActivityIndicator, StyleSheet } from 'react-native'
import { View } from './Themed'
import Colors from '@/constants/Colors'


export default function LoadingComponent() {
  return (
      <View style={styles.fetchingContainer}>
        <ActivityIndicator style={styles.indicator} size='large' color={Colors.brand[500]} />
      </View>
  )
}

const styles = StyleSheet.create({
  fetchingContainer:{
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center'
  },
  indicator:{
    transform: [{scale: 3}]
  },
  
})