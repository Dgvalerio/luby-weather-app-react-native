import React, { FC, useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WEATHER_API_KEY } from 'react-native-dotenv';

import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import ReloadIcon from '../Components/ReloadIcon';
import UnitsPicker from '../Components/UnitsPicker';
import WeatherDetails from '../Components/WeatherDetails';
import WeatherInfo from '../Components/WeatherInfo';
import { IWeather } from '../Types';
import { colors } from '../Utils';

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

const Weather: FC = () => {
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
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMessage}</Text>
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
        <WeatherDetails
          currentWeather={currentWeather}
          unitSystem={unitSystem}
        />
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

export default Weather;
