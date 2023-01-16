import React from 'react';
import {GestureResponderEvent, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Buton} from '../../assets/svg/svg'

interface Props {
  rotate: any;
  style?: ViewStyle;
  onPress?: (e: GestureResponderEvent) => void;
  disable?: boolean;
  page?: number | any;
}

const Arrow: React.FC<Props> = ({rotate = '0deg', style, onPress, disable, page}:any) => {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress} style={[styles.wraper, style]}>
      <Buton />
    </TouchableOpacity>
  );
};

export default Arrow;

const styles = StyleSheet.create({
  wraper: {
    padding: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  number: {
    color: '#FFFFFF',
    position: 'absolute',
    top: -20,
    left: 10,
    backgroundColor: '#f7bd0e',
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
