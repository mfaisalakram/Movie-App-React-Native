import React from 'react'
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    FlatList
} from 'react-native';
import { Color } from 'types';

import { AntDesign } from '@expo/vector-icons';
import { POSTER_BASE_URL } from 'config';
import { useNavigation } from '@react-navigation/native';

const SearchItem = ({ item: { poster_path, title, vote_average, id } }: any) => {

    // const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.movieItem} key={id} onPress={() => { console.log('pressssssss') }}>
            <Image
                source={{
                    uri: `${POSTER_BASE_URL}${poster_path}`,
                }}
                style={styles.actorImage}
            />
            <View style={{ position: 'absolute', bottom: 5, left: 10 }}>
                <Text style={{ backgroundColor: Color.yellow1, width: 40, paddingHorizontal: 2 }}>{vote_average} <AntDesign name="star" size={12} color="black" /></Text>
                <Text style={styles.movieTitleText}>{title}</Text>
                <View style={{ flexDirection: 'row', overflow: 'hidden' }}><Text style={styles.genersText}>#Family</Text><Text style={styles.genersText}>#Horror</Text></View>
            </View>
        </TouchableOpacity>
    )
}

export default SearchItem;

const styles = StyleSheet.create({

    movieItem: { marginTop: 20, marginHorizontal: 10, },
    actorImage: {
        width: 140,
        height: 160,
    },
    movieTitleText: { color: Color.white, fontWeight: 'bold', fontSize: 15, width: 50, },
    genersText: { color: Color.white },
});
