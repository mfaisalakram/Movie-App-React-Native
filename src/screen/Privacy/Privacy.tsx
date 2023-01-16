import React from 'react'

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Color } from 'types';

import { AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { list } from '../About/About'


const Privacy = () => {
    const navigation = useNavigation();


    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Setting') }}><AntDesign name="left" style={styles.backlogo} /></TouchableOpacity>
                    <Text style={styles.privacyText}>Privacy</Text>
                    <Text></Text>
                </View>
                <View style={styles.innercontainer}>

                    <Text style={styles.mainHeading}>PRIVACY POLICY</Text>

                    {list.map(({ id, heading, paragraph }) => (

                        <View style={styles.section} key={id}>
                            <Text style={styles.heading}>{heading}</Text>
                            <Text style={styles.paragraph}>
                                {paragraph}
                            </Text>

                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default Privacy;

const styles = StyleSheet.create({
    scrollView: { backgroundColor: 'red', flex: 1, },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', textAlign: 'center', alignItems: 'center', height: 50, paddingHorizontal: 20 },
    backlogo: { color: Color.white, fontSize: 20 },
    privacyText: { color: Color.white, fontSize: 18, textTransform: 'uppercase' },
    container: {
        flex: 1,
        backgroundColor: Color.purple1,
    },
    innercontainer: {
        flex: 1,
        backgroundColor: Color.white,
        paddingHorizontal: 10,
    },
    mainHeading: { fontSize: 24, marginBottom: 14, fontWeight: 'bold' }, section: { marginBottom: 6 }, heading: { fontSize: 12, fontWeight: 'bold' }, paragraph: { fontSize: 10, textAlign: 'left' }
})