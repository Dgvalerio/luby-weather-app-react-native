import React, { FC, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PreviousCity from '../Components/PreviousCity';
import { ICity } from '../Types';
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

const Places: FC<PlacesProps> = () => {
  const [previousCities] = useState<ICity[]>([
    { city: 'Rio', state: 'RJ', country: 'Brazil' },
    { city: 'Santo', state: 'RJ', country: 'Brazil' },
  ]);

  return (
    <View style={container}>
      <Text style={title}>Results for ZZZ</Text>
      {previousCities.map((c) => (
        <PreviousCity key={JSON.stringify(c)} city={c} />
      ))}
    </View>
  );
};

export default Places;
