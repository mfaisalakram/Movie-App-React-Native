import React, { useEffect, useState } from 'react';

import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import axios from 'axios';
import { API_KEY, POSTER_BASE_URL } from '@config';
import { StackScreenProps } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Color } from 'typed';
import { useNavigation } from '@react-navigation/native';
import { useMovie } from 'hooks';

type DetailStack = StackScreenProps<StackHome<any, any, ItemsProps>, 'Detail'>;

const Detail: React.FC<DetailStack> = ({ route }) => {
  const params = route.params;
  const [movieDetail, setMovieDetail] = useState<any>({});
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState([]);
  const { favorite, setFavorites } = useMovie();

  const navigation = useNavigation();


  const getMovieDetail = async (movieId: any) => {
    console.log(movieId)
    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/${params?.tv ? 'tv' : 'movie'}/${movieId}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&append_to_response=videos,credits`
      );
      if (response.data) {
        setLoader(false);
        setMovieDetail(() => response.data);
      } else {
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
    }
  };

  const getMovieReview = async (movieId: any) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&append_to_response=videos,credits`
      );
      if (response.data) {
        setLoader(false);
        setMovieDetail(() => response.data);
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
  useEffect(() => {
    if (params?.key) {
      getMovieDetail(params?.key);
      // getMovieReview(params?.key);
    } else {
      getMovieDetail(params?.id);
      // getMovieReview(params?.id);
    }

    getAllMovies();
  }, [params?.key, params?.id]);

  const checkFav = (id) => favorite?.filter((dt) => {
    return (dt === id)
  });
  const notFav = (id) => favorite?.filter((dt) => {
    return (dt !== id)
  });
  console.log({ favorite });

  const addFav = (id: Number) => {
    console.log({ id });
    let check1 = checkFav(id)
    console.log({ check1, favorite });
    let check = true
    if (check1.length > 0) {

      check = false
    }
    if (id && check) {
      setFavorites(favorite => [...favorite, id]);
    }
    else if (id) {
      const getId = notFav(id)
      setFavorites(getId)
    }
    // setFavorites([...favorite, id])
  }

  return (
    <View style={[styles.root]}>
      {loader ? (
        <ActivityIndicator
          size={'large'}
          color={Color.purple2}
          style={{ top: '50%' }}
        />
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
            id={`item.${params?.title}.card`}
          >
            <Image
              source={{ uri: `${POSTER_BASE_URL}${movieDetail?.poster_path}` }}
              resizeMode="cover"
              style={styles.img}
            />

            <TouchableOpacity style={{ position: 'absolute', top: 20, left: 20 }} onPress={() => navigation.goBack()}><AntDesign name="left" size={30} color={Color.purple2} style={{ fontWeight: 'bold', backgroundColor: Color.purple1, borderRadius: 5, padding: 3 }} /></TouchableOpacity>

            <TouchableOpacity style={{ position: 'absolute', top: 20, right: 20 }} onPress={() => navigation.navigate('Search')}>

              <Feather name="search" size={30} color={Color.purple2} style={{ fontWeight: 'bold', backgroundColor: Color.purple1, borderRadius: 5, padding: 3 }} />
            </TouchableOpacity>

            <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
              <>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  {movieDetail?.release_date && <Text style={styles.yearText}>{movieDetail?.release_date?.substring(0, 4)}</Text>}
                  <Text style={styles.yearRaiting}>
                    {(Math.round(movieDetail.vote_average * 100) / 100).toFixed(1)} <AntDesign name="star" size={12} color="black" />
                  </Text>
                </View>
                <Text style={styles.titleText}>
                  {movieDetail?.original_title}
                </Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  {movieDetail?.genres?.map(({ name, id }: any) => (
                    <TouchableOpacity style={styles.genresTouch}>
                      <Text style={styles.genresText}>{name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            </View>
          </SharedElement>
          <ScrollView style={styles.slider}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              {movieDetail?.overview && <View style={styles.summaryView}>
                <Text style={styles.summaryHeading}>
                  <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                  Summary
                </Text>
                <Text style={styles.summaryText}>{movieDetail?.overview}</Text>
              </View>}
              <TouchableOpacity style={{ top: 20, right: 30 }} onPress={() => { addFav(movieDetail?.id) }}>
                {favorite?.length > 0 ? <>
                  {favorite?.map((id) => {
                    return (
                      <>
                        {console.log("jkljhefhwejh")
                        }
                        {id === movieDetail?.id ? <MaterialIcons name="favorite" size={24} color="white" /> : <MaterialIcons name="favorite-border" size={24} color="white" />}
                      </>
                    )
                  })}
                </> : <MaterialIcons name="favorite-border" size={24} color="white" />}

              </TouchableOpacity>
            </View>

            {movieDetail?.credits?.cast.length > 0 && <View style={styles.summaryView}>
              <Text style={styles.summaryHeading}>
                <FontAwesome name="pause" size={12} color={Color.purple2} />{' '}
                Cast
              </Text>
              <ScrollView style={{ flexDirection: 'row' }} horizontal={true}>
                {movieDetail?.credits?.cast?.map(
                  ({ profile_path, known_for_department, name, id }: any) => {
                    return (
                      <TouchableOpacity onPress={() => navigation.navigate('PersonDetail', { id })} style={styles.actorCard}>
                        <View style={{ backgroundColor: Color.gray2 }}>
                          <Image
                            source={{
                              uri: profile_path
                                ? `${POSTER_BASE_URL}${profile_path}`
                                : `fefwefwefew`,
                            }}
                            style={styles.actorImage}
                          />
                        </View>
                        <Text style={styles.actorNameText}>{name}</Text>
                        <Text style={styles.actorDepartmentText}>
                          {known_for_department}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </ScrollView>
            </View>}

            <View style={styles.summaryView}>
              <Text style={styles.summaryHeading}>
                <FontAwesome name="pause" size={12} color={Color.purple2} /> You
                May Like
              </Text>
              {movies?.map((item) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10
                  }}
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
        </>
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Color.purple1, padding: 2 },
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
  yearText: {
    backgroundColor: Color.white,
    color: Color.black1,
    marginRight: 5,
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
    backgroundColor: Color.purple1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  genresText: {
    color: Color.white,
    fontSize: 10,
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
