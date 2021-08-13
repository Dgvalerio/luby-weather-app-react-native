import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ICity } from '../Types';
import { colors } from '../Utils';

const { row, bold, inside } = StyleSheet.create({
  row: {
    backgroundColor: colors.BORDER_COLOR,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  inside: {
    borderLeftWidth: 2,
    borderLeftColor: colors.PRIMARY_COLOR,
    paddingLeft: 8,
  },
});

const PreviousCity: FC<{ city: ICity }> = ({
  city: { city, state, country },
}) => (
  <View style={row}>
    <View style={inside}>
      <Text style={bold}>{city}</Text>
      <Text>
        {state}, {country}
      </Text>
    </View>
    <MaterialCommunityIcons
      name="arrow-right"
      size={24}
      color={colors.PRIMARY_COLOR}
    />
  </View>
);

export default PreviousCity;
