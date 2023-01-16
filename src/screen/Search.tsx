import React, { useState, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SearchBar } from '@components';
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

import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SearchMovies } from 'api';

import axios from 'axios';
import { API_KEY, POSTER_BASE_URL } from 'config';
import SearchItem from './SearchItem';
type SearchStack = StackScreenProps<StackHome<object, ItemsProps>, 'Booking'>;

const Search: React.FC<SearchStack> = () => {


  const [searchText, setSearchText] = useState('')
  const [loader, setLoader] = useState(false);
  const [searchData, setSearchData] = useState([])
  const navigation = useNavigation();


  const getSearchData = async (query: any) => {
    setSearchText('')
    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${1}&include_adult=false`
      );
      if (response.data) {
        setLoader(false);
        setSearchData(response.data?.results);
      } else {
        setLoader(false);
      }
    } catch (err) {
      setLoader(false);
    }
  };


  return (
    <View style={{ backgroundColor: Color.purple1, flex: 1, }}>

      <View style={{ flex: 1, backgroundColor: Color.purple1, padding: 20 }}>
        <SearchBar home={false} searchText={searchText} setSearchText={setSearchText} onSubmit={() => getSearchData(searchText)} />
        <View style={styles.movieContent}>
          <View style={styles.movieHeadingView}>
            <MaterialIcons name="local-movies" style={styles.movieLogo} />
            <Text style={styles.movieHeadingText}>Movies</Text>
          </View>
          {loader ? (
            <ActivityIndicator
              size={'large'}
              color={Color.purple2}
              style={{ marginTop: '100%' }}
            />
          ) : (
            <ScrollView>
              <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 150 }}>
                {
                  searchData?.map((item) => (
                    <TouchableOpacity style={styles.movieItem} key={item?.id} onPress={() => { navigation.navigate('Detail', item) }}>
                      <Image
                        source={{
                          uri: `${POSTER_BASE_URL}${item?.poster_path}`,
                        }}
                        style={styles.actorImage}
                      />
                      <View style={{ position: 'absolute', bottom: 5, left: 10 }}>
                        <Text style={{ backgroundColor: Color.yellow1, width: 40, paddingHorizontal: 2 }}>{item?.vote_average} <AntDesign name="star" size={12} color="black" /></Text>
                        <Text style={styles.movieTitleText}>{item?.title}</Text>
                        <View style={{ flexDirection: 'row', overflow: 'hidden' }}><Text style={styles.genersText}>#Family</Text><Text style={styles.genersText}> #Horror</Text></View>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </ScrollView>
          )}

        </View>
      </View>


    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  movieHeadingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movieHeadingText: {
    textTransform: 'uppercase',
    fontSize: 18,
    color: Color.white,
  },
  movieLogo: {
    marginRight: 10,
    fontSize: 18,
    color: Color.purple2,
  },
  movieContent: {
    padding: 20,
    paddingTop: 0,
    marginTop: 40,
  },
  moviesView: {
    // flexDirection: 'column',

  },
  movieItem: { marginTop: 20, flexBasis: '50%', opacity: 0.7 },
  actorImage: {
    width: 150,
    height: 170,
  },
  movieTitleText: { color: Color.white, fontWeight: 'bold', fontSize: 15, width: 140 },
  genersText: { color: '#f0f0f0' },

});
