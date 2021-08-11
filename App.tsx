import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo, { IWeather } from './components/WeatherInfo';

const WEATHER_API_KEY = 'b7a0b7b764dc839c05ce7495d53c99e4';
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?';

const App = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [currentWeather, setCurrentWeather] = useState<IWeather>();
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const load = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

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
  };

  useEffect(() => {
    load();
  }, []);


  if (!currentWeather) return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.main}>
        <WeatherInfo currentWeather={currentWeather} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    justifyContent: 'center',
    flex: 1
  }
});

export default App;
