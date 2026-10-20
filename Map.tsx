import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, StatusBar } from 'react-native';
import {
    TextInput,
    Button,
    List,
    IconButton,
    Divider,
    Text,
    Card,
    useTheme,
} from 'react-native-paper';

import { RootStackScreenProps } from './types';

export default function MapScreen({ route }: RootStackScreenProps<'Map'>) {

    const { address, latitude, longitude } = route.params;

    return (
        <View style={styles.container}>

            <Text variant='titleLarge'>{address}</Text>
            <Text>Latitude: {latitude}</Text>
            <Text>Longitude: {longitude}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        gap: 8,
    },
});