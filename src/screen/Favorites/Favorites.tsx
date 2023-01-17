import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { Color } from 'types';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { POSTER_BASE_URL } from 'config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMovie } from 'hooks';


const Favorites = () => {

    const navigation = useNavigation();
    const [movies, setMovies] = useState<any>([]);
    const [favoriteArray, setFavoriteArray] = useState<any>([315162, 411, 19995]);
    const { setFavorites } = useMovie()
    const [favorite, setFav] = useState<any>([])
    const [trigger, setTrigger] = useState<any>(false)
    const [loader, setLoader] = useState<any>()

    const displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('favorite');
            if (user) {
                let users = user.split(',').map(Number);
                setFav([...favorite, users])
            } else {
                setFav([]);
            }
        }
        catch (error) {
            console.log({ error });

        }
    }

    const getMovieData = async () => {
        setLoader(true);
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=54ed8b21fd2d7a380faaa388189b382f&language=en-US`)
        if (response.data) {
            let filterarr = response?.data?.results.filter((item: any) => {
                return favorite.toString().includes(item?.id)
            })
            setMovies(filterarr)
            setLoader(false);
        } else {
            setLoader(false)
        }
    }

    const removeFavorite = (id: any) => {
        const index = favorite.indexOf(id);
        if (index > -1) {
            setFavoriteArray(favorite.splice(index, 1))
            getMovieData();
        } else {
            return;
        }
    }



    useEffect(() => {
        displayData();
    }, []);

    useEffect(() => {
        getMovieData();
    }, []);



    // const checkFav = (id) => { return favorite.toString()?.includes((id.toString())); }
    // let arr = []
    // const notFav = (id) => favorite?.filter((dt) => {
    //     if (id != dt) {
    //         arr.push(dt)
    //     }
    //     return (id != dt)
    // });
    // const addFav = (id: Number) => {
    //     let check1 = checkFav(id)
    //     let check = true
    //     if (check1) {
    //         check = false
    //     }
    //     if (id && check) {
    //         setFavorites((favorite: any) => [...favorite, Number(id)]);
    //     }
    //     else if (id) {
    //         const getId = notFav(id)
    //         setFavorites(getId)
    //     }
    //     setTrigger(!trigger)

    // }

    return (
        <>
            {loader ?
                (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.purple1 }}><ActivityIndicator
                    size={'large'}
                    color={Color.purple2}
                    style={{ marginTop: '40%' }}
                />


                </View>) : (
                    <ScrollView contentContainerStyle={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="left" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                                <Feather name="search" size={30} color={Color.purple1} style={{ fontWeight: 'bold', backgroundColor: Color.purple2, borderRadius: 5, padding: 3 }} />
                            </TouchableOpacity>
                        </View>

                        {movies.length <= 0 ? (
                            <View style={styles.summaryView}>
                                <Text style={{ color: Color.white, width: 200, textAlign: 'center' }}>You don't save anything, Let's explore now!</Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                {movies?.map(({ poster_path, id, title, vote_average }: any) => {
                                    return <TouchableOpacity key={id} onPress={() => navigation.navigate('Detail', { id })} style={styles?.mainCard}>
                                        <Image style={styles.image} source={{ uri: `${POSTER_BASE_URL}${poster_path}` }} />

                                        <View style={{ position: 'absolute', top: 10, right: 10, }}>


                                            <AntDesign name="heart" size={24} color={Color.purple2} onPress={() => removeFavorite(id)} />

                                        </View>

                                        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 40, textAlign: 'center', backgroundColor: Color.yellow1, alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>{vote_average}</Text>
                                                <AntDesign name="star" size={12} color="black" />
                                            </View>

                                            <Text style={{ color: '#fff', fontWeight: 'bold', width: 100, }} numberOfLines={2}> {title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                })}
                            </View>
                        )}
                    </ScrollView >
                )}
        </>

    )
}

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.purple1,
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    summaryView: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
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
    mainCard: { width: 120, height: 140, margin: 3 },
    image: {
        width: '100%', height: '100%'
    }
})