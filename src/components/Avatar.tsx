import { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, Platform, ActivityIndicator, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '@/util/supabase'
import { View } from './Themed'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import RemoteImage from './RemoteImage'
import { useColorScheme } from './useColorScheme'
import { SelectAndUploadImage } from '@/util/upload'

interface Props {
  url: string | null
  size?: number
  onUpload: (filepath: string) => void
  StorageBucket: string 
}


export default function Avatar ({ url, size = 150, onUpload, StorageBucket }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false) 
  const avatarSize = { height: size, width: size }
  const colorScheme = useColorScheme();  

  useEffect(() => {  
    if ( url === '' || !url) {
      return
    } 
    
    (async () => {
      setLoadingImage(true)
      setAvatarUrl('');
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(url);
  
      if (error) {
        console.log(error);
      }
  
      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setAvatarUrl(fr.result as string);
        };
      }
      setLoadingImage(false)
    })()

  }, [url]);



  const uploadAvatar = async () => {
    setUploading(true)

    const result = await SelectAndUploadImage({RootBucket: 'avatars', FolderName: StorageBucket});    
    if( result?.error){
      console.log('Error uploading Avatar image', result.error);
    }

    if(result?.imagePath){
      onUpload(result.imagePath)
      setAvatarUrl(result.imagePath)
    }


    setTimeout(() => {
      setUploading(false)
    }, 50);
  }


  return (
    
    <View style={styles.avatarContainer}>
      <View style={[shadow({colorScheme:colorScheme!}).shadow, { borderRadius: size / 2 }]}> 

      {
        avatarUrl 
        ?
          ( loadingImage 
            ? <ActivityIndicator size={'large'} color={Colors.brand[500]} />
            : <Image
                source={{ uri: avatarUrl}}
                style={[avatarSize, styles.avatar, styles.image, { borderRadius: size / 2 }]} 
              />
          )
        :
          <RemoteImage 
            path={null} 
            style={[avatarSize, styles.avatar, styles.image, { borderRadius: size / 2 }]} 
          />
      }
      </View>

      <View>
        <Pressable 
          onPress={uploadAvatar} 
          disabled={uploading} 
          style={[
            {
              marginTop: -(size / 4),
              right: -(size/3),
              backgroundColor: uploading ? Colors.brand[100] : Colors.brandAlt[200],
            },
            styles.uploadButton,
          ]}
        
        >
          <Ionicons 
            name='cloud-upload-outline' 
            size={16} 
          />
        </Pressable>
      </View>

    </View>      
  )
}

const shadow = ({colorScheme}:{colorScheme?:string}) => StyleSheet.create({
  shadow:{ 
    margin: 0,
    padding:0,
    shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    borderColor: colorScheme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(251,251,251,0.21)',
    borderWidth: 1,
    elevation: 1,
    shadowOffset:  {height: 0.5, width: 0.5},
    shadowOpacity: 0.15,
    shadowRadius:  1,
    backgroundColor: 'rgba(0,0,0,0)',

  }
})


const styles = StyleSheet.create({
  avatarContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  avatar: {
    borderWidth: 1,
    borderColor: Colors.placeholderText,
    overflow: 'hidden',
    maxWidth: '100%',
    // margin: 4,
  },
  image: {
    objectFit: 'cover',
  },
  uploadButton:{
    // backgroundColor: Colors.brandAlt[200],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
})