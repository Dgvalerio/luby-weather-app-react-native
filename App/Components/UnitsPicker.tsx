import React, { FC } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Picker } from '@react-native-community/picker';

const styles = StyleSheet.create({
  unitSystem: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: -30,
      },
      android: {
        top: 30,
      },
    }),
    left: 20,
    height: 50,
    width: 100,
  },
});

const UnitsPicker: FC<{
  unitSystem: 'metric' | 'imperial';
  setUnitSystem: (value: 'metric' | 'imperial' | any) => void;
}> = ({ unitSystem, setUnitSystem }) => (
  <View style={styles.unitSystem}>
    <Picker
      selectedValue={unitSystem}
      onValueChange={(item) => setUnitSystem(item)}
      mode="dropdown"
      itemStyle={{
        fontSize: 12,
      }}
    >
      <Picker.Item label="C" value="metric" />
      <Picker.Item label="F" value="imperial" />
    </Picker>
  </View>
);

export default UnitsPicker;
