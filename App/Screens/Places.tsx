import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Place from '../Components/Place';
import { PlacesProps } from '../Types/navigation';

const { container, title } = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});

const Places: FC<PlacesProps> = ({
  route: {
    params: { places, search },
  },
  navigation,
}) => {
  const handleShowWeather = (latitude: number, longitude: number) =>
    navigation.navigate('Weather', { latitude, longitude });

  return (
    <View style={container}>
      <Text style={title}>Results for &ldquo;{search}&rdquo;</Text>
      {places.map((p) => (
        <Place key={JSON.stringify(p)} place={p} to={handleShowWeather} />
      ))}
    </View>
  );
};

export default Places;
