import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import React, { ComponentProps, useEffect, useState } from 'react';
import { supabase } from '@/util/supabase';
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';

type RemoteImageProps = {
  path?: string | null;
  fallback?: string;
} & Omit<ComponentProps<typeof Image>, 'source'>;

const RemoteImage = ({ path, fallback, ...imageProps }: RemoteImageProps) => {
  const colorScheme = useColorScheme();
  const [ loadingImage, setLoadingImage ] = useState<boolean>(true)
  const [image, setImage] = useState(''); 
  
  useEffect(() => {   
    if ( path === '' || !path) {
      return
    } 
    
    (async () => {
      setLoadingImage(true)
      setImage('');
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path!);
  
      if (error) {
        console.log(error);
      }
  
      if (data) {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = () => {
          setImage(fr.result as string);
        };
      }
      setLoadingImage(false)
    })()

  }, [path]);



    if (path === '' || !path || image === '') {
      if(colorScheme === 'light'){
        return <Image source={ require( '@assets/icons/Paw_Icon.png' )} {...imageProps} />;
      } else {
        return <Image source={ require( '@assets/icons/Paw_Icon_Alt.png' )} {...imageProps} />;
      }
    } 

    return(
      <>
        {
          loadingImage 
          ? ( <ActivityIndicator size={'large'} color={Colors.brand[500]} />)
          : 
          <Image source={{ uri: image  }} {...imageProps} />
        }
        
      </>
    )
};


export default RemoteImage;