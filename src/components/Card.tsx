import React, { useEffect } from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useMovie } from 'hooks';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Color } from 'types';

const { width, height } = Dimensions.get('screen');


const dummyArray = "315162, 411, 19995, 899112"

interface Props {
  src: ImageSourcePropType;
  title?: string;
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
  id?: number
}

export const ITEM_W = width * 0.5;

const Card: React.FC<Props> = React.memo(({ src, title, style, id }) => {
  const { favorite, setFavorites } = useMovie()
  // const favorite = async() => {return await AsyncStorage.getItem('favorite');  }
  // const favorite = favoriteFun()



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
  const data = () => {
    return (
      favorite.filter(name => name.includes('J')).map((filteredName) => (
        console.log(filteredName)
      ))
    )
  }
  console.log("helo");

  let value: any
  useEffect(() => {
    value = data()
    console.log({ value }
    );

  }, [])
  console.log({ value }
  )
  useEffect(() => {
    value = data()
  }, [id])
  return (
    <Animated.View style={[style, styles.container]}>
      <SharedElement style={styles.img} id={`item.${title}.card`}>
        <TouchableOpacity style={{ left: 3, top: 25, zIndex: 1 }} onPress={() => { addFav(id) }}>
          {dummyArray.includes(id) ? <><MaterialIcons name="favorite" size={24} color={Color.purple2} /></> : <><MaterialIcons name="favorite-border" size={24} color={Color.purple2} /></>}
        </TouchableOpacity>
        <Image resizeMode="cover" style={styles.img} source={src} />

      </SharedElement>
      <Text numberOfLines={1} adjustsFontSizeToFit style={styles.title}>
        {title}
      </Text>
    </Animated.View>
  );
});

export default React.memo(Card);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: height * 0.28,
    elevation: 5
  },
  img: {
    width: '100%',
    borderRadius: 9,
    height: '100%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    alignSelf: 'center'
  }
});
