import { useEffect, useState } from 'react'
import { Image, StyleSheet, Platform, ActivityIndicator, Pressable } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { supabase } from '@/util/supabase'
import { View, Text } from './Themed'
import Button from './Buttons/StyledButton'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'

interface Props {
  size: number
  url: string | null
  onUpload: (filepath: string) => void
}


export default function Avatar ({ url, size = 150, onUpload }: Props) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false) 
  const avatarSize = { height: size, width: size }
  

  useEffect(() => {
    if(url) downloadImage(url)
  },[url])


  // Set loading for images to download -UX
  const downloadImage = async (path: string) => {
    // console.log('path/url', path);
    
    try{
      setLoadingImage(true)
      const {data, error} = await supabase.storage.from('avatars').download(path)

      if (error) throw error

      const fr = new FileReader()
      fr.readAsDataURL(data)
      fr.onload= () => {
        setAvatarUrl(fr.result as string)
      }
    } catch (error) {
      if( error instanceof Error) {
        console.log('Error downloading image:', error.message);
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
            .upload(filePath, blob)

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
            .upload(path, arrayBuffer, {
              contentType: image.mimeType ?? 'image/jpeg',
            })
            
            if (uploadError) {
              throw uploadError
            }
            
          onUpload(data.path)
        }

      } catch (error) {
        if(error instanceof Error){
          alert(error.message)
        } else {
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
            style={[avatarSize, styles.avatar, styles.image, {borderRadius: size /2}]}
          />
         )}
          </>
      ) :(
        <View style={[avatarSize, styles.avatar, styles.noImage, {borderRadius: size /2}]} />
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
    backgroundColor: '#333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200',
    // borderRadius: 5,
  },
  uploadButton:{
    backgroundColor: Colors.brandAlt[200],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
})