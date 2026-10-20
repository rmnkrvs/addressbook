import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
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
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import * as SQLite from 'expo-sqlite';

export default function MapScreen() {

    return (
        <View style={styles.container}>
            <Text>Map</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});