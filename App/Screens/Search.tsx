import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { CITY_API_KEY } from 'react-native-dotenv';

import { MaterialIcons } from '@expo/vector-icons';

import PreviousCity from '../Components/PreviousCity';
import { ICity } from '../Types';
import { SearchProps } from '../Types/navigation';
import { colors } from '../Utils';

const BASE_PLACE_URL = `https://api.opencagedata.com/geocode/v1/json?`;

const { container, row, input, btn, title, subTitle, btnText } =
  StyleSheet.create({
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
  });

const Search: FC<SearchProps> = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [previousCities] = useState<ICity[]>([
    { city: 'Rio', state: 'RJ', country: 'Brazil' },
    { city: 'Santo', state: 'RJ', country: 'Brazil' },
  ]);

  const handleSubmit = async () => {
    if (!search || search === '') {
      alert('Você precisa preencher o campo de busca!');
      return;
    }

    const weatherURL = `${BASE_PLACE_URL}key=${CITY_API_KEY}&q=${search}`;

    try {
      const response = await fetch(weatherURL);

      const result = await response.json();

      if (response.ok) {
        navigation.navigate('Places');
      } else {
        alert(result.status.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLocate = () => {
    navigation.navigate('Weather');
  };

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
      {previousCities.map((c) => (
        <PreviousCity key={JSON.stringify(c)} city={c} />
      ))}
    </View>
  );
};

export default Search;
