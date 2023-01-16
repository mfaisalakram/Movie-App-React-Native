import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import { Color } from 'types';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_KEY, POSTER_BASE_URL } from 'config';
import { SafeAreaView } from 'react-native-safe-area-context';

const TvShows = () => {
    const navigation = useNavigation();
    const [tvShows, setTvShows] = useState([]);
    const [topRatedTvShows, setTopRatedTvShows] = useState([]);
    const [tvShowsOnTheAir, setTvShowsOnTheAir] = useState([]);
    const [loader, setLoader] = useState(false);
    const render = 1;

    let page = Math.floor(Math.random() * 10);



    const getTvShows = async (page: any) => {
        try {
            setLoader(true);
            const res = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en&page=${page}&include_adult=false&append_to_response=videos`)
            if (res.data) {
                setTvShows(res?.data?.results);
                setLoader(false);
            } else {
                setTvShows([])
                setLoader(false);
            }
        } catch (error) {
            console.log(error)
            setLoader(false);
        }
    }





    const getTopRatedTvShows = async () => {
        try {
            setLoader(true);
            const res = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`)
            if (res.data) {
                setTopRatedTvShows(res?.data?.results)
            } else {
                setTopRatedTvShows([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTvShowsOnTheAir = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${1}`)
            if (res.data) {
                setTvShowsOnTheAir(res?.data?.results)
            } else {
                setTvShowsOnTheAir([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     getTvShows(page);
    // }, [render])

    // useEffect(() => {
    //     getTopRatedTvShows();
    // }, [render])

    useEffect(() => {
        getTvShowsOnTheAir();
        getTopRatedTvShows();
        getTvShows(page);

    }, [render])


    const Item = ({ image, name, raiting, id, overview }: any) => (
        <TouchableOpacity style={styles.singleView} key={id} onPress={() => navigation.navigate('Detail', { id, tv: true })}>
            <Image source={{ uri: `${POSTER_BASE_URL}${image}` }} style={{ width: '100%', height: '100%' }} blurRadius={0} />

            <View style={styles.absoluteiew}>

                <Text style={styles.raiting}>  {(Math.round(raiting * 100) / 100).toFixed(1)} <AntDesign name="star" size={12} color="black" />

                </Text>

                <Text style={styles.titleText}>
                    {name}
                </Text>

                <Text style={styles.genresText} numberOfLines={2}>{overview}</Text>

            </View>
        </TouchableOpacity>
    )


    const ItemOnAir = ({ image, name, raiting, id, first_air_date }: any) => (
        <TouchableOpacity style={styles.singleViewVertical} key={id} onPress={() => navigation.navigate('Detail', { id, tv: true })}>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 80, height: 100, marginRight: 20, borderRadius: 4, borderColor: Color.purple2, borderWidth: 2 }}>
                    <Image source={{ uri: `${POSTER_BASE_URL}${image}` }} style={{ width: '100%', height: '100%', borderRadius: 4, }} blurRadius={0} />
                </View>
                <View>
                    <Text style={styles.titleText}>
                        {name}
                    </Text>
                    <Text style={styles.titleTextGerers}>{first_air_date}</Text>
                </View>
            </View>

            <View >

                <Text style={styles.raiting}>  {(Math.round(raiting * 100) / 100).toFixed(1)} <AntDesign name="star" size={12} color="black" />
                </Text>
            </View>
        </TouchableOpacity>
    )


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="left" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Feather name="search" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                </TouchableOpacity>
            </View>

            {loader ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator
                    size={'large'}
                    color={Color.purple2}
                    style={{ marginTop: '50%' }}
                />


                </View> :
                <>

                    <View style={styles.summaryView}>
                        <Text style={styles.summaryHeading}>
                            <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                            Tv Shows
                        </Text>
                        <FlatList
                            data={tvShows}
                            renderItem={({ item }) => <Item image={item?.poster_path} raiting={item?.vote_average} name={item?.name} id={item?.id} overview={item?.overview} />}
                            keyExtractor={item => item?.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View style={styles.summaryView}>
                        <Text style={styles.summaryHeading}>
                            <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                            Tranding Tv Shows
                        </Text>
                        <FlatList
                            data={topRatedTvShows}
                            renderItem={({ item }) => <Item image={item?.poster_path} raiting={item?.vote_average} name={item?.name} id={item?.id} overview={item?.overview} />}
                            keyExtractor={item => item?.id}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>

                    <View style={styles.summaryView}>
                        <Text style={styles.summaryHeading}>
                            <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                            Tv Shows on the air
                        </Text>

                        <FlatList
                            data={tvShowsOnTheAir}
                            renderItem={({ item }) => <ItemOnAir image={item?.poster_path} raiting={item?.vote_average} name={item?.name} id={item?.id} overview={item?.overview} first_air_date={item?.first_air_date} />}
                            keyExtractor={item => item?.id}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>


                </>
            }
        </ScrollView>
    )
}

export default TvShows;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.purple1
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        justifyContent: 'space-between',
        backgroundColor: Color.purple1
    },
    summaryView: {
        margin: 20,
        flex: 1,
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
    singleView: { width: 230, height: 250, backgroundColor: 'gray', marginRight: 10 },
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
        fontSize: 12,
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