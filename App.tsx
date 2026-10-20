import { StatusBar } from 'expo-status-bar';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from './Map';
import PlacesScreen from './Places';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#2E7D6B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#BFEBDD',
    onPrimaryContainer: '#00201A',
    secondaryContainer: '#CDE8DF',
    background: '#F7FAF8',
    surface: '#FFFFFF',
    surfaceVariant: '#DCE8E2',
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level1: '#F1F6F3',
      level2: '#EAF1ED',
      level3: '#E3ECE7',
    },
  },
};

export default function App() {

  return (

    <PaperProvider theme={theme}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Places" component={PlacesScreen} options={{ title: 'My Places' }} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="dark" />

    </PaperProvider>
  );
}
