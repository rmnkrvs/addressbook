import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import {
    TextInput,
    Button,
    List,
    Divider,
    Text,
    Card,
    useTheme,
} from 'react-native-paper';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

import * as Location from 'expo-location';

import * as SQLite from 'expo-sqlite';
import { Place, RootStackScreenProps } from './types';

const db = SQLite.openDatabaseSync('placesdb');

export default function PlacesScreen({ navigation }: RootStackScreenProps<'Places'>) {

    useDrizzleStudio(db);

    const theme = useTheme();


    const [address, setAddress] = useState('');
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
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                Alert.alert('Location permission is needed to look up addresses');
                return;
            }

            const results = await Location.geocodeAsync(address);

            if (results.length === 0) {
                Alert.alert('Address not found');
                return;
            }

            const { latitude, longitude } = results[0];

            await db.runAsync('INSERT INTO places (address, latitude, longitude) VALUES (?, ?, ?)', address, latitude, longitude);
            setAddress('');
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
                    disabled={!address.trim()}
                >
                    Save
                </Button>
            </View>

            <Card mode='contained' style={styles.card}>
                <FlatList
                    data={places}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={Divider}
                    ListEmptyComponent={
                        <Text style={styles.empty}>No saved places yet</Text>
                    }
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.address}
                            titleNumberOfLines={1}
                            onPress={() => navigation.navigate('Map', { address: item.address, latitude: item.latitude, longitude: item.longitude })}
                            onLongPress={() => handleDelete(item.id)}
                            right={() => (
                                <View style={styles.right}>
                                    <Text style={[styles.hint, { color: theme.colors.onSurfaceVariant }]}>
                                        show on map
                                    </Text>
                                    <List.Icon icon="chevron-right" />
                                </View>
                            )}
                        />
                    )}
                />
            </Card>

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
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hint: {
        fontSize: 14,
    },
});