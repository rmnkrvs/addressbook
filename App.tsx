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
    primary: '#1F5F8B',
    onPrimary: '#FFFFFF',
    primaryContainer: '#CFE5F5',
    onPrimaryContainer: '#0B2A3F',
    secondaryContainer: '#DCE8F0',
    background: '#F4F8FB',
    surface: '#FFFFFF',
    surfaceVariant: '#E3ECF3',
    outline: '#9FB4C4',
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level1: '#E8F0F6',
      level2: '#E1EAF1',
      level3: '#DAE5ED',
    },
  },
};

export default function App() {

  return (

    <PaperProvider theme={theme}>

      <NavigationContainer>
        <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary},
          headerTintColor: theme.colors.onPrimary,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
        >
          <Stack.Screen name="Places" component={PlacesScreen} options={{ title: 'My Places' }} />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <StatusBar style="light" />

    </PaperProvider>
  );
}
