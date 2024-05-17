import { useEffect, useState } from 'react'
import { Image, StyleSheet, Platform, ActivityIndicator, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '@/util/supabase'
import { View } from './Themed'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import RemoteImage from './RemoteImage'
import { useColorScheme } from './useColorScheme'

interface Props {
  size: number
  url: string | null
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
    if(url) downloadImage(url)
  },[url])


  // Set loading for images to download -UX
  const downloadImage = async (path: string) => {
    // console.log('path/url', path);
    
    try{
      setLoadingImage(true)
      const {data, error} = await supabase.storage.from('avatars').download(path)
      // const {data, error} = await supabase.storage.from('avatars').download(path)

      if (error) throw error

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload= () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if( error instanceof Error) {
        console.log('Error downloading image:', {error});
      }
    } finally {
      setLoadingImage(false)
    }
  }

    
  const uploadAvatar = async () => {
    const currentPlatform = Platform.OS

      // For use on mobile devices
      try {
        setUploading(true)

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: false,
          allowsEditing: true,
          quality: 1,
          exif: false,
        })

        if (result.canceled || !result.assets || result.assets.length === 0) {
          console.log('User cancelled image picker');
          return
        }

        
        const image = result.assets[0]
        // console.log('Got Image:', image);
        
        if (!image.uri) {
          throw new Error('No image uri!') // should not happen, but just in case.
        }

        if (currentPlatform === 'web') {
          //  for use on web
          const webImage = await fetch(image.uri)
          const blob = await webImage.blob();
          const fileExt = image.fileName?.split('.').pop()?.toLowerCase() ?? 'jpeg'
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(`${StorageBucket}/${filePath}`, blob)

          if (uploadError) {
            throw uploadError
          }
          onUpload(filePath)

        } else {
          // For Mobile devices
          const arrayBuffer = await fetch(image.uri).then((res) => res.arrayBuffer())

          const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
          const path = `${Date.now()}.${fileExt}`
  
  

          const { data, error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(`${StorageBucket}/${path}`, arrayBuffer, {
              contentType: image.mimeType ?? 'image/jpeg',
            })
            
            if (uploadError) {
              throw uploadError
            }
            
          onUpload(data.path)
        }

      } catch (error) {
        if(error instanceof Error){
          console.log('1111', {error});
          
          alert(error.message)
        } else {
          console.log('2222', {error});

          throw error
        }
      } finally {
        setUploading(false)
      }
    
  }

  return (
    <View style={styles.avatarContainer}>
      { avatarUrl ? 
      (
        <>
        {loadingImage ? (
          <ActivityIndicator style={avatarSize} />
        ) : (
          <Image 
            source={{ uri: avatarUrl}}
            accessibilityLabel='Avatar'
            style={[avatarSize, styles.avatar, styles.image,  {borderRadius: size /2}]}
          />
         )}
          </>
      ) :(
        <View style={
          [
            styles.avatar, 
            styles.noImage, 
            shadow({colorScheme: colorScheme!}).shadow, 
            {
              borderRadius: size /2,
              // height: avatarSize.height/2,
            }
          ]}>
          <RemoteImage path={null} style={[avatarSize, styles.avatar, styles.noImage, {borderRadius: size /2 }]} />
        </View>
      )}

      <View>
        <Pressable 
          onPress={uploadAvatar} 
          disabled={uploading} 
          style={[
            styles.uploadButton,
            {
              marginTop: -(size / 4),
              right: -(size/3),
            }
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
    shadowColor: colorScheme === 'light' ? Colors.light.shadow : Colors.dark.shadow,
    borderColor: colorScheme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(251,251,251,0.21)',
    backgroundColor: colorScheme === 'light' ? 'rgba(0,0,0, 0.1)' : 'rgba(251,251,251,0.21)',
    elevation: 1,
    shadowOffset:  {height: 2, width: 2},
    shadowOpacity: 0.25,
    shadowRadius:  1.5,
  }
})


const styles = StyleSheet.create({
  avatarContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    // borderRadius: 5,
    overflow: 'hidden',
    maxWidth: '100%',
  },
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    // backgroundColor: '#333',
    // backgroundColor: 'rgba(0,0,0, 0.1)',
    borderWidth: 1,
    // borderStyle: 'solid',
    // borderColor: 'rgb(200, 200, 200',
    // borderRadius: 5,
  },
  uploadButton:{
    backgroundColor: Colors.brandAlt[200],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
})