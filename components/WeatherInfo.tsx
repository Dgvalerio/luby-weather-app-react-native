import React, { FC } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { IWeather } from '../types';
import { colors } from '../utils';

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: 'center',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDescription: {
    textTransform: 'capitalize',
  },
  textPrimary: {
    fontSize: 40,
    color: colors.PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
    color: colors.SECONDARY_COLOR,
    fontWeight: '500',
    marginTop: 10,
  },
});

const WeatherInfo: FC<{ currentWeather: IWeather }> = ({
  currentWeather: {
    main: { temp },
    weather: [details],
    name,
  },
}) => {
  const { icon, main, description } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <View style={styles.weatherInfo}>
      <Text>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.weatherDescription}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
};

export default WeatherInfo;
