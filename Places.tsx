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
import { Place } from './types';

const db = SQLite.openDatabaseSync('placesdb');

export default function PlacesScreen() {

    useDrizzleStudio(db);

    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [places, setPlaces] = useState<Place[]>([]);

    const initialize = async () => {
        try {
            await db.execAsync(`
        CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, address TEXT, latitude REAL, longitude REAL);
        `);
            handleFetch();
        } catch (error) {
            console.error('Could not open database', error);
        }
    }

    const handleSave = async () => {
        try {
            await db.runAsync('INSERT INTO places (address, latitude, longitude) VALUES (?, ?, ?)', address, latitude, longitude);
            setAddress('');
            setLatitude(null);
            setLongitude(null);
            handleFetch();
        } catch (error) {
            console.error('Could not add item', error);
        }
    }

    const handleFetch = async () => {
        try {
            const list = await db.getAllAsync('SELECT * from places');
            setPlaces(list as Place[]);
        } catch (error) {
            console.error('Could not get items', error);
        }
    }

    const handleDelete = async (id: number) => {
        try {
            await db.runAsync('DELETE FROM places WHERE id=?', id);
            await handleFetch();
        }
        catch (error) {
            console.error('Could not delete item', error);
        }
    }

    useEffect(() => { initialize() }, []);

    return (

        <View style={styles.container}>

            <Text variant='titleLarge'>Placefinder</Text>

            <TextInput
                style={styles.input}
                mode='outlined'
                label='address'
                onChangeText={text => setAddress(text)}
                value={address}
                outlineColor="#B0BEC5"
                activeOutlineColor="#2E7D6B"
                outlineStyle={{ borderRadius: 12 }}
            />

            <View style={styles.buttons}>
                <Button
                    mode='contained'
                    icon='plus'
                    onPress={handleSave}
                >
                    Add
                </Button>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30,
        gap: 10,
    },
    input: {
        width: 250,
    },
    buttons: {
        width: 250,
        marginTop: 10,
    },
    card: {
        flex: 1,
        width: '90%',
        marginTop: 20,
    },
    empty: {
        textAlign: 'center',
        margin: 24,
    },
});