import { Image } from 'react-native'
import { useColorScheme } from './useColorScheme'

export default function LogoComponent({ styles } : any ) {
  const colorScheme = useColorScheme();

  return (
    <>
      { colorScheme === 'light' ? (
        <Image 
          source={require( '@assets/icons/Logo.png')} 
          style={styles} 
        />
      ):(
        <Image 
          source={require( '@assets/icons/Logo_Alt.png')} 
          style={styles} 
        />
      )}
    </>
  )
}
