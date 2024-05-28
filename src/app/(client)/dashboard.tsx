import { StyleSheet, View as RNView } from 'react-native'
import { View, Text } from '@/components/Themed'
import ChildComponent from '@/components/ChildComponent';
import { useEffect, useRef, useState } from 'react';
import { CustomBottomSheet } from '@/components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Button from '@/components/Buttons/StyledButton';
import { SelectAndUploadImage } from '@/util/upload';
import Avatar from '@/components/Avatar';
import RemoteImage from '@/components/RemoteImage';

// import {SelectAndUploadImage} from '/src/util/upload'

export default function ClientDashboard() {
  
  const [FilePath, setFilePath] = useState<string>('')
  const [FilePath2, setFilePath2] = useState<string>('ef4d7b96-853a-4e80-8b59-112c88db7bba/pets/1716402226563.jpg')
  
  // const handleUpload = () => {
  //   SelectAndUploadImage({RootBucket:'avatars', FolderName:'testing'})
  
  // }

  // useEffect(() => {
  //   setFilePath('ef4d7b96-853a-4e80-8b59-112c88db7bba/pets/1716402226563.jpg')
  // },[])


  // ef4d7b96-853a-4e80-8b59-112c88db7bba/1716402194805.jpg
  // ef4d7b96-853a-4e80-8b59-112c88db7bba/1716402194805.jpg
  



   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>

      <Avatar 
        size={150}
        url={FilePath}
        onUpload={(url) => setFilePath(url)}
        StorageBucket='testing2'
      />

      <Avatar 
        size={150}
        url={FilePath2}
        onUpload={(url) => setFilePath2(url)}
        StorageBucket='testing2'
      />

      {/* <RemoteImage
        path={''}
      />

      <RemoteImage
        style={{height: 100, aspectRatio: 1, }}
        path={'ef4d7b96-853a-4e80-8b59-112c88db7bba/pets/1716402226563.jpg'}
      /> */}


      {/* <Button Text='Upload' onPress={handleUpload} /> */}


     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: { 
     flex: 1,
     padding: 12,
     justifyContent: 'center',
   },

 });