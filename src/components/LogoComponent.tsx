import { Image } from 'react-native'
import { useColorScheme } from './useColorScheme'

export default function LogoComponent({ styles, Invert=false, Light, Dark } : {styles?:any, Invert?: boolean, Light?: boolean, Dark?: boolean} ) {
  const colorScheme = useColorScheme();

  if(Light === undefined && Dark == undefined){
    Light = colorScheme === 'light' ? (Invert ? false : true) : (Invert ? true : false)
    Dark = colorScheme === 'dark' ? (Invert ? false : true) : (Invert ? true : false)
  }
 
  if(Light){
    return (
      <Image 
          source={require( '@assets/icons/Logo.png')} 
          style={styles} 
        />
    )
  };

  if(Dark){
    return(
      <Image 
          source={require( '@assets/icons/Logo_Alt.png')} 
          style={styles} 
        />
    )
  }

}
