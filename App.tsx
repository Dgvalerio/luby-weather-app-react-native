/* eslint-disable react/style-prop-object */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import ReloadIcon from './components/ReloadIcon';
import UnitsPicker from './components/UnitsPicker';
import WeatherInfo from './components/WeatherInfo';
import { IWeather } from './types';
import { colors } from './utils';

const WEATHER_API_KEY = 'b7a0b7b764dc839c05ce7495d53c99e4';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1,
  },
});

const App: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [currentWeather, setCurrentWeather] = useState<IWeather | null>();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const load = useCallback(async () => {
    setCurrentWeather(null);
    setErrorMessage(null);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMessage('Access to location is needed to run the App.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherURL = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=${unitSystem}`;

      const response = await fetch(weatherURL);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [unitSystem]);

  useEffect(() => {
    load();
  }, [load]);

  if (errorMessage)
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    );
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
    </View>
  );
};

export default App;
