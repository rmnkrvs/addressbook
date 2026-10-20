import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Places: undefined;
  Map: { address: string; latitude: number; longitude: number };
};

export type Place = {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;