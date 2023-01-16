
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, Text, ActivityIndicator, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { Color } from 'types';
import { API_KEY, POSTER_BASE_URL } from 'config';
import { SharedElement } from 'react-native-shared-element';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

const PersonDetail = () => {
    const routes = useRoute();
    const params = routes?.params;
    const [personDetail, setPersonDetail] = useState<any>({});
    const [movies, setMovies] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [loader, setLoader] = useState(false);
    const navigation = useNavigation();


    const getDetail = async (id: any) => {
        try {
            setLoader(true);
            const response = await axios.get(
                `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`
            );
            if (response.data) {
                setLoader(false);
                setPersonDetail(response.data);
            } else {
                setLoader(false);
            }
        } catch (err) {
            setLoader(false);
        }
    };

    const getAllMovies = async () => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${1}`)
            if (res.data) {
                setMovies(res?.data?.results)
            } else {
                setMovies([])
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getImages = async (person_id: any) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/person/${person_id}/images?api_key=${API_KEY}`)
            if (res.data) {
                setProfiles(res?.data?.profiles)
            } else {
                setProfiles([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDetail(params?.id);
        getAllMovies();

        console.log(params?.id)
    }, [params?.id])

    useEffect(() => {
        getImages(params?.id)
    }, [params?.id])


    const ProfliesList = ({ filepath }: any) => (<View>
        <View style={{ marginHorizontal: 10, width: 130, height: 160, borderRadius: 4, }}>
            <Image source={{ uri: `${POSTER_BASE_URL}${filepath}` }} style={{ width: '100%', height: '100%', borderRadius: 4, }} />
        </View>
    </View>)


    return (
        <View style={[styles.root]}>
            {
                loader ? (
                    <ActivityIndicator
                        size={'large'}
                        color={Color.purple2}
                        style={{ top: '50%' }} />
                ) : (
                    <>
                        <SharedElement
                            style={[
                                {
                                    flex: 1,
                                    borderBottomLeftRadius: 35,
                                    borderBottomRightRadius: 35,
                                    overflow: 'hidden',
                                },
                            ]}
                            id={`item.${params?.name}.card`}
                        >
                            <Image
                                source={{ uri: `${POSTER_BASE_URL}${personDetail?.profile_path}` }}
                                resizeMode="cover"
                                style={styles.img}
                            />
                            <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20 }} onPress={() => navigation.goBack()}>
                                <AntDesign name="left" size={30} color={Color.purple2} style={{ fontWeight: 'bold', backgroundColor: Color.purple1, borderRadius: 5, padding: 3 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => navigation.navigate('Search')}>

                                <Feather name="search" size={30} color={Color.purple2} style={{ fontWeight: 'bold', backgroundColor: Color.purple1, borderRadius: 5, padding: 3 }} />
                            </TouchableOpacity>

                            <View style={{ position: 'absolute', bottom: 10, left: 20 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={styles.departmentText}>{personDetail?.known_for_department}</Text>
                                </View>
                                <Text style={styles.titleText}>
                                    {personDetail?.name}
                                </Text>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    {personDetail?.birthday && <TouchableOpacity style={styles.genresTouch}>
                                        <Text style={styles.genresText}>{moment(personDetail?.birthday).format('MMMM DD, YYYY')} | {personDetail?.place_of_birth}</Text>
                                    </TouchableOpacity>}
                                </View>

                            </View>
                        </SharedElement>

                        <ScrollView style={styles.container}>
                            <View style={styles.summaryView}>
                                <Text style={styles.summaryHeading}>
                                    <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                                    More Images
                                </Text>
                                <ScrollView contentContainerStyle={{ flexDirection: 'row' }}>
                                    <FlatList
                                        data={profiles}
                                        renderItem={({ item }) => <ProfliesList filepath={item?.file_path} />}
                                        keyExtractor={item => item?.file_path}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </ScrollView>


                            </View>

                            {personDetail?.biography && <View style={styles.summaryView}>
                                <Text style={styles.summaryHeading}>
                                    <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                                    Biography
                                </Text>
                                <Text style={styles.summaryText}>{personDetail?.biography}</Text>
                            </View>}

                            <View style={styles.summaryView}>
                                <Text style={styles.summaryHeading}>
                                    <FontAwesome name="pause" size={12} color={Color.purple2} /> You
                                    May Like
                                </Text>
                                {movies?.map((item, index) => (
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginVertical: 10
                                        }}
                                        key={index}
                                        onPress={() => { navigation.navigate('Detail', item) }}
                                    >
                                        <View style={{ flexDirection: 'row' }}>
                                            <Image
                                                source={{
                                                    uri: `${POSTER_BASE_URL}${item?.poster_path}`,
                                                }}
                                                resizeMode="cover"
                                                style={{ width: 80, height: 80, marginRight: 10 }}
                                            />
                                            <View>
                                                <Text style={{ color: Color.white, width: 120 }}>{item?.title}</Text>
                                                <Text style={{ color: Color.gray2 }}>
                                                    #Family #Horror #Drama
                                                </Text>
                                            </View>
                                        </View>

                                        <View>
                                            <Text style={styles.movieRaiting}>
                                                {item?.vote_average} <AntDesign name="star" size={12} color="black" />
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </ >
                )}
        </View>
    )
}



export default PersonDetail;

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: Color.purple1, padding: 2 },
    container: {
        flex: 1,
        backgroundColor: Color.purple1
    },
    heading: {
        color: Color.white,
    },
    img: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    slider: {
        flex: 1,
        backgroundColor: Color.purple1,
    },
    titleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 21,
        marginVertical: 10,
    },
    departmentText: {
        backgroundColor: Color.purple2,
        color: Color.white,
        fontSize: 12,
        fontWeight: 'bold',
        marginHorizontal: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 2,
    },
    yearRaiting: {
        backgroundColor: Color.yellow1,
        color: Color.black1,
        marginHorizontal: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 2,
    },
    genresTouch: {
        paddingVertical: 2,
        borderRadius: 5,
    },
    genresText: {
        color: 'gray',
        fontSize: 14,
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
    actorCard: {
        marginHorizontal: 10,
    },
    actorImage: {
        width: 100,
        height: 120,
    },
    actorDepartmentText: {
        color: Color.purple2,
    },
    actorNameText: {
        color: Color.white,
    },
    movieRaiting: {
        backgroundColor: Color.yellow1,
        color: Color.black1,
        marginHorizontal: 5,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 2,
        width: 'auto',
    },

});