import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Search: undefined;
  Weather: undefined;
};

export type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;
export type WeatherScreenRouteProp = RouteProp<RootStackParamList, 'Weather'>;

export type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;
export type WeatherScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Weather'
>;

export type SearchProps = {
  route: SearchScreenRouteProp;
  navigation: SearchScreenNavigationProp;
};

export type WeatherProps = {
  route: WeatherScreenRouteProp;
  navigation: WeatherScreenNavigationProp;
};
