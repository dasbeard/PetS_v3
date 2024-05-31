import { StyleSheet } from 'react-native'
import { Text, View } from './Themed';
import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet'
import { useColorScheme } from './useColorScheme';
import Colors from '@/constants/Colors';

import DateTimePicker, { DateType, ModeType} from 'react-native-ui-datepicker'

import Spacer from './Spacer';
import Button from './Buttons/StyledButton';
import dayjs from 'dayjs';

export interface DateSelectionProps {
  Data: any | null;
  SetData: ({}:any) => void;
  OnSave: () => void;
  SheetChanges: (index: number) => void;
  HeaderText: string;
  Mode: 'single' | 'range'
}

interface DateRangeProps {
  startDate: DateType;
  endDate: DateType;
}

type Ref = BottomSheet;

const DateSelectionBottomSheet = forwardRef<Ref, DateSelectionProps>(({Data, SetData, OnSave, SheetChanges, HeaderText, Mode}, ref) => {
  const colorScheme = useColorScheme();
  const snapPoints = useMemo(() => ['75%'], [])
  const renderBackdrop = useCallback(
		(props:any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);

  const [mode, setMode] = useState<ModeType | undefined>(Mode);
  const [date, setDate] = useState<DateType | undefined>();
  const [range, setRange] = useState<DateRangeProps>({ startDate: undefined, endDate: undefined });

  // const handleInitialDateSet = () => {
  //   if( Mode === 'single'){
  //     setDate(Data)
  //   } else if (Mode === 'range'){
  //     setRange(Data)
  //   }
  // }

  const onDateSelection = useCallback(
    (params: any) => {      
      if (mode === 'single') {
        SetData(params.date);
      } else if (mode === 'range') {
        // Not tested
        SetData(params);
      }
    },
    [mode]
  );

  // const onChangeMode = useCallback(
  //   (value: ModeType) => {
  //     setDate(undefined);
  //     setRange({ startDate: undefined, endDate: undefined });
  //     setMode(value);
  //   },
  //   [setMode, setDate, setRange]
  // );

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onChange={(index) => SheetChanges(index)}
      backgroundStyle={{
        backgroundColor: colorScheme === 'light' ? Colors.light.background : Colors.dark.view, 
      }}
    >
      <BottomSheetView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{HeaderText}</Text>
      </View>
      <Spacer Size={4} />

      <View style={styles.topContainer}> 


        <DateTimePicker
          mode='single'
          date={Data}
          locale={'en'}
          minDate={dayjs().startOf('day')}
          onChange={onDateSelection}
        />  



      </View>

      <View style={styles.bottomContainer}>
        {/* <Text style={{ flex: 1}}>
          {Data ? (
            dayjs(Data).format('MMMM, DD, YYYY')
            ):(
            '...'
            )}
        </Text> */}
      
        <View style={{ flex: 1}}>
          <Button Text='Set Date' onPress={OnSave}/>
        </View>
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
    borderColor: Colors.brand[200]
  },
  headerText:{
    textAlign: 'center',
    fontSize: 20,
  },
  topContainer: {
    flexGrow: 1,
    // flexDirection: 'row',
    // gap: 8,
  },
  bottomContainer:{
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:1,
    // borderColor: 'green',
  },
})


export default DateSelectionBottomSheet;
