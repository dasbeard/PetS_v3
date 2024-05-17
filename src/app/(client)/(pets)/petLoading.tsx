import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import RemoteImage from '@/components/RemoteImage';
import { useGetPet } from '@/api/pets';
import Pet from './[petID]';

export default function petLoading() {
  const { petID: petIDString  } = useLocalSearchParams();
  const petID = parseFloat(typeof petIDString === 'string' ? petIDString : petIDString[0])

  const { data, isFetching } = useGetPet(petID);

  function TempLoading() {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return isFetching 
  ? <TempLoading />
  : (<Pet PetID={petID} PetData={data} />)}


const styles = StyleSheet.create({})