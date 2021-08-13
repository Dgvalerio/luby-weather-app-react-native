import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import { IWeather } from '../Types';
import { colors } from '../Utils';

const styles = StyleSheet.create({
  weatherDetails: {
    marginTop: 'auto',
    margin: 15,
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 10,
  },
  weatherDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherDetailBox: {
    flex: 1,
    padding: 20,
  },
  weatherDetailItems: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  textSecondary: {
    fontSize: 15,
    color: colors.SECONDARY_COLOR,
    fontWeight: '700',
    margin: 7,
  },
});

const WeatherDetails: FC<{
  currentWeather: IWeather;
  unitSystem: 'metric' | 'imperial';
}> = ({
  currentWeather: {
    main: { feels_like: feelsLike, humidity, pressure },
    wind: { speed },
  },
  unitSystem,
}) => {
  const windSpeed =
    unitSystem === 'metric'
      ? `${Math.round(speed)} m/s`
      : `${Math.round(speed)} miles/h`;

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.weatherDetailsRow}>
        <View
          style={{
            ...styles.weatherDetailBox,
            borderRightWidth: 1,
            borderRightColor: colors.BORDER_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <FontAwesome5
              name="temperature-low"
              size={25}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailItems}>
              <Text>Feels Like:</Text>
              <Text>{feelsLike}°</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="water"
              size={30}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailItems}>
              <Text>Humidity:</Text>
              <Text>{humidity}%</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          ...styles.weatherDetailsRow,
          borderTopWidth: 1,
          borderTopColor: colors.BORDER_COLOR,
        }}
      >
        <View
          style={{
            ...styles.weatherDetailBox,
            borderRightWidth: 1,
            borderRightColor: colors.BORDER_COLOR,
          }}
        >
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="weather-windy"
              size={25}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailItems}>
              <Text>Wind Speed:</Text>
              <Text>{windSpeed}</Text>
            </View>
          </View>
        </View>
        <View style={styles.weatherDetailBox}>
          <View style={styles.weatherDetailsRow}>
            <MaterialCommunityIcons
              name="speedometer"
              size={30}
              color={colors.PRIMARY_COLOR}
            />
            <View style={styles.weatherDetailItems}>
              <Text>Pressure:</Text>
              <Text>{pressure} hPa</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeatherDetails;
