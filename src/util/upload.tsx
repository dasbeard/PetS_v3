import { Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "./supabase";

// This will detect if coming from web or moblie device and upload to the selected bucket/ folder path
// Returns the path to the uploaded image

export async function SelectAndUploadImage(
  {
    RootBucket, 
    FolderName, 
    ImageCompression=0.5
  }:{
    RootBucket:string, 
    FolderName:string, 
    ImageCompression?: number
  }) {
  
    // Check if on desktop or mobile
  const isMobile = Platform.OS === 'android' || 'ios'
  
  try {
    const selectionResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      quality: ImageCompression,
      exif: false,
    })

    // Check if user cancels image selection
    if( selectionResult.canceled || !selectionResult.assets || selectionResult.assets.length === 0){
      console.log('User cancelled image selection');
      return
    }

    const image = selectionResult.assets[0]

    if(!image.uri) {
      // should not happen -saftety check
      console.log('Image has no uri');
      throw new Error('Error selecting image')
    }

    // Upload from mobile device
    if(isMobile){
      const arrayBuffer = await fetch(image.uri).then((res) => res.arrayBuffer());
      const fileExtention = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const fileName = `${Date.now()}.${fileExtention}`;

      // upload to stoarge
      const { data: uploadResponse, error: uploadError} = await supabase.storage
        .from(RootBucket)
        .upload(`${FolderName}/${fileName}`, arrayBuffer,{
          contentType: image.mimeType ?? 'image/jpeg',
        })

      // Check for upload error
      if(uploadError) {
        console.log('Error uploading:', uploadError);
        throw new Error(uploadError.message)
      }

      // return the path to the uploaded image
      return (uploadResponse.path)
    
    } else {
      // Uplading from desktop
      const webImage = await fetch(image.uri);
      const blob = await webImage.blob();
      const fileExtension = image.fileName?.split('.').pop()?.toLowerCase() ?? 'jpeg';
      const fileName = `${Math.random()}.${fileExtension}`;

      // Upload to storage
      const { data: uploadResponse, error: uploadError} = await supabase.storage
        .from(RootBucket)
        .upload(`${FolderName}/${fileName}`, blob,{
          contentType: image.mimeType ?? 'image/jpeg',
        })

      // Check for upload error
      if(uploadError) {
        console.log('Error uploading:', uploadError);
        throw new Error(uploadError.message)
      }

      // return the path to the uploaded image
      return (uploadResponse.path)
    }
    
  } catch (error) {
    if(error ||error instanceof Error){
      console.log('Error uploading image:', {Error});
      return {error}
    }    
  }
} 