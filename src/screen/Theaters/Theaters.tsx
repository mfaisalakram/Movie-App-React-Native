import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Image } from 'react-native';
import { Color } from 'types';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import * as Location from 'expo-location';
import { POSTER_BASE_URL, API_KEY } from 'config';

const Theaters = () => {

    const navigation = useNavigation();
    const [location, setLocation] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);

    const getCurrentLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }


    let text = '';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }


    const list = [
        { id: 1, year: '1994', title: 'The Shawshank Redemption', opened: '24 Hours', url: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg' },
        { id: 2, year: '2010', title: 'Inception', opened: '12 Hours', url: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg' },
        { id: 3, year: '2008', title: 'The Godfather', opened: '24 Hours', url: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg' },
        { id: 4, year: '1991', title: 'The Green Mile', opened: '12 Hours', url: 'https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_UY67_CR0,0,45,67_AL_.jpg' },
        { id: 5, year: '1991', title: 'The Silence of the Lambs', opened: '24 Hours', url: 'https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY67_CR0,0,45,67_AL_.jpg' }
    ]


    const Item = ({ url, name, year, id, opened }: any) => (
        <TouchableOpacity style={styles.singleView} key={id}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Image source={{ uri: `${url}` }} style={{ width: 80, height: 100, marginRight: 20 }} blurRadius={0} />

                <View>
                    <Text style={styles.titleText}>
                        {name}
                    </Text>

                    <Text style={styles.titleTextGerers}>
                        Opened: {opened}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={styles.raiting}>
                    {year}

                </Text>
            </View>
        </TouchableOpacity>
    )


    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Feather name="search" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.summaryView}>
                <Text style={styles.summaryHeading}>
                    <EvilIcons name="location" size={14} color={Color.purple2} />
                    {' '}
                    Current Position
                </Text>
                <TouchableOpacity onPress={() => getCurrentLocation()} style={{ flexDirection: 'row', justifyContent: 'center' }}><Text style={{ color: Color.purple1, backgroundColor: Color.purple2, textAlign: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>Tap to get current location</Text></TouchableOpacity>
                <Text style={{ textAlign: 'center', marginTop: 10, color: Color.white, }}>{text}</Text>
            </View>

            <View style={styles.summaryView}>
                <Text style={styles.summaryHeading}>
                    <MaterialIcons name="location-searching" size={12} color={Color.purple2} />{' '}
                    Near You
                </Text>

                <FlatList
                    data={list}
                    renderItem={({ item }) => <Item url={item?.url} year={item?.year} name={item?.title} id={item?.id} opened={item?.opened} />}
                    keyExtractor={item => item?.id}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </ScrollView>
    )
}

export default Theaters;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.purple1,
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    summaryView: {
        margin: 20,
    },
    summaryHeading: {
        color: Color.white,
        textTransform: 'uppercase',
        marginBottom: 20,
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    summaryText: { color: Color.gray2 },
    singleView: { marginRight: 10, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, },
    singleViewVertical: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    absoluteiew: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    raiting: {
        backgroundColor: Color.yellow1,
        color: Color.black1,
        paddingRight: 2,
        borderRadius: 2,
        alignSelf: 'flex-start',
        fontWeight: 'bold'
    },
    titleText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        marginVertical: 10,
        width: 200,
        letterSpacing: 1,
    },
    titleTextGerers: {
        color: 'gray',
        fontWeight: '600',
        fontSize: 14,
        marginVertical: 10,
        width: 200,
        letterSpacing: 1,
    },
    genresText: {
        color: 'gray',
        fontSize: 13,
        width: 200,

    },
})