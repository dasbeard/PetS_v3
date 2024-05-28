import { StyleSheet, View as RNView } from 'react-native'
import { View, Text } from '@/components/Themed'
import ChildComponent from '@/components/ChildComponent';
import { useRef, useState } from 'react';
import { CustomBottomSheet } from '@/components/CustomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import Button from '@/components/Buttons/StyledButton';
import { SelectAndUploadImage } from '@/util/upload';

// import {SelectAndUploadImage} from '/src/util/upload'

export default function ClientDashboard() {
  
  const [FilePath, setFilePath] = useState<string>('')
  
  const handleUpload = () => {
    SelectAndUploadImage({RootBucket:'avatars', FolderName:'testing'})
  
  }



   return (
     <View style={styles.container}>

      <Text>Client Dashboard</Text>

      <Button Text='Upload' onPress={handleUpload} />


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