import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import { StyleSheet } from 'react-native'
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
          backgroundColor: colorScheme === 'light' ? Colors.brand[100] : Colors.brand[700]
        }}
      >
        <View style={[
          styles.header, { 
            borderBottomColor: colorScheme === 'light' ? Colors.placeholderText : Colors.dark.altText }]}
        >
          <LogoComponent styles={styles.headerImage} />
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
     backgroundColor: undefined,
     borderBottomWidth: 1,
  },
  headerImage:{
    height: 115, 
    aspectRatio: 1,
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