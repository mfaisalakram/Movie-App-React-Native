import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Color } from 'types';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

type SettingStack = StackScreenProps<StackHome<object, ItemsProps>, 'Booking'>;

const Setting: React.FC<SettingStack> = () => {
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
  const list = [
    {
      id: 1,
      name: 'Share App',
      navigateLink: 'About',
      logo: <AntDesign name="sharealt" size={24} color="black" />,
    },
    {
      id: 2,
      name: 'About',
      navigateLink: 'About',
      logo: <AntDesign name="filetext1" size={24} color="black" />,
    },
    {
      id: 3,
      name: 'Feedback',
      navigateLink: 'Feedback',
      logo: <MaterialIcons name="feedback" size={24} color="black" />,
    },
    {
      id: 4,
      name: 'Privacy',
      navigateLink: 'Privacy',
      logo: <EvilIcons name="lock" size={24} color="black" />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Color.purple1, padding: 20 }}>
      <View style={styles?.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>

        <Text style={{ color: '#fff', fontSize: 20 }}>Setting</Text>
        <Text></Text>
      </View>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigateTo('Share App')}
      >
        <AntDesign name="sharealt" style={styles.logo} />
        <Text style={styles.itemText}>Share App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => navigateTo('About')}>
        <AntDesign name="filetext1" style={styles.logo} />
        <Text style={styles.itemText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigateTo('Feedback')}
      >
        <MaterialIcons name="feedback" style={styles.logo} />
        <Text style={styles.itemText}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.item}
        onPress={() => navigateTo('Privacy')}
      >
        <EvilIcons name="lock" style={styles.logo} />
        <Text style={styles.itemText}>Privacy</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Color.purple3,
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 15,
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 4,
    borderBottomColor: Color.purple2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between' },
  itemText: {
    color: '#fff',
    marginLeft: 20,
  },
  logo: {
    color: '#fff',
    fontSize: 18,
  },
});
