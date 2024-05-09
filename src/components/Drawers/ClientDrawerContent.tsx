import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { Platform, StyleSheet } from 'react-native'
import { View } from '../Themed';
import { useColorScheme } from '../useColorScheme'
import { useAuth } from '@/providers/AuthProvider';
import Colors from '@/constants/Colors'
import Button from '../Buttons/StyledButton';
import LogoComponent from '../LogoComponent';

export default function ClientDrawerContent(props: any) {
  const colorScheme = useColorScheme();
  const { bottom } = useSafeAreaInsets(); 
  const { logOutUser } = useAuth();

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView props{...props} 
        scrollEnabled={false}
        contentContainerStyle={{
          backgroundColor: colorScheme === 'light' ? Colors.brand[500] : Colors.brand[700]
        }}
      >
        <View style={[
          styles.header, { 
            borderBottomColor: colorScheme === 'light' ? Colors.placeholderText : Colors.dark.altText }]}
        >
          <LogoComponent styles={styles.headerImage} Dark />
        </View>

        <View style={styles.drawerItems}>
          <DrawerItemList props{...props} />
        </View>
      </DrawerContentScrollView>

      <View style={[styles.footer, {paddingBottom: 20 + bottom}]}>
        <Button Text='Logout' onPress={logOutUser} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  header:{
     paddingBottom: 20,
     backgroundColor: Platform.OS === 'web' ? Colors.brand[500] : undefined,
     borderBottomWidth: 1,
     width: '100%',
  },
  headerImage:{
    height: Platform.OS === 'web' ? 100 : 115, 
    aspectRatio: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  drawerItems:{
    paddingTop: 10,
  },
  footer:{
    borderTopWidth: 1,
    borderTopColor: Colors.placeholderText,
    padding: 20,
  },
})