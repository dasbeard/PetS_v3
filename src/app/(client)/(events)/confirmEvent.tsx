import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Button from '@/components/Buttons/StyledButton';
import { NewEventProps } from './createEvent';

interface ConfirmEventProps {
  EventData: NewEventProps;
  OnSave: () => void;
  OnCancel: () => void
}

export default function ConfirmEvent({ EventData, OnSave, OnCancel }: ConfirmEventProps ) {
  // console.log(EventData);

  return (
    <View>
      <Text>ConfirmEvent</Text>

      <Button Text='Save' onPress={OnSave} />
      <Button Text='cancel' onPress={OnCancel} />

    </View>
  )
}

const styles = StyleSheet.create({})