import React, { FC, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { CITY_API_KEY } from 'react-native-dotenv';

import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import Place from '../Components/Place';
import { IResultAPI } from '../Types';
import { SearchProps } from '../Types/navigation';
import { colors } from '../Utils';

const BASE_PLACE_URL = `https://api.opencagedata.com/geocode/v1/json?`;

const {
  container,
  row,
  input,
  btn,
  title,
  subTitle,
  btnText,
  loadingContainer,
} = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.BORDER_COLOR,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginVertical: 8,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  btn: {
    backgroundColor: colors.PRIMARY_COLOR,
    fontSize: 20,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    flex: 1,
  },
});

const Search: FC<SearchProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [previousSearches] = useState<IResultAPI[]>([
    {
      geometry: { lat: 0, lng: 0 },
      components: {
        state_code: 'RJ',
        town: 'Rio',
        state: 'Rio de Janeiro',
        country: 'Brazil',
      },
    },
  ]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!search || search === '') {
      alert('Você precisa preencher o campo de busca!');
      setIsLoading(false);
      return;
    }

    const weatherURL = `${BASE_PLACE_URL}key=${CITY_API_KEY}&q=${search}`;

    try {
      const response = await fetch(weatherURL);

      const result = await response.json();

      const places: IResultAPI[] = result.results.map(
        ({
          // eslint-disable-next-line camelcase
          components: { country, state, state_code, city, town, hamlet },
          geometry: { lat, lng },
        }: IResultAPI) => ({
          components: {
            country,
            state,
            state_code,
            town: city || town || hamlet,
          },
          geometry: { lat, lng },
        })
      );

      if (response.ok) {
        navigation.navigate('Places', { places, search });
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert(result.status.message);
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleLocate = async () => {
    setIsLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Access to location is needed to run the App.');
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      navigation.navigate('Weather', { latitude, longitude });
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const handleShowWeather = (latitude: number, longitude: number) =>
    navigation.navigate('Weather', { latitude, longitude });

  if (isLoading)
    return (
      <View style={loadingContainer}>
        <StatusBar style="auto" />
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
      </View>
    );

  return (
    <View style={container}>
      <Text style={title}>Type your location here:</Text>
      <TextInput
        style={input}
        placeholder="City"
        onChangeText={(text) => setSearch(text)}
        defaultValue={search}
      />
      <View style={row}>
        <Pressable style={btn} onPress={handleSubmit}>
          <Text style={btnText}>Submit</Text>
        </Pressable>
        <Pressable style={btn} onPress={handleLocate}>
          <MaterialIcons name="gps-fixed" size={20} color="white" />
        </Pressable>
      </View>
      <Text style={subTitle}>Previous Searches</Text>
      {previousSearches.map((p) => (
        <Place key={JSON.stringify(p)} place={p} to={handleShowWeather} />
      ))}
    </View>
  );
};

export default Search;
