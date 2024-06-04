import { StyleSheet } from 'react-native'
import { Text, View } from './Themed';
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet'
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';
import DateTimePicker, { DateType, ModeType} from 'react-native-ui-datepicker'
import Spacer from './Spacer';
import Button from './Buttons/StyledButton';
import dayjs from 'dayjs';

export interface DateSelectionProps {
  Data: any | null;
  SetData: ({}:any) => void;
  // OnSave: () => void;
  SheetChanges?: (index: number) => void;
  HeaderText: string;
  Mode: 'single' | 'range';
  OnButtonPress?: ( data:any | null) => void;
}

interface DateRangeProps {
  startDate: DateType;
  endDate: DateType;
}

type Ref = BottomSheet;

const DateSelectionBottomSheet = forwardRef<Ref, DateSelectionProps>(({Data, SetData,  SheetChanges, HeaderText, Mode, OnButtonPress}, ref) => {
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ['75%'], [])
  const renderBackdrop = useCallback((props:any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
  ),[]);
  const [mode, setMode] = useState<ModeType | undefined>(Mode);
  const [date, setDate] = useState<DateType | undefined>();
  const [range, setRange] = useState<DateRangeProps>({ startDate: undefined, endDate: undefined });
  
  const onDateSelection = useCallback((params: any) => {      
      if (mode === 'single') {
        SetData(params.date);
      } else if (mode === 'range') {
        // Not tested
        SetData(params);
      }
  },[mode]);

  console.log('bottomSheet render');
  

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      // onChange={SheetChanges}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? Colors.light.view : Colors.dark.view, 
      }}
    >
      <BottomSheetView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{HeaderText}</Text>
        </View>

        <Spacer Size={4} />

        <View style={styles.topContainer}> 

        {/* This is only for single selection */}
          <DateTimePicker
            mode='single'
            date={Data}
            locale={'en'}
            minDate={dayjs().startOf('day')}
            onChange={onDateSelection}
            calendarTextStyle={ colorScheme === 'light' ? { color: Colors.light.text}: { color:  Colors.dark.text } }
            selectedItemColor={ colorScheme === 'light' ? Colors.brand[500] : Colors.brand[400] }
            headerTextStyle={ colorScheme === 'light' ? { color: Colors.light.text}: { color:  Colors.dark.text } }
            weekDaysTextStyle={ colorScheme === 'light' ? { color: Colors.light.text}: { color:  Colors.dark.text } }
            headerButtonColor= {colorScheme === 'light' ? Colors.light.text : Colors.dark.text }
          />  

        </View>

        <View style={styles.bottomContainer}>      
          <Button Text='Select Date' onPress={OnButtonPress}/>
        </View>

      </BottomSheetView>
      <Spacer Size={8} />
    </BottomSheet>
  )
})



const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: 12,
  },
  header:{
    height: 45,
    borderBottomWidth: 1,
    borderColor: Colors.brand[200],
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
  },
  topContainer: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0)',

  },
  bottomContainer:{
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  },
})


export default memo(DateSelectionBottomSheet);
