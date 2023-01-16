import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Box from './Box';
import { Color } from 'types';
import { Entypo, Feather } from '@expo/vector-icons';
import { SearchMovies } from 'api';
import { DrawerActions, useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('screen');
const SearchBar = ({ home, searchText, setSearchText, onSubmit }: any) => {
  const navigation = useNavigation();
  const navigateTo = (screen: any) => {
    const dt: never = {
      name: screen,
      key: undefined,
      params: {},
      merge: undefined,
    } as never;
    navigation.navigate(dt);
  };
  const [query, setQuery] = useState('');
  const toggle = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <View style={styles().wraper}>
      <Box borderColor={home ? Color.purple1 : Color.purple2} size={height * 0.06}>
        <TouchableOpacity onPress={toggle}>
          <Entypo name="menu" size={24} color={Color.purple2} />
        </TouchableOpacity>
      </Box>
      <TouchableOpacity
        style={[styles(home).container]}
        onPress={() => {
          if (home) {
            navigateTo('Search');
          } else {
            return;
          }
        }}
      >
        <TextInput
          numberOfLines={1}
          placeholderTextColor={Color.purple2}
          style={styles().input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Search Films..."
          editable={home ? false : true}
          selectTextOnFocus={home ? false : true}
          onSubmitEditing={() => onSubmit()}
          autoFocus={home ? false : true}
        />
        <TouchableOpacity
          onPress={async () => await SearchMovies(query)}
          style={styles().searchBox}
        >
          <Feather name="search" size={24} color={Color.purple2} onPress={() => onSubmit()} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = (home?: any) =>
  StyleSheet.create({
    wraper: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      display: 'flex',
      width: '100%',
      marginTop: height * 0.06,
      zIndex: 10,
    },
    container: {
      width: width * 0.7,
      display: 'flex',
      flexDirection: 'row',
      borderColor: home ? Color.purple1 : Color.purple2,
      borderWidth: 2,
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 15,
      alignItems: 'center',
      height: height * 0.06,
    },
    input: {
      fontSize: 15,
      flex: 1,
      marginRight: 10,
      letterSpacing: 1.3,
      textDecorationLine: 'none',
      borderWidth: 0,
      color: Color.purple2,
      // textShadowColor: Color.purple2,
      // textShadowOffset: {
      //   height: 0.5,
      //   width: 0.5,
      // },
      // textShadowRadius: 3,
    },
    searchBox: {
      backgroundColor: home ? Color.purple1 : Color.purple3,
      paddingVertical: 5,
      paddingHorizontal: 6,
      borderRadius: 5,
    },
  });

export default SearchBar;
