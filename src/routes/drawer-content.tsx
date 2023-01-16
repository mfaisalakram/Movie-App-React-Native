import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Color } from 'types';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { GetTVShow } from 'api';

interface Props {
  navigation?: any;
}
export type ButtonStylesContext = {
  disabled?: boolean;
};

export function DrawerContent(props: Props) {
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

  return (
    <View style={styles().container}>
      <DrawerContentScrollView>
        <Text style={styles().heading}>WELCOME!</Text>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('Home')}
        >
          <Feather name="home" style={styles().sectionViewIcon} />
          <Text style={styles().sectionViewText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('TvShows')}
        >
          <FontAwesome name="tv" style={styles().sectionViewIcon} />
          <Text style={styles().sectionViewText}>TV Shows</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('Theaters')}
        >
          <Entypo name="users" style={styles().sectionViewIcon} />
          <Text style={styles().sectionViewText}>Theaters</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('Favorites')}
        >
          <Fontisto name="favorite" style={styles().sectionViewIcon} />
          <Text style={styles().sectionViewText}>My Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles().sectionView}
          onPress={() => navigateTo('Setting')}
        >
          <AntDesign name="setting" style={styles().sectionViewIcon} />
          <Text style={styles().sectionViewText}>Setting</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = (color?: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.purple1,
    },
    heading: {
      marginTop: '10%',
      marginBottom: '10%',
      color: Color.white,
      marginLeft: '6%',
      fontSize: 20,
      letterSpacing: 2,
    },
    TopView: {
      flexDirection: 'row',
      paddingLeft: '5%',
      height: 115,
      backgroundColor: Color.white,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    userNameView: { height: 50, marginTop: '33%', marginLeft: '6%' },
    userName: {
      fontWeight: 'bold',
      color: color,
      fontSize: 16,
    },
    text: { fontSize: 14, color: color, width: '100%' },
    profilePic: {
      width: 70,
      height: 70,
      borderRadius: 50,
      marginTop: '26%',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    sectionView: {
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: Color.purple3,
      paddingVertical: 20,
      paddingLeft: '6%',
      borderTopRightRadius: 40,
      borderBottomRightRadius: 40,
    },
    sectionViewToggle: { top: -10, marginLeft: 10 },
    sectionViewText: {
      color: Color.white,
      fontSize: 14,
      marginLeft: '5%',
      marginTop: 2,
    },
    sectionViewIcon: {
      color: Color.white,
      fontSize: 18,
      marginTop: '1%',
    },
    touchable: {
      marginTop: '5%',
      display: 'flex',
      flexDirection: 'row',
    },
  });
