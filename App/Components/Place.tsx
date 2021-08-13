import React, { FC } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { IResultAPI } from '../Types';
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

const Place: FC<{
  place: IResultAPI;
  to: (latitude: number, longitude: number) => void;
}> = ({
  place: {
    components: { town, state_code: state, country },
    geometry: { lat, lng },
  },
  to,
}) => (
  <Pressable style={row} onPress={() => to(lat, lng)}>
    <View style={inside}>
      <Text style={bold}>{town}</Text>
      <Text>
        {state}, {country}
      </Text>
    </View>
    <MaterialCommunityIcons
      name="arrow-right"
      size={24}
      color={colors.PRIMARY_COLOR}
    />
  </Pressable>
);

export default Place;
