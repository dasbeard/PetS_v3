import { Image } from 'react-native'
import { useColorScheme } from './useColorScheme'

export default function LogoComponent({ styles, invert=false } : {styles?:any, invert?: boolean} ) {
  const colorScheme = useColorScheme();
  const isInverted = invert ? 'dark' : 'light' ;

  return (
    <>
      { colorScheme === isInverted ? (
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
